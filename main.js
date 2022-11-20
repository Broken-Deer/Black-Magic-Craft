const { app, BrowserWindow, dialog, session } = require("electron");
const execSync = require("child_process").exec;
const f = require("fs");
const os = require("os");
const path = require("path");
const ipcMain = require("electron").ipcMain;
(async () => {
    await import("./src/installer/minecraft.mjs");
    await import("./src/game/launch.mjs");
})();

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
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: false,
            webSecurity: false,
            webviewTag: true,
        },
        icon: path.join(__dirname, "./logo.ico"),
    });

    win.loadFile("./view/index.html");
    if (!app.isPackaged) {
        win.webContents.openDevTools();
    }
};

app.whenReady().then(() => {
    console.log(path_handle());
    createWindow();
    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
    win.once("ready-to-show", () => {
        win.show();
    });
});

app.on("window-all-closed", () => {
    /*     session.defaultSession.cookies // 退出时清除cookie
        .get({})
        .then((cookies) => {
            cookies.forEach((cookie) => {
                let url = "";
                // get prefix, like https://www.
                url += cookie.secure ? "https://" : "http://";
                url += cookie.domain.charAt(0) === "." ? "www" : "";
                // append domain and path
                url += cookie.domain;
                url += cookie.path;
                session.defaultSession.cookies.remove(url, cookie.name, (error) => {
                    if (error) console.log(`error removing cookie ${cookie.name}`, error);
                });
            });
        })
        .catch((error) => {
            console.log(error);
        }); */
    if (process.platform !== "darwin") app.quit();
});

/* ipc命令监听器 */

ipcMain.on("window-min", function () {
    win.minimize();
});
ipcMain.on("window-close", function () {
    win.close();
});
ipcMain.on("OpenDevTools", function () {
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
