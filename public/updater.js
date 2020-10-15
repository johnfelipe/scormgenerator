const { auto } = require("@popperjs/core")
// Electron-Updater Module
const { autoUpdater } = require("electron-updater")

// Configure log debugging
autoUpdater.logger = require("electron-log")
autoUpdater.logger.transports.file.level = "info"

// SIngle export to check for and apply any available updates
module.exports = () => {
    // Check for update (GH Releases)
    auto.checkForUpdates()
}