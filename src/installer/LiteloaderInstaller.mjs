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
import { installLiteloader } from "@xmcl/installer";
import { InstallGameByJSON } from "./DefaultGameInstaller.mjs";
import { InstallVanillaGame } from "./DefaultGameInstaller.mjs";
import { GetPath } from "./InstallerHelper.mjs";
/**
 * 安装原版游戏并安装Liteloader
 * @param {String} MinecraftVersion Minecraft版本
 * @param {String} VersionName 命名为
 */
export async function InstallGameWithLiteloader(MinecraftVersion, VersionName) {
    const MinecraftLocation = GetPath().gamePath;
    if (!f.existsSync(path.join(MinecraftLocation, "versions", VersionName))) {
        await InstallVanillaGame(MinecraftVersion, MinecraftVersion);
    }
    await InstallVanillaGame(MinecraftVersion, MinecraftVersion, true, false);
    installLiteloader(await getLiteloaderVersionMeta("1.12.2"), MinecraftLocation, {
        inheritsFrom: MinecraftVersion,
        versionId: VersionName,
    });
    InstallGameByJSON(VersionName)
}