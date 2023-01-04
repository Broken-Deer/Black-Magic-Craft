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

import { installLiteloader } from "@xmcl/installer";
import { InstallGameByJSON } from "./DefaultGameInstaller.mjs";
import { InstallVanillaGame } from "./DefaultGameInstaller.mjs";
import { GetPath, MargeVersionJSON } from "./InstallerHelper.mjs";
import f from "fs";
import path from "path";
import got from "got";

/**
 * 安装原版游戏并安装Liteloader
 * @param {String} MinecraftVersion Minecraft版本
 * @param {String} VersionName 命名为
 */
export async function InstallGameWithLiteloader(MinecraftVersion, VersionName) {
    const MinecraftLocation = GetPath().gamePath;
    if (!f.existsSync(path.join(MinecraftLocation, "versions", MinecraftVersion, `${MinecraftVersion}.json`))) {
        await InstallVanillaGame(MinecraftVersion, MinecraftVersion, true, false);
    }
    await installLiteloader(await getLiteloaderVersionMeta("1.12.2"), MinecraftLocation, {
        inheritsFrom: MinecraftVersion,
        versionId: VersionName,
    });
    f.writeFileSync(
        path.join(MinecraftLocation, "versions", VersionName, `${VersionName}.json`),
        await MargeVersionJSON(
            path.join(MinecraftLocation, "versions", VersionName, `${VersionName}.json`),
            false,
            MinecraftVersion
        )
    );
    InstallGameByJSON(VersionName);
}

/**
 * 获取Liteloader版本安装信息
 */
export async function getLiteloaderVersionMeta(MinecraftVersion) {
    let VersionList;
    await got("https://bmclapi2.bangbang93.com/liteloader/list").then(response => {
        VersionList = JSON.parse(response.body);
    });
    return VersionList.filter((value, index, array) => {
        if (array[index].mcversion === MinecraftVersion) {
            return true;
        }
    })[0].build;
}
