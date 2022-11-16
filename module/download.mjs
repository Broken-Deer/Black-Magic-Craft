import { app } from "electron";
import f from "fs";
import os from "os";
import { join, resolve } from "path";
import { ipcMain } from "electron";
import got from "got";
import path from "path";
import { pipeline } from "stream";

ipcMain.on("install_game", async function (event, args) {
    console.log(`创建安装任务, 版本名称：${args[1]}`);
    /* 获取安装位置 */
    var Path = path_handle()["gamePath"];

    /* 创建version文件夹（如果不存在的话） */
    if (!f.existsSync(`${Path}version`)) {
        f.mkdirSync(`${Path}version`);
    }

    /* 如果已经存在此文件夹，直接删掉并重新创建，之前应该已经检查过输入的名称了 */
    if (f.existsSync(`${Path}version/${args[1]}`)) {
        await removeDir(`${Path}version/${args[1]}`);
    }
    f.mkdirSync(`${Path}version/${args[1]}`);

    /* 分步骤下载文件全部完成后继续往下执行 */
    await new Promise(function (resolve, reject) {
        console.log("1. 下载版本json");

        /* 初始化 */
        var download_to = `${Path}version/${args[1]}/${args[1]}.json`;
        const downloadStream = got.stream(args[0]);
        const fileWriterStream = f.createWriteStream(download_to);

        /* 放置侦测器监听下载 */
        downloadStream.on("error", () => {});
        fileWriterStream
            .on("error", () => {})
            .on("finish", () => {
                console.log("第一步完成");
                resolve(JSON.parse(f.readFileSync(download_to))); // 解码下载到的数据为js对象并送往下一步
            });

        /* 下载并写入 */
        downloadStream.pipe(fileWriterStream);
    }).then((version_data) => {
        /* 初始化 */
        let lib = version_data["libraries"];
        let libPath = Path + "libraries/";

        /* 转换系统信息，使其能够正确匹配版本json */
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
            default: // 上面三种以外的拒绝安装（如果之后能测试其他系统的话我会加到里面）
                resolve();
                break;
        }
        let os_arch = os.arch();
        let os_version = os.release();
        /* fileNum表示需要下载的文件个数，downloadNum表示已经下载的个数 */
        var fileNum = 0;
        var downloadedNum = 0;
        for (let i = 0; i < lib.length; i++) {
            /* 给麻将擦屁股：检查当前系统的信息是否符合条件，符合条件了允许下载 */
            /* allow表示是否同意下载此键的内容 */
            let allow = false;
            if (typeof lib[i]["rules"] == "undefined") {
                allow = true;
                fileNum = fileNum + 1;
                console.log(fileNum);
            } else {
                let rules = lib[i]["rules"];

                for (let index = 0; index < rules.length; index++) {
                    /* 给麻将擦屁股：如果规则中不包含os键，直接他妈的跳过 */
                    if (typeof rules[index]["os"] != "undefined") {
                        if (
                            // 判定规则：action允许，且os键里的条件要么没指定要么匹配当前系统 -> 允许下载
                            rules[index]["action"] === "allow" &&
                            (typeof rules[index]["os"]["name"] == "undefined" || os_type === rules[index]["os"]["name"]) &&
                            (typeof rules[index]["os"]["arch"] == "undefined" || os_arch === rules[index]["os"]["arch"]) &&
                            (typeof rules[index]["os"]["version"] == "undefined" || os_version.search(rules[index]["os"]["version"]) !== -1)
                        ) {
                            allow = true;
                            fileNum = fileNum + 1;
                            console.log(fileNum);
                        } else if (
                            // 判定规则： action不允许，且当前系统信息全部不匹配 -> 允许下载
                            rules[index]["action"] === "disallow" &&
                            os_type != rules[index]["os"]["name"] &&
                            os_arch != rules[index]["os"]["arch"] &&
                            os_version.search(rules[index]["os"]["version"]) == -1
                        ) {
                            allow = true;
                            fileNum = fileNum + 1;
                            console.log(fileNum);
                        }
                    }
                }
            } /* 根据上面的结果决定是否下载 */
            if (allow == true) {
                /* 先检查是否为native库 */
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
                /* 上面检查完了之后还需检查下载信息，如果未指定则跳过此次下载 */
                if (typeof download_info != "undefined") {
                    /* 如果文件夹不存在就先创建 */
                    makeDir((libPath + download_info["path"]).replace(/(?=(\/)(?!.*\1)).*?$/g, ""));
                    /*  */
                    const downloadStream = got.stream(download_info["url"]);
                    const fileWriterStream = f.createWriteStream(libPath + download_info["path"]);
                    /* 放置侦测器监听下载 */
                    downloadStream.on("error", () => {});
                    fileWriterStream
                        .on("error", () => {
                            console.log("一个错误");
                        }) //错误处理
                        .on("finish", () => {
                            downloadedNum = downloadedNum + 1;
                            console.log("a" + downloadedNum);
                            if (fileNum == downloadedNum) {
                                console.log("依赖库已补完");
                                complete_assets(version_data);
                            }
                        });

                    /* 下载并写入 */
                    downloadStream.pipe(fileWriterStream);
                } else {
                    downloadedNum = downloadedNum + 1;
                    console.log("a" + downloadedNum);
                    if (fileNum == downloadedNum) {
                        console.log("依赖库已补完");
                        complete_assets(version_data);
                    }
                }
            }
        }
        /* 下载主文件 */
        var download_to = `${Path}version/${args[1]}/${args[1]}.jar`;
        const downloadStream = got.stream(version_data["downloads"]["client"]["url"]);
        console.log(version_data["downloads"]["client"]["url"]);
        const fileWriterStream = f.createWriteStream(download_to);
        downloadStream.on("error", () => {});
        fileWriterStream
            .on("error", () => {})
            .on("finish", () => {
                console.log("游戏主文件下载完成");
            });
        downloadStream.pipe(fileWriterStream);
    });
});

