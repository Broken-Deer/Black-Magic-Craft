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

import path from "path"
import { GetPath } from "../installer/InstallerHelper.mjs"
import f from 'fs/promises'
import { removeDir } from "../utils/FileSystem.mjs"

async function newInstance(
    instanceName,
    minecraftVersion,
    forgeVersion,
    liteloaderVersion,
    fabricLoaderVersion,
    optifineVersion,
    quiltVersion,
    author
) {
    const InstancePath = getInstancePath(instanceName)
    const InstanceJSON = JSON.stringify({
        name: instanceName,
        runtime: {
            minecraft: minecraftVersion,
            forge: forgeVersion,
            liteloader: liteloaderVersion,
            fabricLoader: fabricLoaderVersion,
            optifine: optifineVersion,
            quilt: quiltVersion,
        },
        author: author
    })
    try {
        if (typeof await f.access(InstancePath) === 'undefined') throw '实例名称重复'

    } catch (e) {
        if (e.errno !== -4058) throw '实例名称重复'
    }
    await f.mkdir(InstancePath).catch(reason => { throw reason })
    await f.writeFile(path.join(InstancePath, 'instance.json'), InstanceJSON)
}

async function deleteInstance(instanceName) {
    if (typeof instanceName !== 'string') throw '实例名称不能为空'
    await removeDir(getInstancePath(instanceName))
}

async function renameInstance(oldInstanceName, newInstanceName) {
    if (typeof oldInstanceName !== 'string' || newInstanceName) throw '实例名称不能为空'
    const OldInstancePath = getInstancePath(oldInstanceName)
    const NewInstancePath = getInstancePath(newInstanceName)
    var OldInstanceJSON = JSON.parse(await f.readFile(path.join(OldInstancePath, 'instance.json')))
    OldInstanceJSON.name = newInstanceName
    const NewInstanceJSON = JSON.stringify(OldInstanceJSON)
    await f.rename(OldInstancePath, NewInstancePath)
    await f.writeFile(path.join(NewInstancePath, 'instance.json'), NewInstanceJSON)
}

async function getInstances() {
    const InstancePath = getInstancePath()
    const Dirs = await f.readdir(InstancePath)
    let Instances = []
    for (let index = 0; index < Dirs.length; index++) {
        const InstanceDir = Dirs[index];
        try {
            Instances.push({ name: InstanceDir, metadata: f.readFile(path.join(InstanceDir, 'instance.json')) })
        } catch (error) {
            continue
        }
    }
    return Instances
}

function getInstancePath(instanceName) {
    if (typeof instanceName === 'string') {
        return path.join(GetPath().gamePath, 'instances', instanceName)
    } else {
        return path.join(GetPath().gamePath, 'instances')
    }
}

export {
    newInstance,
    deleteInstance,
    renameInstance,
    getInstances,
    getInstancePath,
}