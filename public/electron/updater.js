//Electron-updater Module
const { dialog } = require("electron");
const { autoUpdater } = require("electron-updater");

autoUpdater.logger = require("electron-log");
autoUpdater.logger.transports.file.level = "info";
autoUpdater.setFeedURL({
    provider: 'github',
    repo: 'scormgenerator',
    owner: 'webupps',
});

autoUpdater.autoDownload = false;

module.exports = () => {
    // console.log('Checking for updates.');
    autoUpdater.checkForUpdates();
    // autoUpdater.checkForUpdatesAndNotify();

    autoUpdater.on('update-available', () => {
        dialog.showMessageBox({
            type: 'info',
            title: 'Update Available',
            message: 'A new version is available. Do you want to update now?',
            buttons: ['Update', 'No']
        }).then( result => {
            let buttonIndex = result.response;

            if (buttonIndex === 0) {
                autoUpdater.downloadUpdate();
            }
        })
    })

    autoUpdater.on('update-downloaded', () => {
        dialog.showMessageBox({
            type: 'info',
            title: 'Update Ready',
            message: 'Install and restart now?',
            buttons: ['Yes', 'Later']
        }).then( result => {
            let buttonIndex = result.response;

            if (buttonIndex === 0) {
                autoUpdater.quitAndInstall(false, true);
            }
        })
    })
}