function complete_assets(version_data) {
    /* 下载资源索引，解析后调用函数补完资源文件 */
    var Path = path_handle()["gamePath"];
    var assets_index_file = `${Path}assets/indexes/${version_data["assetIndex"]["id"]}.json`;
    makeDir(assets_index_file.replace(/(?=(\/)(?!.*\1)).*?$/g, ""));
    const assetsIndexdownloadStream = got.stream(version_data["assetIndex"]["url"]);
    const assetsIndexfileWriterStream = f.createWriteStream(assets_index_file);
    assetsIndexdownloadStream.on("error", () => {}); // 下载失败处理
    assetsIndexfileWriterStream
        .on("error", () => {}) // 写入失败处理
        .on("finish", () => {
            console.log("资源索引下载完成");
            var assets_index = JSON.parse(f.readFileSync(assets_index_file, "utf-8"));
            var assets_list = assets_index["objects"];
            Object.keys(assets_index["objects"]).forEach(async (e) => {
                let hash = assets_list[e]["hash"];
                let hash_ = hash.substring(0, 2);
                makeDir(`${Path}assets/objects/${hash_}`);
                var download_to = `${Path}assets/objects/${hash_}/${hash}`;
                const downloadStream = got.stream(`https://bmclapi2.bangbang93.com/assets/${hash_}/${hash}`);
                const fileWriterStream = f.createWriteStream(download_to);
                downloadStream.on("error", (error) => {
                    console.log(`assets file: ${error.message} ; url: https://bmclapi2.bangbang93.com/assets/${hash_}/${hash}`);
                });
                fileWriterStream
                    .on("error", () => {})
                    .on("finish", () => {
                        console.log("success");
                    });
                await pipeline(downloadStream, fileWriterStream);
            });
        });
    assetsIndexdownloadStream.pipe(assetsIndexfileWriterStream);
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
