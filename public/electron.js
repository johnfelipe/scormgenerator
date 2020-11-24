const { app, dialog, BrowserWindow, Menu } = require('electron');
const path = require('path');
const url = require('url');
const kill  = require('tree-kill');
const updater = require('./electron/updater');

/* Determine Platform*/
var currentPlatform = process.platform;

/* Execution of Jar based on the platform */
let jarPath;
let exec, child, spawn;

if (currentPlatform === "win32") {
    exec = require('child_process').exec;
    child = exec('java -jar windows.jar');
} else if (currentPlatform === "darwin") {
    // exec = require('child_process').exec;
    spawn = require('child_process').spawn;
    child = spawn('java', ['-jar', 'mac.jar']);
}
/* End of Execution of Jar based on the platform */


const log = require('electron-log');
let mainWindow;
let mainMenu = Menu.buildFromTemplate( require('./electron/mainMenu') );

function createWindow () {
    const startUrl = process.env.ELECTRON_START_URL || url.format({
        pathname: path.join(__dirname, '../build/index.html'),
        protocol: 'file:',
        slashes: true,
    });

    // setTimeout( updater, 3000 )
    log.info('Split AppPath: ' + app.getAppPath().split('\\'));
    log.info('Version: ' + app.getVersion());
    log.info('AppPath: ' + app.getAppPath());
    log.info('InstallationPathWindows: ' + app.getPath('exe'));
    try {
        log.info('InstallationPathMac (Possibly): ' + app.getPath('dmg'));
    } catch {
        log.info('InstallationPathMac (Possibly): error');
    }
    log.info('Jar Path: ' + jarPath);
    log.info('PID: ' + child.pid);

    // setTimeout(updater, 3000);

    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: { nodeIntegration: true },
    });
    mainWindow.loadURL(startUrl);
    
    mainWindow.webContents.openDevTools();

    Menu.setApplicationMenu(mainMenu);

    mainWindow.maximize();
    mainWindow.on('closed', function () {
        mainWindow = null;
    });

    // console.log
    mainWindow.webContents.on('did-finish-load', () => {
        mainWindow.webContents.send('appPath', 'AppPath: ' + app.getAppPath());
        mainWindow.webContents.send('child', 'child: ' + child);
    })
}

function javaVersionChecker(callback) {
    var spawn = require('child_process').spawn('java', ['-version']);
    spawn.on('error', function(err){
        return callback(err, null);
    });
    spawn.stderr.on('data', function(data) {
        data = data.toString().split('\n')[0];
        var javaVersion = new RegExp('java version').test(data) ? data.split(' ')[2].replace(/"/g, '') : false;
        if (javaVersion != false) {
            // TODO: We have Java installed
            return callback(null, javaVersion);
        } else {
            // TODO: No Java installed

        }
    });
}

app.on('ready',  function () {
    createWindow();

    javaVersionChecker(function(err, version) {
        if (err !== null && version === null) {
            log.info(err);
            dialog.showMessageBox({
                type: 'warning',
                title: 'Java is Missing',
                message: 'Java is not installed on the computer. Click ok to proceed on Java download web page and quit the app.',
                buttons: ['Ok', 'Cancel']
            }).then( result => {
                let buttonIndex = result.response;
    
                if (buttonIndex === 0) {
                    require('electron').shell.openExternal("https://www.oracle.com/java/technologies/javase-jre8-downloads.html");
                    app.quit();
                }
            })
        } else if (err === null && version !== null) {
            log.info("Java version: " + version);
        }
    })
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
        kill(child.pid);
    }
});

app.on('activate', function () {
    if (mainWindow === null) {
        createWindow();
    }
});
