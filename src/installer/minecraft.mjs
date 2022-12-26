import { app } from "electron";
import f from "fs";
import os from "os";
import { join } from "path";
import { ipcMain } from "electron";
import path from "path";
import { downloadFile, parallelDownload } from "../http/download.mjs";

ipcMain.on("install_game", async (event, args) => {
    Installer(event, args);
});

/**
 * 安装游戏
 * @param {obj} event ipc event
 * @param {obj} args ipc args
 */
export async function Installer(event, args) {
    const event_ = event;
    console.log(`创建安装任务, 版本名称：${args[1]}`);
    var Path = path_handle()["gamePath"];
    if (!f.existsSync(`${Path}versions`)) {
        f.mkdirSync(`${Path}versions`);
    }
    if (f.existsSync(`${Path}versions/${args[1]}`)) {
        await removeDir(`${Path}versions/${args[1]}`);
    }
    f.mkdirSync(`${Path}versions/${args[1]}`);
    console.log("下载版本json");
    var download_to = `${Path}versions/${args[1]}/${args[1]}.json`;
    await downloadFile(args[0], download_to);
    event_.reply("taskdone", ["task1"]);

    var version_data = JSON.parse(f.readFileSync(download_to));
    let lib = version_data["libraries"];
    let libPath = Path + "libraries/";
    let os_type = 0;
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
    var fileNum = 0;
    var from = [];
    var to = [];
    for (let i = 0; i < lib.length; i++) {
        // 检查 rules 键
        let allow = false;
        if (typeof lib[i]["rules"] == "undefined") {
            allow = true;
            fileNum = fileNum + 1;
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
                        fileNum = fileNum + 1;
                    } else if (
                        rules[index]["action"] === "disallow" &&
                        os_type != rules[index]["os"]["name"] &&
                        os_arch != rules[index]["os"]["arch"] &&
                        os_version.search(rules[index]["os"]["version"]) == -1
                    ) {
                        allow = true;
                        fileNum = fileNum + 1;
                    }
                }
            }
        }

        if (allow == true) {
            // 检查依赖库类型并生成下载列表
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
                makeDir((libPath + download_info["path"]).replace(/(?=(\/)(?!.*\1)).*?$/g, ""));
                from.push(download_info["url"]);
                to.push(libPath + download_info["path"]);
            }
        }
    }

    (async () => {
        await parallelDownload(from, to, 64, event_, "lib");
        console.log("依赖库已补完");
    })();
    complete_assets(version_data, event_); // 补全资源文件（可能补不全）

    /* 下载主文件 */
    (async () => {
        console.log("开始下载主文件");
        await downloadFile(version_data["downloads"]["client"]["url"], `${Path}versions/${args[1]}/${args[1]}.jar`, event_, "main");
        console.log("主文件下载完成");
        event_.reply("taskdone", ["task2"]);
    })();
}

/**
 *
 * @param {obj} version_data 解析版本JSON后得到的对象
 * @param {obj} event ipc event
 */
export async function complete_assets(version_data, event) {
    const event_ = event;
    /* 下载资源索引，解析后调用函数补完资源文件 */
    var Path = path_handle()["gamePath"];
    var assets_index_file = `${Path}assets/indexes/${version_data["assetIndex"]["id"]}.json`;
    await downloadFile(version_data["assetIndex"]["url"], assets_index_file);
    console.log("资源索引下载完成");
    var assets_index = JSON.parse(f.readFileSync(assets_index_file, "utf-8"));
    var assets_list = assets_index["objects"];
    var from = [];
    var to = [];
    Object.keys(assets_list).forEach((e) => {
        // 下载每一个键描述的内容
        let hash = assets_list[e]["hash"];
        let hash_ = hash.substring(0, 2);
        makeDir(`${Path}assets/objects/${hash_}`);
        from.push(`http://resources.download.minecraft.net/${hash_}/${hash}`);
        to.push(`${Path}assets/objects/${hash_}/${hash}`);
    });
    await parallelDownload(from, to, 64, event_, "assets_file");
    console.log("资源文件补完");
}

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
        let newPath = join(dir, files[i]);
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

function makeDir(dirname) {
    if (f.existsSync(dirname)) {
        return true;
    } else {
        if (makeDir(path.dirname(dirname))) {
            f.mkdirSync(dirname);
            return true;
        }
    }
}
