import ElectronStore from "electron-store";
import { ipcMain } from "electron";
import f from "fs";
import exe from "child_process";
const store = new ElectronStore();
/**
 * ipc测试
 */
ipcMain.on("getJavalist", (event) => {
    (async () => {
        await getJavalist(event);
    })();
});

/**
 * 获取已安装的所有java，并发送给渲染进程
 */
export async function getJavalist(event) {
    exe.exec('PowerShell -Command "Get-ItemProperty HKLM:\\Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\* | Select-Object InstallLocation"', (err, stdout) => {
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
        event.reply("Javalist", Javalist);
        console.log(Javalist);
    });
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
 * 运行 Minecraft 的 Java 环境
 */
export function getJava(versionName) {
    if (isGloble()) {
        if (store.has("globle.game.jvpath")) {
            return store.get("globle.game.jvpath");
        } else {
            store.set("globle.game.jvpath", "114514");
        }
    } else {
        try {
            usesGlobal = JSON.parse(f.readFileSync(`${getGameDir() + versionName}/bml.json`))["usesGlobal"];
        } catch (err) {
            return true;
        }
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
