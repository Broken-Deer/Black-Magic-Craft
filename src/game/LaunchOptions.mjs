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
import ElectronStore from "electron-store";
import { ipcMain } from "electron";
import f from "fs";
import exe from "child_process";
import { path_handle } from "./LauncherHelper.mjs";
const store = new ElectronStore();
/**
 * IPC命令
 */
ipcMain.on("GetLaunchOption", (event, args) => {
    (async () => {
        switch (args[0]) {
            case "Javalist":
                await getJavalist(event);
                getVersionInfo("1.18.2");
                break;

            case "isGloble":
                event.reply("LaunchOption", isGloble());
                break;

            case "getJava":
                event.reply("LaunchOption", getJava(args[1]));
                break;
        }
    })();
});

/**
 * 获取已安装的所有java，并发送给渲染进程
 */
export async function getJavalist(event) {
    exe.exec(
        'PowerShell -Command "Get-ItemProperty HKLM:\\Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\* | Select-Object InstallLocation"',
        (err, stdout) => {
            let Paths = stdout.toString().split("\r\n");
            let Javalist = [];
            for (let index = 0; index < Paths.length; index++) {
                Paths[index] = Paths[index].trim();
            }
            for (let index = 0; index < Paths.length; index++) {
                if (index < 3) {
                    continue;
                }
                const Path = Paths[index].trim();
                if (Path == 0) {
                    continue;
                }
                if (!f.existsSync(`${Path}release`)) {
                    continue;
                }
                let javaInfo = f.readFileSync(`${Path}release`, "utf-8").split("\n");
                for (let o = 0; o < javaInfo.length; o++) {
                    let javaInfoItem = javaInfo[o].split("=");
                    if (javaInfoItem[0] != "JAVA_VERSION") {
                        continue;
                    }
                    Javalist.push({
                        path: `${Path}bin\\java.exe`,
                        version: javaInfoItem[1].replace(/\"/g, "").replace(/\s/g, ""),
                    });
                }
            }
            if (typeof event != "undefined") {
                event.reply("LaunchOption", Javalist);
            }
            // 更新配置文件
            store.set("javalist", Javalist);
        }
    );
}

/**
 * 是否使用全局设置
 */
function isGloble(versionName) {
    if (f.existsSync(`${getGameDir() + versionName}/bml.json`)) {
        let usesGlobal;
        try {
            usesGlobal = JSON.parse(f.readFileSync(`${getGameDir() + versionName}/bml.json`))["usesGlobal"];
        } catch (err) {
            return true;
        }
        if (usesGlobal === true) {
            return false;
        } else {
            return true;
        }
    } else {
        return true;
    }
}

/**
 * 获取版本信息
 */
export function getVersionInfo(versionName, event) {
    const root = `${path_handle().gamePath}versions/${versionName}/`;
    let versionJSON;
    try {
        versionJSON = JSON.parse(f.readFileSync(`${root}${versionName}.json`));
    } catch (e) {
        if (typeof event === "undefined") {
            return false;
        } else {
            event.reply("error", "版本JSON读取失败，此游戏可能已损坏");
            console.error("版本JSON读取失败");
        }
    }
    console.log(versionJSON);
}

/**
 * 运行 Minecraft 的 Java 环境
 */
export function getJava(versionName) {
    if (isGloble()) {
        if (!store.has("globle.game.autojv") || store.get("globle.game.autojv") === true) {
        } else {
            store.set("globle.game.jvpath", "114514");
        }
    } else {
    }
}

/**
 * 将显示在Minecraft主菜单的左下角
 */
export function getVersionType(versionName) {
    return;
}

/**
 * 用户自定义其他 minecraft 命令行参数
 */
export function getGameArguments() {
    if (store.has("globle.game.gmarg")) {
        return store.get("globle.game.gmarg");
    } else {
        return "";
    }
}

/**
 * 用户自定义其他 Java 虚拟机命令行参数。
 */
export function getJavaArguments() {
    if (store.has("globle.game.jvmarg")) {
        return store.get("globle.game.jvmarg");
    } else {
        return "";
    }
}

/**
 * JVM 可以分配的最小内存。
 */
export function getMinMemory() {}

/**
 * JVM 可以分配的最大内存。
 */
export function getMaxMemory() {}

/**
 * The maximum metaspace memory that the JVM can allocate.
 * For Java 7 -XX:PermSize and Java 8 -XX:MetaspaceSize
 * Containing class instances.
 */
export function getMetaspace() {}

/**
 * 初始游戏窗口宽度
 */
export function getWidth() {}

/**
 * 初始游戏窗口高度
 */
export function getHeight() {}

/**
 * 是否全屏
 */
export function isFullscreen() {}

/**
 * 进入游戏主菜单时将连接的服务器 ip。
 */
export function getServerIp() {}
