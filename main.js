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

const { app, BrowserWindow, dialog } = require("electron");
const path = require("path");
const ipcMain = require("electron").ipcMain;
const ElectronStore = require("electron-store");
const f = require("fs");
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
            nodeIntegration: true,
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
        if ((input.code === 'KeyW' || input.code === 'KeyR') && input.control) {
            event.preventDefault();
        }
    });
    win.on("close", () => {
        app.exit();
    });
    win.focus();
};
var closeWindow;
app.commandLine.appendSwitch("disable-pinch", true);
app.whenReady().then(() => {
    createWindow(false);
    setTimeout(() => {
        createWindow(true);
    }, 3000);
});
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
});
(async () => {
    await import("./src/index.mjs");
})();
ipcMain.on("main-get-event-obj", event => {
    closeWindow = event;
});

ipcMain.on("window-min", () => {
    win.minimize();
});

ipcMain.on("window-close", () => {
    app.exit();
});
ipcMain.on("OpenDevTools", () => {
    win.webContents.openDevTools();
});
ipcMain.on("choose_java", event => {
    win.focus();
    // 如果平台是“win32”或“Linux”
    if (process.platform !== "darwin") {
        dialog
            .showOpenDialog(win, {
                title: "选择Java",
                properties: ["openFile"],
                filters: [{ name: "可执行文件", extensions: ["exe"] }],
            })
            .then(file => {
                // 验证这玩意是不是Java
                if (!file.canceled) {
                    const filepath = file.filePaths[0].toString();
                    const releaseFilePath = path.join(filepath, "../../release");
                    if (
                        !f.existsSync(releaseFilePath) ||
                        (path.basename(filepath) !== "java.exe" && path.basename(filepath) !== "javaw.exe")
                    ) {
                        event.reply("file", "error");
                        return;
                    }
                    event.reply("file", filepath);
                } else {
                    event.reply("file", "canceled");
                }
            })
            .catch(err => {
                console.log(err);
            });
    } else {
        dialog
            .showOpenDialog({
                title: "选择Java",
                properties: ["openFile"],
            })
            .then(file => {
                // 验证这玩意是不是Java
                if (!file.canceled) {
                    const filepath = file.filePaths[0].toString();
                    const releaseFilePath = path.join(filepath, "../release");
                    if (!f.existsSync(releaseFilePath)) {
                        event.reply("file", "error");
                        return;
                    }
                    event.reply("file", filepath);
                } else {
                    event.reply("file", "canceled");
                }
            })
            .catch(err => {
                console.log(err);
            });
    }
});
