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
import { Version } from "@xmcl/core";
import { installLibrariesTask, installAssetsTask, getVersionList } from "@xmcl/installer";
import path from "path";
import f from "fs";
import { GetTaskStatus, GetPath, removeDir } from "./InstallerHelper.mjs";
import { useGotToDownloadFile, useAria2ToDownloadFile } from "./FileDownloader.mjs";

/**
 * 使用version.json安装游戏，需确保version.json名称与文件夹名相同
 */
export async function InstallGameByJSON(versionName, completeFile) {
    const VersionDir = path.join(GetPath().gamePath, "versions", versionName);
    const VersionJSON = JSON.parse(f.readFileSync(path.join(VersionDir, `${versionName}.json`)));
    useAria2ToDownloadFile(
        VersionJSON.downloads.client.url,
        path.join(VersionDir, `${versionName}.jar`),
        undefined,
        DownloadResults => {
            if (DownloadResults.stat !== "OK") {
                throw "Download Faild!";
            }
        }
    );
    if (completeFile) {
        await InstallAssetsAndLibraries(versionName);
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
    await useGotToDownloadFile(VersionInfo.url, VersionJsonPath);
    if (!onlySaveJSON) {
        await InstallGameByJSON(versionName, completeFile);
    }
}

/**
 * 安装原版依赖库及资源文件
 */
export async function InstallAssetsAndLibraries(versionName) {
    const MinecraftLocation = GetPath().gamePath;
    const ResolvedVersion = await Version.parse(MinecraftLocation, versionName);
    const LibrariesInstallTask = installLibrariesTask(ResolvedVersion);
    const AssetsInstallTask = installAssetsTask(ResolvedVersion);
    let LibrariesLastProgress = 0;
    let AssetsLastProgress = 0;
    const AutoUpdateUI = setInterval(() => {
        if (LibrariesInstallTask.isDone && AssetsInstallTask.isDone) {
            clearInterval(AutoUpdateUI);
            console.log("done");
            return;
        }
        console.log(GetTaskStatus(LibrariesInstallTask, LibrariesLastProgress));
        console.log(GetTaskStatus(AssetsInstallTask, AssetsLastProgress));
        LibrariesLastProgress = LibrariesInstallTask.progress;
        AssetsLastProgress = AssetsInstallTask.progress;
    }, 500);
    var onFaild = {
        onFailed(task, error) {
            LibrariesInstallTask.cancel();
            AssetsInstallTask.cancel();
            clearInterval(AutoUpdateUI);
            throw error;
        },
    };
    (async () => {
        await LibrariesInstallTask.startAndWait(onFaild);
    })();
    (async () => {
        await AssetsInstallTask.startAndWait(onFaild);
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
