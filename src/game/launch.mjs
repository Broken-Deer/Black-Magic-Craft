import f from "fs";
import { complete_assets } from "../installer/minecraft.mjs";
import os from "os";
import exe from "child_process";
import { ipcMain } from "electron";
import { app } from "electron";

/**
 * 启动游戏
 * @param {string} versionName 安装时使用的版本名称
 * @param {obj} event ipc event
 * @param {obj} options jvm选项
 * options需包含“jrePath(java路径),mx(最大内存),mn(最小内存),”
 */

ipcMain.on("launchGame", async (event, args) => {
    console.log("111111111111111111111");
    var options = {
        jrePath: "java.exe",
        mx: 4096,
        mn: 128,
        launcher_name: "Black-Magic-Craft",
        launcher_version: "1.0.0",
        auth_player_name: "Old_Old",
        version_name: "1.19.2",
        game_directory: "Y:/mc/test.minecraft/version/1.19.2",
        assets_root: "Y:/mc/test/.minecraft/assets",
        assets_index_name: "1.19",
        auth_uuid: "100062fc9db949789bccc0f781cc0cad",
        auth_access_token: "0000000000000000",
        clientid: "0",
        auth_xuid: "0",
        user_type: "mojang",
        version_type: "\"Black Magic Craft\"",
    };
    launchGame(args[0], event, options);
});

export async function launchGame(versionName, event, options) {
    var Path = path_handle()["gamePath"];
    if (!f.existsSync(`${Path}version/${versionName}`)) {
        return false;
    }
    const versionData = JSON.parse(f.readFileSync(`${Path}version/${versionName}/${versionName}.json`));
    options["classpath"] = `"${getClasspathOption(versionData)}"`;
    console.log(`"${getClasspathOption(versionData)}"`);
    var command = `${options["jrePath"]}`;
    var os_type;
    switch (os.type()) {
        case "Windows_NT":
            os_type = "windows";
            break;
        case "Linux":
            os_type = "linux";
            break;
        case "Darwin":
            os_type = "osx";
            break;
        default:
            return false;
    }
    let os_arch = os.arch();
    let os_version = os.release();
    let jvmArgs = versionData["arguments"]["jvm"];
    for (let index = 0; index < jvmArgs.length; index++) {
        if (typeof jvmArgs[index] == "string") {
            command = addOption(command, jvmArgs[index], options);
        } else {
            let rules = jvmArgs[index]["rules"];
            let allow = false;
            if (typeof jvmArgs[index]["rules"] == "undefined") {
                allow = true;
            } else {
                for (let rua = 0; rua < rules.length; rua++) {
                    if (typeof rules[rua]["os"] != "undefined") {
                        if (
                            rules[rua]["action"] === "allow" &&
                            (typeof rules[rua]["os"]["name"] == "undefined" || os_type === rules[rua]["os"]["name"]) &&
                            (typeof rules[rua]["os"]["arch"] == "undefined" || os_arch === rules[rua]["os"]["arch"]) &&
                            (typeof rules[rua]["os"]["version"] == "undefined" || os_version.search(rules[rua]["os"]["version"]) !== -1)
                        ) {
                            allow = true;
                        } else if (
                            rules[rua]["action"] === "disallow" &&
                            os_type != rules[rua]["os"]["name"] &&
                            os_arch != rules[rua]["os"]["arch"] &&
                            os_version.search(rules[rua]["os"]["version"]) == -1
                        ) {
                            allow = true;
                        }
                    }
                }
            }
            if (allow === true) {
                let values = jvmArgs[index]["value"];
                if (typeof jvmArgs[index]["value"] != "undefined") {
                    if (typeof jvmArgs[index]["value"] != "string") {
                        for (let i = 0; i < values.length; i++) {
                            command = addOption(command, `${values[i]}`, options);
                        }
                    } else {
                        command = addOption(command, `${values}`, options);
                    }
                }
            }
        }
    }
    command = addOption(
        command,
        `-Xmx2G -XX:+UnlockExperimentalVMOptions -XX:+UseG1GC -XX:G1NewSizePercent=20 -XX:G1ReservePercent=20 -XX:MaxGCPauseMillis=50 -XX:G1HeapRegionSize=32M net.minecraft.client.main.Main`
    );
    let gameArgs = versionData["arguments"]["game"];
    for (let index = 0; index < gameArgs.length; index++) {
        if (typeof gameArgs[index] == "string") {
            command = addOption(command, gameArgs[index], options);
        }
    }
    command = addOption(command, "--width 2048 --height 1152");
    await complete_assets(versionData, event);
    exe.exec(command);
}

