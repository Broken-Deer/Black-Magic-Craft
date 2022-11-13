const { app, BrowserWindow, BrowserView, dialog } = require('electron');
var path = require("path")
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
        show: false,
        frame: false,
        webviewTag: true,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: false,
            webSecurity: false,
            webviewTag: true
        },
        icon: path.join(__dirname, './logo.ico')
    })

    win.loadFile('./view/index.html')
    /* 以后做添加帐户功能的时候用，现在先放着     
    win.loadURL(
            "https://login.live.com/oauth20_authorize.srf" +
              "?client_id=00000000402b5328" +
              "&response_type=code" +
              "&prompt=select_account" +
              "&scope=service%3A%3Auser.auth.xboxlive.com%3A%3AMBI_SSL" +
              "&redirect_uri=https%3A%2F%2Flogin.live.com%2Foauth20_desktop.srf"
          ); */
    win.webContents.openDevTools()


    win.webContents.session.webRequest.onHeadersReceived({ urls: ["*://*/*"] },
        (d, c) => {
            if (d.responseHeaders['X-Frame-Options']) {
                delete d.responseHeaders['X-Frame-Options'];
            } else if (d.responseHeaders['x-frame-options']) {
                delete d.responseHeaders['x-frame-options'];
            }

            c({ cancel: false, responseHeaders: d.responseHeaders });
        }
    );

}

app.whenReady().then(() => {
    createWindow()
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
    win.once('ready-to-show', () => {
        win.show()
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
ipcMain.on('OpenDevTools', function () {
    win.webContents.openDevTools();
})

ipcMain.on('choose_java', (event) => {
    win.focus();
    // 如果平台是“win32”或“Linux”
    if (process.platform !== 'darwin') {
        // Resolves to a Promise<Object>
        dialog.showOpenDialog({
            title: '选择文件',
            defaultPath: path.join(__dirname, '../assets/'),
            // 指定文件选择器属性
            properties: ['openFile']
        }).then(file => {
            // 说明对话框操作是否已取消。
            console.log(file.canceled);
            if (!file.canceled) {
                const filepath = file.filePaths[0].toString();
                console.log(filepath);
                event.reply('file', filepath);
            } else {
                event.reply('file', 'error');
            }
        }).catch(err => {
            console.log(err)
        });
    }
    else {
        // 如果平台是“darwin”（macOS）
        dialog.showOpenDialog({
            title: '选择文件',
            defaultPath: path.join(__dirname, '../assets/'),
            // 指定文件选择器和目录
            // macOS 中的选择器属性
            properties: ['openFile']
        }).then(file => {
            console.log(file.canceled);
            if (!file.canceled) {
                const filepath = file.filePaths[0].toString();
                console.log(filepath);
                event.send('file', filepath);
            } else {
                event.reply('file', 'error');
            }
        }).catch(err => {
            console.log(err)
        });
    }
});

ipcMain.on('ms_login',function (event, window_info) { 
    console.log(window_info[0])
 })