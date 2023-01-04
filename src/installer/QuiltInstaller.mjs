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

import { installQuiltVersion } from "@xmcl/installer";
import f from "fs";
import path from "path";
import { InstallGameByJSON, InstallVanillaGame } from "./DefaultGameInstaller.mjs";
import { downloadFileByAria2 } from "./FileDownloader.mjs";
import { GetPath, MargeVersionJSON } from "./InstallerHelper.mjs";

/**
 * 安装原版游戏并安装Quilt
 * @param {String} MinecraftVersion Minecraft版本
 * @param {String} QuiltVersion Quilt加载器版本
 * @param {String} VersionName 命名为
 */
export async function InstallGameWithQuilt(MinecraftVersion, QuiltVersion, VersionName) {
    const MinecraftLocation = GetPath().gamePath;
    if (!f.existsSync(path.join(MinecraftLocation, "versions", VersionName))) {
        await InstallVanillaGame(MinecraftVersion, MinecraftVersion, true, false);
    }
    installQuiltVersion({
        minecraftVersion: MinecraftVersion,
        version: QuiltVersion,
        minecraft: MinecraftLocation,
    });
    const VersionDir = path.join(GetPath().gamePath, `versions/${VersionName}`);
    f.rename(
        path.join(MinecraftLocation, `versions/quilt-loader-${QuiltVersion}-${MinecraftVersion}`),
        VersionDir,
        () => {
            const VersionJSON = MargeVersionJSON(
                path.join(VersionDir, `quilt-loader-${QuiltVersion}-${MinecraftVersion}.json`),
                true
            );
            f.writeFileSync(path.join(VersionDir, `${VersionName}.json`), JSON.stringify(VersionJSON));
            InstallGameByJSON(VersionName, true);
        }
    );
}
