/*
* Black Magic Launcher
 * Copyright (C) 2022-2023 Broken_Deer <old_driver__@outlook.com> and contributors
*
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
*
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

let time = new Date().getTime()
let startTime = time
console.log('计时器已重置')
const { app, BrowserWindow } = require("electron");
const path = require("path");
const ipcMain = require("electron").ipcMain;
const ElectronStore = require("electron-store");
ElectronStore.initRenderer();
process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true"; //关闭警告

var win;
const createWindow = show => {
    win = new BrowserWindow({
        width: 900,
        height: 500,
        resizable: false,
        transparent: true,
        titleBarStyle: "hidden",
        backgroundColor: "#00000000",
        frame: false,
        show: show,
        webviewTag: true,
        webPreferences: {
            spellcheck: false,
            nodeIntegration: show,
            enableRemoteModule: true,
            contextIsolation: false,
            webSecurity: false,
            webviewTag: true,
            experimentalFeatures: true,
        },
        icon: path.join(__dirname, "./logo.ico"),
    });
    win.loadFile("./view/index.html");
    if (!app.isPackaged && show) win.webContents.openDevTools({ mode: 'undocked' });
    win.webContents.on("before-input-event", (event, input) => {
        if (input.code == "F4" && input.alt) {
            event.preventDefault();
            closeWindow.reply("close-window");
        }
        if ((
            input.code === 'KeyW' ||
            input.code === 'KeyR' ||
            input.code === 'Minus' ||
            input.code === 'Equal' ||
            input.code === 'KeyM'
        ) && input.control && app.isPackaged) {
            event.preventDefault();
        }
    });
    win.on("close", () => {
        app.exit();
    });
    win.focus();
};
var closeWindow;
ipcMain.on("main-get-event-obj", event => {
    closeWindow = event;
});
app.commandLine.appendSwitch("disable-pinch", true);

app.whenReady().then(async () => {
    console.log(`第一阶段加载用时${new Date().getTime() - time}ms`)
    time = new Date().getTime()
    createWindow(false);
    console.log(`第二阶段加载用时${new Date().getTime() - time}ms`)
    time = new Date().getTime()
    setTimeout(async () => {
        createWindow(true);
        console.log(`第三阶段加载用时${new Date().getTime() - time}ms`)
        console.log(`窗口在第${new Date().getTime() - startTime}ms加载完成`)
        ipcMain.once('dcl', () => {
            console.log(`${new Date().getTime() - startTime}ms: DOM构建完成`)
        })
        ipcMain.once('onload', () => {
            console.log(`${(new Date().getTime() - startTime)}ms: 页面加载完成`)
        })
        let index = await import('./src/index.mjs');
        index.setDetector(win)
        console.log(`已放置侦测器`)
    }, 100);
});
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
});