const { app, BrowserWindow, dialog } = require("electron");
const f = require("fs");
const os = require("os");
const path = require("path");
const ipcMain = require("electron").ipcMain;
const ElectronStore = require("electron-store");
ElectronStore.initRenderer();
process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true"; //关闭警告
(async () => {
    await import("./src/game/LaunchOptions.mjs");
})(); // 执行.mjs文件

var win;
const createWindow = () => {
    win = new BrowserWindow({
        width: 920,
        height: 509,
        minWidth: 900,
        minHeight: 500,
        transparent: true,
        titleBarStyle: "hidden",
        backgroundColor: "#00000000",
        frame: false,
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
    if (!app.isPackaged) {
        win.webContents.openDevTools();
    }
};
//触摸屏上禁用双指缩放
app.commandLine.appendSwitch("disable-pinch", true);
app.whenReady().then(() => {
    console.log(path_handle());
    createWindow();
    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
});

/* ipc命令监听器 */

ipcMain.on("window-min", () => {
    win.minimize();
});

ipcMain.on("window-close", () => {
    win.close();
});

ipcMain.on("OpenDevTools", () => {
    win.webContents.openDevTools();
});

ipcMain.on("choose_java", (event) => {
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
            .then((file) => {
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
            .catch((err) => {
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
            .then((file) => {
                console.log(file.canceled);
                if (!file.canceled) {
                    const filepath = file.filePaths[0].toString();
                    console.log(filepath);
                    event.send("file", filepath);
                } else {
                    event.reply("file", "error");
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }
});

ipcMain.on("getGamelist", (event) => {
    event.reply("Gamelist", getGamelist());
});

function path_handle() {
    var exePath = process.cwd();

    if (os.type() === "Windows_NT") {
        /* 给温斗士擦屁股 */
        exePath = exePath.replace(/\\/g, "/");
    }
    // 从最后一个斜杠匹配到行尾 /(?=(\/)(?!.*\1)).*?$/g
    var Path = exePath.replace(/(?=(\/)(?!.*\1)).*?$/g, "/");
    if (!app.isPackaged) {
        Path = app.getAppPath() + "/";
        Path = Path + "test/";
    }
    if (!f.existsSync(Path + ".minecraft")) {
        f.mkdirSync(Path + ".minecraft");
    }
    return {
        workPath: Path,
        gamePath: Path + ".minecraft/",
    };
}

function getGamelist() {
    let gamePath = path_handle()["gamePath"] + "version/";
    let versionDirs = f.readdirSync(gamePath);
    let versions = [];
    for (let index = 0; index < versionDirs.length; index++) {
        const versionPath = `${gamePath + versionDirs[index]}/`;
        if (!f.existsSync(`${versionPath + versionDirs[index]}.json`) || !f.existsSync(`${versionPath + versionDirs[index]}.jar`)) {
            continue;
        }
        let versionData;
        try {
            versionData = JSON.parse(f.readFileSync(`${versionPath + versionDirs[index]}.json`));
        } catch (err) {
            continue;
        }
        versions.push(versionDirs[index]);
    }
    return versions;
}

async function removeDir(dir) {
    let files = f.readdirSync(dir);
    for (var i = 0; i < files.length; i++) {
        let newPath = path.join(dir, files[i]);
        let stat = f.statSync(newPath);
        if (stat.isDirectory()) {
            //如果是文件夹就递归下去
            removeDir(newPath);
        } else {
            //删除文件
            f.unlinkSync(newPath);
        }
    }
    f.rmdirSync(dir); //如果文件夹是空的，就将自己删除掉
}
