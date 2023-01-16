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
import fs from 'fs'
import f from 'fs/promises'
import path from 'path'
import { ipcMain } from 'electron'
import { getInstancePath } from '../instance/InstanceManager.mjs'
import { removeDir } from '../utils/FileSystem.mjs'
import { getEventObj } from '../utils/Other.mjs'
import { InstallGameWithFabric } from './FabricInstaller.mjs'
import { InstallGameWithForge } from './ForgeInstaller.mjs'
import { GetPath } from './InstallerHelper.mjs'
import { InstallGameWithLiteloader } from './LiteloaderInstaller.mjs'
import { InstallGameWithQuilt } from './QuiltInstaller.mjs'
import { getForgeVersionList, getFabricArtifacts, getQuiltVersionsList } from '@xmcl/installer'
import { InstallVanillaGame } from './DefaultGameInstaller.mjs'

/**
 * 放置安装游戏命令侦测器
 */
function setInstallerCommandDetector() {
    ipcMain.handle('install-game-from-instance', (event, instanceName) => {
        installGameFromInstance(instanceName)
    })
    ipcMain.handle('get-forge-list', async (event, mcversion) => {
        console.log()
        try {
            return await getForgeVersionList({ mcversion: mcversion })
        } catch (error) {
            throw error
        }
    })
    ipcMain.handle('get-fabric-artifacts', async (event) => {
        return (await getFabricArtifacts())
    })
    ipcMain.handle('get-quilt-list', async (event) => {
        return (await getQuiltVersionsList())
    })
}


/**
 * 指定instanceName安装游戏
 */
async function installGameFromInstance(instanceName) {
    const InstancePath = getInstancePath(instanceName)
    const InstanceInfo = JSON.parse(await f.readFile(path.join(InstancePath, 'instance.json')))
    const MinecraftVersion = InstanceInfo.runtime.minecraft
    const FabricLoaderVersion = InstanceInfo.runtime.fabricLoader
    const QuiltVersion = InstanceInfo.runtime.quilt
    const ForgeVersion = InstanceInfo.runtime.forge
    const OptifineVersion = InstanceInfo.runtime.optifine
    /**
     * 拼接版本名
     */
    const VersionName = `${MinecraftVersion}${ForgeVersion ? `-forge${ForgeVersion}` : ''}${FabricLoaderVersion ? `-fabricLoader${FabricLoaderVersion}` : ''}${QuiltVersion ? `-quilt${QuiltVersion}` : ''}`
    /**
     * 文件夹已存在就删除
     */
    if (await checkVersionAlreadyInstaller(VersionName)) {
        await removeDir(path.join(GetPath().gamePath, 'versions', VersionName))
    }

    if (FabricLoaderVersion != 0) {
        console.log('安装器模式为1')
        await InstallGameWithFabric(VersionName, MinecraftVersion, FabricLoaderVersion, instanceName)

    } else if (QuiltVersion != 0) {
        console.log('安装器模式为2')
        await InstallGameWithQuilt(VersionName, MinecraftVersion, QuiltVersion, instanceName)

    } else if (ForgeVersion != 0) {
        console.log('安装器模式为3')
        await InstallGameWithForge(VersionName, MinecraftVersion, ForgeVersion, instanceName)

    } else if (MinecraftVersion != 0) {
        console.log('安装器模式为4')
        await InstallVanillaGame(VersionName, MinecraftVersion, false, true, instanceName)
    }
    let newInstanceInfo = InstanceInfo
    newInstanceInfo.version = VersionName
    await f.writeFile(path.join(InstancePath, 'instance.json'), JSON.stringify(newInstanceInfo))
    getEventObj().reply('download-complete', instanceName)
}
async function checkVersionAlreadyInstaller(versionName) {
    const VersionsPath = path.join(GetPath().gamePath, 'versions', versionName)
    if (fs.existsSync(path.join(VersionsPath, `${versionName}.json`))) {
        return true
    } else {
        return false
    }
}

export {
    setInstallerCommandDetector,
    installGameFromInstance,
    checkVersionAlreadyInstaller
}