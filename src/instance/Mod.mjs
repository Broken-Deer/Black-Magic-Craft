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

import { readFabricMod, readForgeModToml, readLiteloaderMod, readQuiltMod } from "@xmcl/mod-parser";
import path, { join } from "path";
import { GetPath } from "../installer/InstallerHelper.mjs";
import f from 'fs/promises'
import system from '@xmcl/system'

async function getMods(instanceName) {
    const ModsDir = path.join(
        GetPath().gamePath,
        'instances',
        instanceName,
        'mods',
    )
    let files = await f.readdir(ModsDir)
    let mods = []
    for (let index = 0; index < files.length; index++) {
        const ModFile = files[index];
        mods.push({
            filename: ModFile,
            ...await getModMeta(instanceName, ModFile)
        })
    }
    return mods
}

async function getModMeta(instanceName, modfile) {
    const fs = await getFileSystem(getModFilePath(instanceName, modfile))
    switch (await getModType(fs)) {
        case 'fabric':
            try {
                return await readFabricMod(fs)
            } catch (error) { }

        case 'quilt':
            try {
                return await readQuiltMod(fs)
            } catch (error) { }

        case 'liteloader':
            try {
                return await readLiteloaderMod(fs)
            } catch (error) { }

        case 'forge of other':
            try {
                return await readForgeModToml(fs)
            } catch (error) { }
        default:
            break;
    }
}

async function getModType(fs) {
    if (await fs.existsFile('fabric.mod.json')) {
        return 'fabric'
    }
    if (await fs.existsFile('quilt.mod.json')) {
        return 'quilt'
    }
    if (await fs.existsFile('litemod.json')) {
        return 'liteloader'
    }
    return 'forge of other'
}

async function getFileSystem(modfile) {
    return await system.resolveFileSystem(modfile)
}

async function addMod(from, instanceName) {
    await f.copyFile(from, path.join(getModFilePath(instanceName), path.basename(from)))
    .catch((reason) => { throw reason })
}

async function removeMod(instanceName, modFile) {
    await f.unlink(ppath.join(getModFilePath(instanceName), path.basename(from)))
    .catch((reason) => { throw reason })
}

function getModFilePath(instanceName, modName) {
    if (typeof modName === 'undefined') {
        return path.join(GetPath().gamePath, `instances/${instanceName}/mods`)
    } else {
        return path.join(
            GetPath().gamePath,
            'instances',
            instanceName,
            'mods',
            modName,
        )
    }
}

export {
    getMods,
    getModMeta,
    getModType,
    addMod,
    removeMod
}