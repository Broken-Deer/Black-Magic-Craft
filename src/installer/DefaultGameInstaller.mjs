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

import { Version } from "@xmcl/core";
import { installLibrariesTask, installAssetsTask, getVersionList } from "@xmcl/installer";
import path from "path";
import f from "fs/promises";
import { GetTaskStatus, GetPath, removeDir } from "./InstallerHelper.mjs";
import { downloadFileByGot, downloadFileByAria2 } from "./FileDownloader.mjs";
import { getEventObj } from "../utils/Other.mjs";

/**
 * 使用version.json安装游戏，需确保version.json名称与文件夹名相同
 */
export async function InstallGameByJSON(versionName, completeFile, instanceName) {
    const event = getEventObj()
    const VersionDir = path.join(GetPath().gamePath, "versions", versionName);
    const VersionJSON = JSON.parse(await f.readFile(path.join(VersionDir, `${versionName}.json`)));
    downloadFileByAria2(
        VersionJSON.downloads.client.url,
        path.join(VersionDir, `${versionName}.jar`),
        undefined,
        DownloadResults => {
            if (DownloadResults.stat !== "OK") {
                event.reply('download-faild', instanceName)
            }
        }
    );
    if (completeFile) {
        await InstallAssetsAndLibraries(versionName, instanceName);
    }
}

/**
 * 安装游戏
 * @param {string} versionName 要安装游戏的名称
 * @param {string} minecraftVersion 要安装的版本id
 */
export async function InstallVanillaGame(versionName, minecraftVersion, onlySaveJSON, completeFile) {
    const MinecraftLocation = GetPath().gamePath;
    const VersionInfo = (await getVersionList()).versions.filter((value, index, array) => {
        if (array[index].id === minecraftVersion) {
            return true;
        } else return false;
    })[0];
    const VersionJsonPath = `${MinecraftLocation}versions/${versionName}/${versionName}.json`;
    await downloadFileByGot(VersionInfo.url, VersionJsonPath);
    if (!onlySaveJSON) {
        await InstallGameByJSON(versionName, completeFile);
    }
}

/**
 * 安装原版依赖库及资源文件
 */
export async function InstallAssetsAndLibraries(versionName, instanceName) {
    const event = getEventObj()
    const MinecraftLocation = GetPath().gamePath;
    const ResolvedVersion = await Version.parse(MinecraftLocation, versionName);
    const LibrariesInstallTask = installLibrariesTask(ResolvedVersion);
    const AssetsInstallTask = installAssetsTask(ResolvedVersion);
    let LibrariesLastProgress = 0;
    let AssetsLastProgress = 0;
    let LibrariesInstallDone = false
    let AssetsInstallDone = false
    const AutoUpdateUI = setInterval(() => {
        if (LibrariesInstallDone && AssetsInstallDone) {
            clearInterval(AutoUpdateUI);
            event.reply('download-complete', instanceName)
        }
        event.reply('update-download-task', {
            instanceName: instanceName,
            status: GetTaskStatus(AssetsInstallTask, AssetsLastProgress)
        })
        console.log(GetTaskStatus(AssetsInstallTask, AssetsLastProgress));
        LibrariesLastProgress = LibrariesInstallTask.progress;
        AssetsLastProgress = AssetsInstallTask.progress;
    }, 300);
    (async () => {
        await LibrariesInstallTask.startAndWait({
            onFailed(task, error) {
                console.log(1111111111111)
                LibrariesInstallTask.cancel();
                AssetsInstallTask.cancel();
                event.reply('download-faild', {instanceName: instanceName, error: error})
                clearInterval(AutoUpdateUI);
                throw error
            },
            onSucceed() {
                LibrariesInstallDone = true
            }
        });
    })();
    (async () => {
        await AssetsInstallTask.startAndWait({
            onFailed(task, error) {
                console.log(1111111111111)
                LibrariesInstallTask.cancel();
                AssetsInstallTask.cancel();
                event.reply('download-faild', {instanceName: instanceName, error: error})
                clearInterval(AutoUpdateUI);
            },
            onSucceed() {
                AssetsInstallDone = true
            }
        });
    })();
}

/**
 * 卸载游戏
 */
export function UninstallGame(name, event) {
    (async () => {
        try {
            await removeDir(`${GetPath().gamePath}${name}`);
        } catch (e) {
            event.reply("Uninstall", "faild");
            return;
        }
        event.reply("Uninstall", "succeed");
    })();
}

