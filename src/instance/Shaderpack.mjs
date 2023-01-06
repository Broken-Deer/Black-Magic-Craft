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

import f from 'fs/promises'
import fs from 'fs'
import path from 'path'
import { GetPath } from '../installer/InstallerHelper.mjs'
import { removeDir } from '../utils/FileSystem.mjs'
import { GetActiveID } from './index.mjs'

async function getShaderpacks(instanceName, id) {
    const ShaderpacksPath = getShaderpackPath(instanceName)
    if (!fs.existsSync(ShaderpacksPath)) {
        return []
    }
    const files = await f.readdir(ShaderpacksPath)
    let shaderpacks = []
    for (let index = 0; index < files.length; index++) {
        if (id !== GetActiveID() && typeof id !== 'undefined') {
            return []
        }
        const stat = await f.stat(getShaderpackPath(instanceName, files[index]))
        if (stat.isDirectory() || (stat.isFile() && path.extname(files[index]) === '.zip')) {
            shaderpacks.push({ name: files[index], path: path.join(ShaderpacksPath, files[index]) })
        }
    }
    return shaderpacks
}

async function addShaderpack(instanceName, from) {
    await f.copyFile(from, path.join(getShaderpackPath(instanceName), path.basename(from)))
        .catch((reason) => { throw reason })
}

async function removeShaderpack(instanceName, shaderpackName) {
    const shaderpack = getShaderpackPath(instanceName, shaderpackName)
    const stat = await f.stat(shaderpack)
    if (stat.isDirectory()) {
        await removeDir(shaderpack).catch((reason) => { throw reason })
    } else {
        await f.unlink(path.join(getModFilePath(instanceName), path.basename(from)))
            .catch((reason) => { throw reason })
    }
}

function getShaderpackPath(instanceName, shaderpackName) {
    if (typeof shaderpackName === 'undefined') {
        return path.join(
            GetPath().gamePath,
            'instances',
            instanceName,
            'shaderpacks'
        )
    } else {
        return path.join(
            GetPath().gamePath,
            'instances',
            instanceName,
            'shaderpacks',
            shaderpackName
        )
    }
}

export {
    getShaderpacks,
    addShaderpack,
    removeShaderpack,
}