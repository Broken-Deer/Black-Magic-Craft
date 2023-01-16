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
import fs from 'fs'
import { removeDir } from "../utils/FileSystem.mjs"
import { checkVersionAlreadyInstaller } from "../installer/index.mjs"
import { getSettings } from "../settings/Settings.mjs"

async function newInstance(
    instanceName,
    minecraftVersion,
    forgeVersion,
    // liteloaderVersion,
    fabricLoaderVersion,
    // optifineVersion,
    quiltVersion,
    // author
) {
    const InstancePath = getInstancePath(instanceName)
    const InstanceJSON = JSON.stringify({
        name: instanceName,
        runtime: {
            minecraft: minecraftVersion,
            forge: forgeVersion,
            liteloader: '',
            fabricLoader: fabricLoaderVersion,
            // optifine: optifineVersion,
            optifine: "",
            quilt: quiltVersion,
        },
        author: '', // 暂时用不到
        version: '', // 暂时用不到
        "tags": [], // 暂时用不到
        "icon": "", // 暂时用不到
    })
    try {
        if (typeof await f.access(InstancePath) === 'undefined') throw '实例名称重复'
    } catch (e) {
        if (e.errno !== -4058) throw '实例名称重复'
    }
    await f.mkdir(InstancePath).catch(reason => { throw reason })
    await f.writeFile(path.join(InstancePath, 'instance.json'), InstanceJSON)
    await f.writeFile(path.join(InstancePath, 'options.txt'), 'lang:zh_cn')
    return 'complete'
}

async function deleteInstance(instanceName) {
    await removeDir(getInstancePath(instanceName))
}

async function renameInstance(oldInstanceName, newInstanceName) {
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
    if (!fs.existsSync(GetPath().gamePath)) {
        await f.mkdir(GetPath().gamePath)
    }
    if (!fs.existsSync(InstancePath)) {
        await f.mkdir(InstancePath)
    }
    const Dirs = await f.readdir(InstancePath)
    let Instances = []
    for (let index = 0; index < Dirs.length; index++) {
        const InstanceDir = path.join(InstancePath, Dirs[index]);
        try {
            let metadata = JSON.parse(
                (await f.readFile(path.join(InstanceDir, 'instance.json'))).toString()
            )
            let installed
            if (!(await checkVersionAlreadyInstaller(metadata.version)) || metadata.version === "") {
                installed = false
            } else {
                installed = true
            }
            let banner = ''
            const MinecraftVersion = metadata.runtime.minecraft
            const SupportedBanners = getSettings().banners
            for (let index = 0; index < SupportedBanners.length; index++) {
                if (MinecraftVersion === SupportedBanners[index] ||
                    MinecraftVersion.replace(/(?=(\.)(?!.*\1)).*?$/g, '') === SupportedBanners[index]) {
                    banner = `./assets/images/banners/${SupportedBanners[index]}.webp`
                    break
                }
            }
            if (banner === '') {
                banner = `./assets/images/banners/default.webp`
            }
            Instances.push({
                name: Dirs[index],
                metadata: metadata,
                installed: installed,
                banner: banner
            })
        } catch (error) {
            continue
        }
    }
    return Instances
}

async function hasInstance(instanceName) {
    let has = false
    let instances = await getInstances()
    for (let index = 0; index < instances.length; index++) {
        const element = instances[index];
        if (element.name === instanceName) {
            has = true
            break
        }
    }
    return has
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
    hasInstance,
}