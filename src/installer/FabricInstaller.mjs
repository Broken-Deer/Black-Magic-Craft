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

import f from "fs";
import fs from 'fs/promises'
import path from "path";
import { installFabric, getFabricLoaderArtifact } from "@xmcl/installer";
import { InstallVanillaGame } from "./DefaultGameInstaller.mjs";
import { GetPath, MargeVersionJSON, renameGame } from "./InstallerHelper.mjs";
import { getEventObj } from "../utils/Other.mjs";
import { removeDir } from "../utils/FileSystem.mjs";

/**
 * 安装原版游戏和Fabric，此处instanceName只是用来通知渲染进程安装结果的
 */
export async function InstallGameWithFabric(VersionName, MinecraftVersion, FabricVersion, instanceName) {
    try {
        const MinecraftLocation = GetPath().gamePath;
        if (!f.existsSync(path.join(MinecraftLocation, `versions/${MinecraftVersion}/${MinecraftVersion}.json`))) {
            await InstallVanillaGame(MinecraftVersion, MinecraftVersion, true, false);
        }
        await installFabric(await getFabricLoaderArtifact(MinecraftVersion, FabricVersion), MinecraftLocation);
        const VersionDir = path.join(GetPath().gamePath, `versions/${VersionName}`);
        await renameGame(`${MinecraftVersion}-fabric${FabricVersion}`, VersionName)
        const VersionJSON = await MargeVersionJSON(
            path.join(VersionDir, `${VersionName}.json`),
            true
        );
        await fs.writeFile(path.join(VersionDir, `${VersionName}.json`), JSON.stringify(VersionJSON));
        getEventObj().reply('download-complete', instanceName)
    } catch (error) {
        const MinecraftLocation = GetPath().gamePath;
        getEventObj().reply('download-faild', { instanceName: instanceName, error: error })
        await removeDir(path.join(MinecraftLocation, `versions/${MinecraftVersion}`))
    }
}
