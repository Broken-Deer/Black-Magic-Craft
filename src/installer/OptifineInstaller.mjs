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

import { installOptifine } from "@xmcl/installer";
import f from "fs";
import got from "got";
import path from "path";
import { downloadFileByAria2 } from "./FileDownloader.mjs";

export async function InstallGameWithOptifine(VersionName, MinecraftVersion, type, patch) {
    const MinecraftLocation = "Y:/mc/test/.minecraft/";
    const VersionDir = path.join(MinecraftLocation, `versions/${VersionName}`);
    downloadFileByAria2(
        `https://bmclapi2.bangbang93.com/optifine/${MinecraftVersion}/${type}/${patch}`,
        path.join(MinecraftLocation, ".cache/optifine.jar"),
        undefined,
        async DownloadResults => {
            if (DownloadResults.stat !== "OK") {
                throw "Download Failed!";
            }
            await installOptifine(path.join(MinecraftLocation, ".cache/optifine.jar"), MinecraftLocation, {
                versionId: VersionName,
            });
            const VersionInfo = (await getVersionList()).versions.filter((value, index, array) => {
                if (array[index].id === MinecraftVersion) {
                    return true;
                } else return false;
            })[0];
            var VersionJSON;
            await got(VersionInfo.url).then(response => {
                VersionJSON = JSON.parse(response.body);
            });
            const OptifineVersionJSON = JSON.parse(f.readFileSync(path.join(VersionDir, `${VersionName}.json`)));
            VersionJSON.libraries = [...VersionJSON.libraries, ...OptifineVersionJSON.libraries];
            f.writeFileSync(path.join(VersionDir, `${VersionName}.json`), JSON.stringify(VersionJSON));
            downloadFileByAria2(VersionJSON.downloads.client.url, path.join(VersionDir, `${VersionName}.jar`));
            await InstallAssetsAndLibraries(VersionName);
        }
    );
}

export function InstallOptifineAsMod(VersionName, mcversion, type, patch) {
    const MinecraftLocation = "Y:/mc/test/.minecraft/";
    downloadFileByAria2(
        `https://bmclapi2.bangbang93.com/optifine/${mcversion}/${type}/${patch}`,
        path.join(MinecraftLocation, `versions/mods/${VersionName}.jar`)
    );
}
