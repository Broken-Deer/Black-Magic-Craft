import f, { chownSync } from "fs"; /* 
import { complete_assets } from "../installer/minecraft.mjs"; */
import os from "os";

var o = 
launchGame("22w46a", null, o);



function path_handle() {
    return {
        workPath: 114514,
        gamePath: "Y:/mc/test/.minecraft/",
    };
}

function addOption(originally, toAdd, options) {
    if (toAdd.search(/\$[^}]+}/g) == -1) {
        return `${originally} ${toAdd}`;
    }
    if (typeof options[toAdd.match(/(?<=\{)[^}]*(?=\})/g)] == "undefined") {
        return originally;
    } else {
        return `${originally} ${toAdd.replace(/\$[^}]+}/g, options[toAdd.match(/(?<=\{)[^}]*(?=\})/g)])}`;
    }
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
        // 检查 rules 键
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
        result = `${result + liblist[index]};`;
    }
    return result.substring(0, result.length - 1);
}
