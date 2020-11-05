//Electron-updater Module
const { dialog } = require("electron");
const { autoUpdater } = require("electron-updater");

autoUpdater.logger = require("electron-log");
autoUpdater.logger.transports.file.level = "info";
autoUpdater.autoDownload = false;
let updateDownloaded = false;

autoUpdater.on('error', (error) => {
    dialog.showErrorBox('Error during the update', `Application couldn't be updated. Please try again or contact the support team.`);
});

autoUpdater.on('update-available', () => {
    dialog.showMessageBox({
        type: 'info',
        title: 'Updates found',
        message: 'New update is available, do you want update now?',
        defaultId: 0,
        cancelId: 1,
        buttons: ['Yes', 'No']
    }).then( result => {
        let buttonIndex = result.response;

        if (buttonIndex === 0) {
            autoUpdater.downloadUpdate();
        }
    });
});
autoUpdater.on('update-not-available', () => {
    dialog.showMessageBox({
        title: 'No Updates',
        message: 'Current version is up-to-date.'
    });
});

autoUpdater.on('update-downloaded', () => {
    updateDownloaded = true;
    dialog.showMessageBox({
        title: 'Install Updates',
        message: 'Updates are ready to be installed.',
        defaultId: 0,
        cancelId: 1,
        buttons: ['Install and restart', 'Close']
    }).then( result => {
        let buttonIndex = result.response;

        if (buttonIndex === 0) {
            setImmediate(() => autoUpdater.quitAndInstall());
        }
    });
});

const checkForUpdates = () => {
    if (updateDownloaded) {
        dialog.showMessageBox({
            title: 'Available Updates',
            message: 'New updates are available and ready to be installed.',
            defaultId: 0,
            cancelId: 1,
            buttons: ['Install and restart', 'Close']
        }).then( result => {
            let buttonIndex = result.response;
    
            if (buttonIndex === 0) {
                setImmediate(() => autoUpdater.quitAndInstall());
            }
        });
    } else {
        autoUpdater.checkForUpdates();
    }
}

exports.checkForUpdates = checkForUpdates;
