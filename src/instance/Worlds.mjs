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

async function getWorldInfo(InstanceName, DirName) {
    let WorldInfoNBT;
    await f.readFile(path.join(GetPath().gamePath, `instances/${InstanceName}/saves/${DirName}/level.dat`))
        .then(async value => { WorldInfoNBT = (await nbt.parse(value)).parsed.value.Data.value; });
    let Info = {};
    Object.keys(WorldInfoNBT).forEach(key => { Info[key] = WorldInfoNBT[key].value; });
    return Info;
}

async function getWorldName(InstanceName, DirName) {
    let worldName;
    await f.readFile(path.join(GetPath().gamePath, `instances/${InstanceName}/saves/${DirName}/level.dat`))
        .then(async value => { worldName = (await nbt.parse(value)).parsed.value.Data.value.LevelName.value; });
    return
}

async function getWorldList(InstanceName) {
    const WorldsDirs =await f.readdir(path.join(GetPath().gamePath, `instances/${InstanceName}/saves`))
    let worldList = [];
    for (let index = 0; index < WorldsDirs.length; index++) {
        const dirname = WorldsDirs[index];
        worldList.push({
            worldInfo: await getWorldInfo(InstanceName, dirname),
            path: path.join(GetPath().gamePath, `instances/${InstanceName}/saves/${dirname}`),
        });
    }
    return worldList;
}

export { getWorldInfo, getWorldName, getWorldList }