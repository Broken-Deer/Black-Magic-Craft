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

import path from "path";
import nbt from "prismarine-nbt";
import { GetPath } from "../installer/InstallerHelper.mjs";
import f from 'fs/promises'
import fs from 'fs'
import { removeDir } from "../utils/FileSystem.mjs";
import Long from "long";
import { GetActiveID } from "./index.mjs";

async function getWorldInfo(instanceName, DirName) {
    let WorldInfoNBT;
    await f.readFile(path.join(GetPath().gamePath, `instances/${instanceName}/saves/${DirName}/level.dat`))
        .then(async value => { WorldInfoNBT = (await nbt.parse(value)).parsed.value.Data.value; });
    let Info = {};
    Object.keys(WorldInfoNBT).forEach(key => { Info[key] = WorldInfoNBT[key].value; });
    return Info;
}

async function getWorldName(instanceName, DirName) {
    let worldName;
    await f.readFile(path.join(GetPath().gamePath, `instances/${instanceName}/saves/${DirName}/level.dat`))
        .then(async value => { worldName = (await nbt.parse(value)).parsed.value.Data.value.LevelName.value; });
    return
}

async function addWorld(instanceName, from) {
    await f.copyFile(from, path.join(getWorldPath(instanceName), path.basename(from)))
        .catch((reason) => { throw reason })
}

async function removeWorld(instanceName, worldDirName) {
    const shaderpack = getWorldPath(instanceName, worldDirName)
    const stat = await f.stat(shaderpack)
    await removeDir(shaderpack).catch((reason) => { throw reason })
}

function getWorldPath(instanceName, worldName) {
    if (typeof shaderpackName === 'undefined') {
        return path.join(
            GetPath().gamePath,
            'instances',
            instanceName,
            'saves'
        )
    } else {
        return path.join(
            GetPath().gamePath,
            'instances',
            instanceName,
            'saves',
            worldName
        )
    }
}

async function getWorldList(instanceName, id) {
    const WorldsPath = path.join(GetPath().gamePath, `instances/${instanceName}/saves`)
    if (!fs.existsSync(WorldsPath)) {
        return []
    }
    const WorldsDirs = await f.readdir(WorldsPath)
    let worldList = [];
    for (let index = 0; index < WorldsDirs.length; index++) {
        if (id !== GetActiveID() && typeof id !== 'undefined') {
            return []
        }
        const dirname = WorldsDirs[index];
        const savePath = path.join(GetPath().gamePath, `instances/${instanceName}/saves/${dirname}`)
        let icon
        try {
            icon = `data:image/png;base64,${Buffer.from(await f.readFile(path.join(savePath, 'icon.png'))).toString('base64')}`
        } catch (error) {
            icon = './assets/images/Unknown_server.webp'
        }
        const worldInfo = await getWorldInfo(instanceName, dirname)
        worldList.push({
            worldInfo: worldInfo,
            path: savePath,
            icon: icon,
            time: (
                new Date(new Long(worldInfo.LastPlayed[1], worldInfo.LastPlayed[0]).toNumber())
            ).toLocaleString()
        });
    }
    return worldList;
}

export {
    getWorldInfo,
    getWorldName,
    addWorld,
    removeWorld,
    getWorldList,
}
