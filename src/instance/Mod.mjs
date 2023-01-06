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

import { readFabricMod, readForgeModJson, readLiteloaderMod, readQuiltMod } from "@xmcl/mod-parser";
import path from "path";
import { GetPath } from "../installer/InstallerHelper.mjs";
import f from 'fs/promises'
import fs from 'fs'
import system from '@xmcl/system'
import { GetActiveID } from "./index.mjs";

async function getMods(instanceName, id) {
    const ModsDir = path.join(
        GetPath().gamePath,
        'instances',
        instanceName,
        'mods',
    )
    if (!fs.existsSync(ModsDir)) {
        return []
    }
    let files = await f.readdir(ModsDir)
    let mods = []
    for (let index = 0; index < files.length; index++) {
        if (id !== GetActiveID() && typeof id !== 'undefined') {
            return []
        }
        const ModFile = files[index];
        const gotmodmeta = await getModMeta(instanceName, ModFile)
        const ExtName = path.extname(ModFile)
        if (ExtName !== '.jar' && ExtName !== '.disabled' && ExtName !== '.litemod') {
            continue
        }
        let ModMeta
        let fs
        let type
        try {
            type = gotmodmeta.type
            fs = gotmodmeta.fs
            if (type == 'forge or other') {
                ModMeta = gotmodmeta.modmeta[0]
            } else {
                ModMeta = gotmodmeta.modmeta
            }
        } catch (error) {
            continue
        }
        let icon
        try {
            if (type == 'forge or other') {
                icon = `data:image/png;base64,${Buffer.from(await fs.readFile(ModMeta.logoFile)).toString('base64')}`
            } else {
                icon = `data:image/png;base64,${Buffer.from(await fs.readFile(ModMeta.icon)).toString('base64')}`
            }
        } catch (error) {
            icon = './assets/images/Unknown_server.webp'
        }
        mods.push({
            filename: ModFile,
            icon: icon,
            modmeta: ModMeta,
            type: type,
        })
    }
    return mods
}

async function getModMeta(instanceName, modfileName) {
    const fs = await getModFileSystem(getModFilePath(instanceName, modfileName))
    switch (await getModType(fs)) {
        case 'fabric':
            try {
                return { modmeta: await readFabricMod(fs), fs: fs, type: 'fabric' }
            } catch (error) { }

        case 'quilt':
            try {
                return { modmeta: await readQuiltMod(fs), fs: fs, type: 'quilt' }
            } catch (error) { }

        case 'liteloader':
            try {
                return { modmeta: await readLiteloaderMod(fs), fs: fs, type: 'liteloader' }
            } catch (error) { }

        case 'forge of other':
            try {
                return { modmeta: await readForgeModJson(fs), fs: fs, type: 'forge or other' }
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

async function addMod(from, instanceName) {
    await f.copyFile(from, path.join(getModFilePath(instanceName), path.basename(from)))
        .catch((reason) => { throw reason })
}

async function removeMod(instanceName, modFileName) {
    await f.unlink(path.join(getModFilePath(instanceName), path.basename(modFileName)))
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

async function getModFileSystem(modfile) {
    return await system.resolveFileSystem(modfile)
}

async function changeActiveID(id) {
    activeID = id
}

export {
    getMods,
    getModMeta,
    getModType,
    addMod,
    removeMod,
    getModFileSystem,
    getModFilePath,
    changeActiveID
}