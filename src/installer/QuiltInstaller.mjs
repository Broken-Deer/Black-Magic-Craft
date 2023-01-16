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

import { Version } from '@xmcl/core'
import { installQuiltVersion, installDependenciesTask } from "@xmcl/installer";
import fs from "fs";
import f from 'fs/promises'
import path from "path";
import { getEventObj } from "../utils/Other.mjs";
import { InstallVanillaGame } from "./DefaultGameInstaller.mjs";
import { GetPath, GetTaskStatus, MargeVersionJSON, renameGame } from "./InstallerHelper.mjs";

/**
 * 安装原版游戏并安装Quilt
 * @param {String} MinecraftVersion Minecraft版本
 * @param {String} QuiltVersion Quilt加载器版本
 * @param {String} VersionName 命名为
 */
export async function InstallGameWithQuilt(VersionName, MinecraftVersion, QuiltVersion, instanceName) {
    const MinecraftLocation = GetPath().gamePath;
    const event = getEventObj()
    try {
        if (!fs.existsSync(path.join(MinecraftLocation, `versions/${MinecraftVersion}/${MinecraftVersion}.json`))) {
            await InstallVanillaGame(MinecraftVersion, MinecraftVersion, true, false, instanceName);
        }
        await installQuiltVersion({
            minecraftVersion: MinecraftVersion,
            version: QuiltVersion,
            minecraft: MinecraftLocation,
        });
        const VersionDir = path.join(GetPath().gamePath, `versions/${VersionName}`);
        await renameGame(`quilt-loader-${QuiltVersion}-${MinecraftVersion}`, VersionName)
        const VersionJSON = await MargeVersionJSON(
            path.join(VersionDir, `${VersionName}.json`),
            true
        );
        await f.writeFile(path.join(VersionDir, `${VersionName}.json`), JSON.stringify(VersionJSON));
    } catch (error) {
        event.reply('download-faild', { instanceName: instanceName, error: error })
        await removeDir(path.join(MinecraftLocation, `versions/${MinecraftVersion}`))
        return
    }
    const Task = installDependenciesTask(await Version.parse(MinecraftLocation, VersionName))
    const AutoUpdateUI = setInterval(() => {
        if (Task.isDone) {
            clearInterval(AutoUpdateUI);
        }
        const stat = {
            instanceName: instanceName,
            status: GetTaskStatus(Task)
        }
        event.reply('update-download-task', stat)
    }, 300);
    await Task.startAndWait({
        onFailed(task, error) {
            console.log(`为实例'${instanceName}'执行的安装任务失败`)
            try {
                Task.cancel();
            } catch (error) { }
            event.reply('download-faild', { instanceName: instanceName, error: error })
            clearInterval(AutoUpdateUI);
        },
    });
}
