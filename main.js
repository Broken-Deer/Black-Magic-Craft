const { app, BrowserWindow } = require('electron')
let ipcMain = require('electron').ipcMain;
var win
const createWindow = () => {
    win = new BrowserWindow({
        width: 920,
        height: 509,
        minWidth: 900,
        minHeight: 500,
        transparent: true,
        titleBarStyle: 'hidden',
        backgroundColor: '#00000000',
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: false,
          }
    })

    win.loadFile('./view/index.html')
    win.webContents.openDevTools()
}

app.whenReady().then(() => {
    createWindow()
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

ipcMain.on('window-min', function () {
    win.minimize();
})
ipcMain.on('window-close', function () {
    win.close();
})