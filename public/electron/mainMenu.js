const { app } = require("electron");
const updater = require('./updater');

module.exports = [
    {
        label: app.getName(),
        submenu: [
            { role: 'about' },
            { label: `Version ${app.getVersion()}`, enabled: false },
            { label: 'Check for updates', click: () => updater.checkForUpdates() },
            { type: 'separator' },
            { label: 'Preferences' },
            { label: 'Help' },
            { type: 'separator' },
            { role: 'quit' }
        ]
    },
]