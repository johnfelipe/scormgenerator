const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');
const url = require('url');
const kill  = require('tree-kill');
const updater = require('./electron/updater');

/* Determine Platform*/
var currentPlatform = process.platform;

/* Path of the Jar when debugging packaged app */
// const jarPath = process.env.ELECTRON_START_URL ? app.getAppPath() + '/public/embedded/server.jar' : app.getAppPath() + '/build/embedded/server.jar';
// let exec = require('child_process').exec, child;
// child = exec('java -jar ' + jarPath)
/* End of Path of the Jar when debugging packaged app */

/* Path of the Jar when creating an installer */
let jarPath;
let exec, child;

if (currentPlatform === "win32") {
    const jarFullPath = app.getPath('exe');
    const tempPathArr = jarFullPath.split('\\');
    tempPathArr.pop();
    jarPath = tempPathArr.join('\\') + '\\server.jar';
    exec = require('child_process').exec;
} else if (currentPlatform === "darwin") {
    const jarFullPath = app.getAppPath();
    const tempPathArr = jarFullPath.split('\\');
    tempPathArr.pop();
    tempPathArr.pop();
    jarPath = tempPathArr.join('\\') + '\\server.jar';
    exec = require('child_process').exec;
}

/* End of Path of the Jar when creating an installer */

child = exec('java -jar "' + jarPath + '"');

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
    log.info('SPlit AppPath: ' + app.getAppPath().split('\\'));
    log.info('Version: ' + app.getVersion());
    log.info('AppPath: ' + app.getAppPath());
    log.info('InstallationPathWindows: ' + app.getPath('exe'));
    try {
        log.info('InstallationPathMac (Possibly): ' + app.getPath('dmg'));
    } catch {
        log.info('InstallationPathMac (Possibly): error');
    }
    log.info("Jar Path: " + jarPath);
    // log.info(child.pid);
    // log.info('java -jar "' + jarPath + '"');
    
    // console.log(child.pid);
    // console.log(jarPath);

    setTimeout(updater, 3000);

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
}



app.on('ready', createWindow);
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
