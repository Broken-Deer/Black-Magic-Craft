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
import os, { version } from "os";
import f from "fs";
/* import { app } from "electron"; */
import path from "path";
import got from "got";
import { getVersionList } from "@xmcl/installer";

export function getOSInfomation() {
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
    return {
        arch: os.arch(),
        release: os.release(),
        platform: os.platform(),
        type: os_type,
    };
}

/* export function GetPath() {
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
} */

export function GetPath() {
    return {
        workPath: "Y:/mc",
        gamePath: "Y:/mc/test/.minecraft/",
    };
}

export async function removeDir(dir) {
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
export function GetTaskStatus(task, lastProgress) {
    return {
        name: task.name,
        isDone: task.isDone,
        progress: (task.progress / 1048576).toFixed(2),
        total: (task.total / 1048576).toFixed(2),
        percentage: ((task.progress / task.total) * 100).toFixed(2),
        speed:
            (task.progress - lastProgress) * 2 < 1048576
                ? (((task.progress - lastProgress) * 2) / 1024).toFixed(2) + "Kib/s"
                : (((task.progress - lastProgress) * 2) / 1048576).toFixed(2) + "Mib/s",
    };
}

export function renameGame(OldVersionName, NewVersionName) {
    const OldVersionDir = path.join(GetPath().gamePath, "versions", OldVersionName);
    const NewVersionDir = path.join(GetPath().gamePath, "versions", NewVersionName);
    try {
        f.renameSync(OldVersionDir, NewVersionDir);
    } catch (error) {}
    try {
        f.renameSync(
            path.join(NewVersionDir, `${OldVersionName}.jar`),
            path.join(NewVersionDir, `${NewVersionName}.jar`)
        );
    } catch (error) {}
    try {
        f.renameSync(
            path.join(NewVersionDir, `${OldVersionName}.json`),
            path.join(NewVersionDir, `${NewVersionName}.json`)
        );
    } catch (error) {}
}

/**
 * 将不完整的version.json与对应的原版json合并
 * @param { String } filePath 不完整的JSON所在的位置
 * @param { Boolean } deleteOriginal 是否删除原来的version.json
 */
export async function MargeVersionJSON(filePath, deleteOriginal, inheritsFrom) {
    const OriginalVersionJSON = JSON.parse(f.readFileSync(filePath));
    let VersionJSON;
    if (typeof inheritsFrom === "string") {
        VersionJSON = JSON.parse(
            f.readFileSync(path.join(path.dirname(filePath), "..", inheritsFrom, `${inheritsFrom}.json`))
        );
    } else {
        VersionJSON = await getVersionJSON(OriginalVersionJSON.inheritsFrom);
    }
    try {
        VersionJSON.arguments.jvm = [...VersionJSON.arguments.jvm, ...OriginalVersionJSON.arguments.jvm];
    } catch (error) {}
    try {
        VersionJSON.arguments.game = [...VersionJSON.arguments.game, ...OriginalVersionJSON.arguments.game];
    } catch (error) {}
    try {
        VersionJSON.libraries = [...VersionJSON.libraries, ...OriginalVersionJSON.libraries];
    } catch (error) {}
    try {
        VersionJSON.logging = [...VersionJSON.logging, ...OriginalVersionJSON.logging];
    } catch (error) {}
    try {
        VersionJSON.mainClass = OriginalVersionJSON.mainClass;
    } catch (error) {}
    if (deleteOriginal) {
        f.unlink(filePath, () => {});
    }
    console.log(VersionJSON);
    return VersionJSON;
}

/**
 * 获取版本JSON
 */
export async function getVersionJSON(MinecraftVersion) {
    let VersionJSON;
    const VersionInfo = (await getVersionList()).versions.filter((value, index, array) => {
        if (array[index].id === MinecraftVersion) {
            return true;
        } else return false;
    })[0];
    await got(VersionInfo.url).then(response => {
        VersionJSON = JSON.parse(response.body);
    });
    return VersionJSON;
}
