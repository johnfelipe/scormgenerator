const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const url = require('url');
const kill  = require('tree-kill');
// const jarPath = process.env.ELECTRON_START_URL ? app.getAppPath() + '/public/embedded/server.jar' : app.getAppPath() + '/build/embedded/server.jar';
// const exec = require('child_process').exec, child;
// child = exec('java -jar ' + jarPath)
// const jarFullPath = app.getPath('exe') + '\\resources\\build\\embedded\\server.jar';
const jarFullPath = app.getPath('exe');
const tempPathArr = jarFullPath.split('\\');
tempPathArr.pop();
const jarPath = tempPathArr.join('\\') + '\\server.jar';
// const jarPath = app.getPath('userData') + '\\server.jar';
let exec = require('child_process').exec, child;
child = exec('java -jar "' + jarPath + '"')
// const jarPath = app.getAppPath() + '\\public\\embedded\\server.jar';
// const child = require('child_process').spawn('java', ['-jar', jarPath, '']);
// const updater = require('./updater')
const log = require('electron-log');
let mainWindow;

function createWindow () {
    const startUrl = process.env.ELECTRON_START_URL || url.format({
        pathname: path.join(__dirname, '../build/index.html'),
        protocol: 'file:',
        slashes: true,
    });

    // setTimeout( updater, 3000 )
    log.info(child.pid);
    log.info(jarPath);
    log.info('java -jar "' + jarPath + '"');
    
    console.log(child.pid);
    console.log(jarPath);

    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
    });
    mainWindow.loadURL(startUrl);
    mainWindow.maximize();
    mainWindow.on('closed', function () {
        mainWindow = null;
    });
    mainWindow.webContents.openDevTools();
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
