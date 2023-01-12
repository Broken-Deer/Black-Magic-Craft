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

function version_list(type) {
    setTimeout(() => {
        switch (type) {
            case "vanilla":
                $.get("https://piston-meta.mojang.com/mc/game/version_manifest.json", (data, textStatus, jqXHR) => {
                    if (jqXHR.status == 200) {
                        var _version_list = data["versions"];
                        for (let i = 0; i < _version_list.length; i++) {
                            let version_info = _version_list[i];
                            if (version_info["type"] == "release") {
                                var icon = "grass_block";
                                var type = "正式版";
                            }
                            if (version_info["type"] == "snapshot") {
                                var icon = "crafting_table";
                                var type = "测试版";
                            }
                            if (version_info["type"] == "old_beta" || version_info["type"] == "old_alpha") {
                                var icon = "ancient_debris";
                                var type = "远古版";
                            }
                            let date = new Date(version_info["releaseTime"]);
                            $("#_version_list").append(`
                            <li class="${icon}">
                                <div class="a">
                                    <div class="icon"></div>
                                    <div class="info">
                                        <p class="title">${version_info["id"]}</p>
                                        <span>发布于${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日 ${type}</span>
                                    </div>
                                </div>
                                <div class="button download" onclick="install_game('${version_info["url"]}', '${version_info["id"]}')">
                                    <i></i>
                                </div>
                            </li>
                            `);
                        }
                        setTimeout(() => {
                            $("#B9C498C7").fadeOut(200);
                            $("#_version_list").attr("style", "opacity: 1;");
                            $("#5D4CBB91").removeClass("disable");
                        }, 500);
                    } else {
                        // 失败后的操作;
                    }
                });
                break;
        }
    }, 500);
}

function install_game(url, id) {
       dialog("game_install");
    $("#5E79266D").html(`正在安装${id}`);
    $("#lib").html("");
    $("#assets_file").html(""); 
    setTimeout(() => {
        console.log("获取路径");
        ipc.send("getPath");
        ipc.once("Path", (event, path) => {
            // 获取路径，以后改成检查安装条件
            installGame(url, id, path);
        });
        /*         var i = setInterval(() => {
            if ($("#task1").hasClass("circle-check") && $("#task2").hasClass("circle-check") && $("#task3").hasClass("circle-check") && $("#task4").hasClass("circle-check")) {
                dialog_close("game_install");
                clearInterval(i);
            }
        }, 50); // 循环检查这几个元素有没有打勾 */
    }, 500);
}

async function install_progress() {}

function updateUI(arg) {
    $(`#${arg[2]}`).html(`${arg[0]} / ${arg[1]}`);
}

async function installGame(url, id, path) {
    console.log(`创建安装任务：版本${id}`);
    const Path = path.gamePath;
    console.log("1.获取并解析版本信息");
    var versionInfo;
    await $.get(url, function (data, textStatus, jqXHR) {
        console.log(data);
        versionInfo = data;
    });
    addToDownloadQueue(url, `${Path}versions/${id}/${id}.json`);
    console.log("2.获取系统信息");
    let os_type;
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
    console.log(os_type, os_arch, os_version);
    console.log("3.生成依赖库下载队列");
    const Libraries = versionInfo.libraries;
    const LibrariesPath = `${Path}libraries/`;
    for (let i = 0; i < Libraries.length; i++) {
        // 检查 rules 键
        let allow = false;
        if (typeof Libraries[i].rules == "undefined") {
            allow = true;
        } else {
            const rules = Libraries[i].rules;
            for (let index = 0; index < rules.length; index++) {
                if (typeof rules[index].os != "undefined") {
                    if (
                        rules[index]["action"] === "allow" &&
                        (typeof rules[index].os.name == "undefined" || os_type === rules[index].os.name) &&
                        (typeof rules[index].os.arch == "undefined" || os_arch === rules[index].os.arch) &&
                        (typeof rules[index].os.version == "undefined" || os_version.search(rules[index].os.version) !== -1)
                    ) {
                        allow = true;
                    } else if (rules[index]["action"] === "disallow" && os_type != rules[index].os.name && os_arch != rules[index].os.arch && os_version.search(rules[index].os.version) == -1) {
                        allow = true;
                    }
                }
            }
        }
        if (allow === true) {
            // 检查依赖库类型并加入下载列表
            let downloadInfo;
            if (typeof Libraries[i]["downloads"]["classifiers"] == "undefined") {
                downloadInfo = Libraries[i]["downloads"]["artifact"];
            } else {
                if (typeof Libraries[i]["downloads"]["classifiers"][`native-${os_type}`] != "undefined") {
                    downloadInfo = Libraries[i]["downloads"]["classifiers"][`native-${os_type}`];
                    console.log("有一个native库");
                } else if (typeof Libraries[i]["downloads"]["artifact"] != "undefined") {
                    downloadInfo = Libraries[i]["downloads"]["artifact"];
                }
            }
            if (typeof downloadInfo != "undefined") {
                addToDownloadQueue(downloadInfo["url"], LibrariesPath + downloadInfo["path"]);
            }
        }
    }
    console.log("4.获取并解析资源索引");
    const AccessIndexFileURL = versionInfo.assetIndex.url;
    let AccessIndex;
    await $.get(AccessIndexFileURL, function (data, textStatus, jqXHR) {
        console.log(data);
        AccessIndex = data;
    });
    addToDownloadQueue(AccessIndexFileURL, `${Path}assets/indexes/${versionInfo.assetIndex.id}.json`);
    console.log("5.生成资源文件下载队列");
    const Access = AccessIndex.objects;
    Object.keys(Access).forEach((i) => {
        let hash = Access[i].hash;
        let hash_ = hash.substring(0, 2);
        addToDownloadQueue(`http://resources.download.minecraft.net/${hash_}/${hash}`, `${Path}assets/objects/${hash_}/${hash}`);
    });
    console.log("6.启动队列")
    console.log(tasklist)
    startDownloadQueue()
}
