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

import { InstallVanillaGame, InstallGameByJSON } from "./DefaultGameInstaller.mjs";
import { installForgeTask } from "@xmcl/installer";
import { GetPath, GetTaskStatus, MargeVersionJSON, renameGame } from "./InstallerHelper.mjs";
import { getEventObj } from "../utils/Other.mjs";
import path from "path";
import f from "fs/promises";

/**
 * 安装游戏然后安装forge
 */
export async function InstallGameWithForge(versionName, MinecraftVersion, ForgeVersion, instanceName) {
    const MinecraftLocation = GetPath().gamePath;
    const event = getEventObj()
    await InstallVanillaGame(MinecraftVersion, MinecraftVersion, false, false);
    console.log(ForgeVersion, MinecraftVersion, MinecraftLocation)
    const ForgeInstallTask = installForgeTask(
        { version: ForgeVersion, mcversion: MinecraftVersion },
        MinecraftLocation
    );
    let ForgeInstallLastProgress;
    const AutoUpdateUI = setInterval(() => {
        if (ForgeInstallTask.isDone) {
            clearInterval(AutoUpdateUI);
        }
        const stat = {
            instanceName: instanceName,
            status: GetTaskStatus(ForgeInstallTask, ForgeInstallLastProgress)
        }
        event.reply('update-download-task', stat)
        console.log(stat)
        ForgeInstallLastProgress = ForgeInstallTask.progress;
    }, 300);
    await ForgeInstallTask.startAndWait({
        onFailed(task, error) {
            console.log(114514)
            ForgeInstallTask.cancel();
            event.reply('download-faild', { instanceName: instanceName, error: error })
            clearInterval(AutoUpdateUI);
            throw error;
        },
    });
    await renameGame(`${MinecraftVersion}-forge-${ForgeVersion}`, versionName);
    await f.writeFile(
        path.join(MinecraftLocation, `versions/${versionName}/${versionName}.json`),
        JSON.stringify(
            await MargeVersionJSON(path.join(MinecraftLocation, `versions/${versionName}/${versionName}.json`))
        )
    );
    event.reply('download-complete', instanceName)
}
