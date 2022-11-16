const { app, BrowserWindow, dialog } = require("electron");
const execSync = require("child_process").exec;
const f = require("fs");
const os = require("os");
var path = require("path");
let ipcMain = require("electron").ipcMain;
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

/* 单独注册下载命令侦测器 */
(async () => {
    await import("./module/download.mjs");
})();


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

function folder_initialization() {
    let Path = path_handle()["gamePath"];
}
/* 
    request(
        {
            url: "https://piston-meta.mojang.com/mc/game/version_manifest.json",
            method: "GET",
            json: true,
            headers: {
                "content-type": "application/json",
            },
            body: {
                id: "234232332",
            },
        },
        (err, rep, body) => {
            if (err) {
                console.log(" request 请求get请求出现错误 err:", err);
                return false;
            }
            // body表示返回的数据
            if (body) {
                // 请求成功
            }
        }
    );

*/