function path_handle() {
    var exePath = process.cwd();
    if (os.type() === "Windows_NT") {
        exePath = exePath.replace(/\\/g, "/");
    }
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

/**
 * 计算-cp后面的内容
 * @param {obj} versionData 解析版本json得到的信息
 */
function getClasspathOption(versionData) {
    let lib = versionData["libraries"];
    let libPath = path_handle()["gamePath"] + "libraries/";
    let os_type = 0;
    var liblist = [];
    switch (os.type()) {
        case "Windows_NT":
            os_type = "windows";
            break;
        case "Linux":
            os_type = "linux";
            break;
        case "Darwin":
            os_type = "osx";
            break;
        default:
            return;
    }

    let os_arch = os.arch();
    let os_version = os.release();
    for (let i = 0; i < lib.length; i++) {
        let allow = false;
        if (typeof lib[i]["rules"] == "undefined") {
            allow = true;
        } else {
            let rules = lib[i]["rules"];
            for (let index = 0; index < rules.length; index++) {
                if (typeof rules[index]["os"] != "undefined") {
                    if (
                        rules[index]["action"] === "allow" &&
                        (typeof rules[index]["os"]["name"] == "undefined" || os_type === rules[index]["os"]["name"]) &&
                        (typeof rules[index]["os"]["arch"] == "undefined" || os_arch === rules[index]["os"]["arch"]) &&
                        (typeof rules[index]["os"]["version"] == "undefined" || os_version.search(rules[index]["os"]["version"]) !== -1)
                    ) {
                        allow = true;
                    } else if (
                        rules[index]["action"] === "disallow" &&
                        os_type != rules[index]["os"]["name"] &&
                        os_arch != rules[index]["os"]["arch"] &&
                        os_version.search(rules[index]["os"]["version"]) == -1
                    ) {
                        allow = true;
                    }
                }
            }
        }
        if (allow == true) {
            // 检查依赖库类型并拼接字符串
            let download_info;
            if (typeof lib[i]["downloads"]["classifiers"] == "undefined") {
                download_info = lib[i]["downloads"]["artifact"];
            } else {
                if (typeof lib[i]["downloads"]["classifiers"][`native-${os_type}`] != "undefined") {
                    download_info = lib[i]["downloads"]["classifiers"][`native-${os_type}`];
                    console.log("有一个native库");
                } else if (typeof lib[i]["downloads"]["artifact"] != "undefined") {
                    download_info = lib[i]["downloads"]["artifact"];
                }
            }
            if (typeof download_info != "undefined") {
                liblist.push(libPath + download_info["path"]);
            }
        }
    }
    let result = "";
    for (let index = 0; index < liblist.length; index++) {
        result = `${result}${liblist[index]};`;
    }
    return `${result}Y:/mc/test/.minecraft/version/1.19.2/1.19.2.jar`;
}

function addOption(originally, toAdd, options) {
    console.log(toAdd);
    if (toAdd.search(/\$[^}]+}/g) == -1) {
        var rua = `${originally} ${toAdd}`;
    } else if (typeof options[toAdd.match(/(?<=\{)[^}]*(?=\})/g)] == "undefined") {
        var rua = originally;
    } else {
        var rua = `${originally} ${toAdd.replace(/\$[^}]+}/g, options[toAdd.match(/(?<=\{)[^}]*(?=\})/g)])}`;
    }
    /* fu*kin Windows */
    if (os.type() == "Windows_NT") {
        return rua.replace(/\//g, "\\");
    } else {
        return rua;
    }
}
