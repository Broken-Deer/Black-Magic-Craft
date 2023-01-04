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
    if (!app.isPackaged && show) win.webContents.openDevTools();
    win.webContents.on("before-input-event", (event, input) => {
        if (input.code == "F4" && input.alt) {
            event.preventDefault();
            closeWindow.reply("close-window");
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
