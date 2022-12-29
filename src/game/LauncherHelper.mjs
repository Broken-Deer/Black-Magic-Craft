/*
 * Black Magic Launcher
 * Copyright (C) 2020 Broken-Deer <old_driver__@outlook.com> and contributors
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
import { app, ipcMain } from "electron";
import os from "os";
import f from "fs";
import path from "path";

ipcMain.on("getGamelist", (event) => {
    event.reply("Gamelist", getGamelist());
});
ipcMain.on('getPath', (event) => {
    event.reply("Path", path_handle())
})

export function path_handle() {
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

export function getGamelist() {
    let gamePath = path_handle()["gamePath"] + "versions/";
    makeDir(gamePath)
    let versionDirs = f.readdirSync(gamePath);
    let versions = [];
    for (let index = 0; index < versionDirs.length; index++) {
        const versionPath = `${gamePath + versionDirs[index]}/`;
        if (!f.existsSync(`${versionPath + versionDirs[index]}.json`) || !f.existsSync(`${versionPath + versionDirs[index]}.jar`)) {
            continue;
        }
        let versionData;
        try {
            versionData = JSON.parse(f.readFileSync(`${versionPath + versionDirs[index]}.json`));
        } catch (err) {
            continue;
        }
        versions.push(versionDirs[index]);
    }
    return versions;
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