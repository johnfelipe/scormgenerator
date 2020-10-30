//Electron-updater Module
const { dialog } = require("electron");
const { autoUpdater } = require("electron-updater");

autoUpdater.logger = require("electron-log");
autoUpdater.logger.transports.file.level = "info";
// autoUpdater.setFeedURL({
//     provider: 'github',
//     repo: 'electron-scorm-generator',
//     owner: 'zeejay09',
//     // token: process.env.GH_TOKEN,
//     // private: true,
// });

autoUpdater.autoDownload = false;

module.exports = () => {
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