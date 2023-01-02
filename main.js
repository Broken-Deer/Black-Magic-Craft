const { app, BrowserWindow, dialog } = require("electron");
const path = require("path");
const ipcMain = require("electron").ipcMain;
const ElectronStore = require("electron-store");

ElectronStore.initRenderer();
process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true"; //关闭警告
(async () => {
    /* await import("./src/game/LaunchOptions.mjs");
    await import("./src/installer/minecraft.mjs"); */
})();
var win;
const createWindow = show => {
    win = new BrowserWindow({
        width: 870,
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
};
var closeWindow;
ipcMain.on("main-get-event-obj", event => {
    closeWindow = event;
});

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

ipcMain.on("window-min", () => {
    win.minimize();
});

ipcMain.on("window-close", () => {
    app.quit();
});

ipcMain.on("OpenDevTools", () => {
    win.webContents.openDevTools();
});

ipcMain.on("choose_java", event => {
    win.focus();
    // 如果平台是“win32”或“Linux”
    if (process.platform !== "darwin") {
        // Resolves to a Promise<Object>
        dialog
            .showOpenDialog({
                title: "选择Java",
                // 指定文件选择器属性
                properties: ["openFile"],
            })
            .then(file => {
                // 说明对话框操作是否已取消。
                console.log(file.canceled);
                if (!file.canceled) {
                    const filepath = file.filePaths[0].toString();
                    console.log(filepath);
                    event.reply("file", filepath);
                } else {
                    event.reply("file", "error");
                }
            })
            .catch(err => {
                console.log(err);
            });
    } else {
        // 如果平台是“darwin”（macOS）
        dialog
            .showOpenDialog({
                title: "选择Java",
                // 指定文件选择器和目录
                // macOS 中的选择器属性
                properties: ["openFile"],
            })
            .then(file => {
                console.log(file.canceled);
                if (!file.canceled) {
                    const filepath = file.filePaths[0].toString();
                    console.log(filepath);
                    event.send("file", filepath);
                } else {
                    event.reply("file", "error");
                }
            })
            .catch(err => {
                console.log(err);
            });
    }
});
