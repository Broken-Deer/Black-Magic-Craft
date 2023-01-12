import { ipcMain, app, dialog } from "electron";
import path from "path";
import f from 'fs'
import { setInstanceManagerDetector } from "./instance/index.mjs";
import { setInstallerCommandDetector } from "./installer/index.mjs";
import { setEventObj } from "./utils/Other.mjs";
import ElectronStore from "electron-store";
import { setGameServicesDetector } from "./game/index.mjs";

function setDetector(win) {
    const store = new ElectronStore()
    ipcMain.handle('get-config', (event, key) => {
        return store.get(key)
    })
    ipcMain.handle('update-config', (event, { key, value }) => {
        console.log(key, value)
        store.set(key, value)

    })
    ipcMain.on('event-obj', (event) => {
        setEventObj(event)
    })
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
    setInstanceManagerDetector()
    setInstallerCommandDetector()
    setGameServicesDetector()
}

export {
    setDetector,
}