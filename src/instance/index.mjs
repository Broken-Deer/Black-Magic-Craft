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

import { ipcMain } from "electron";
import { newInstance, renameInstance, deleteInstance, getInstances } from "./InstanceManager.mjs";
import { addMod, getModFileSystem, getModFilePath, getModMeta, getMods, getModType, removeMod } from "./Mod.mjs";
import { addResourcepacks, getResourcepacks, removeResourcepacks } from "./Resourcepack.mjs";
import { addShaderpack, getShaderpacks, removeShaderpack } from "./Shaderpack.mjs";
import { addWorld, getWorldInfo, getWorldList, getWorldName, removeWorld } from "./Worlds.mjs";

var activeID = 0 // 对应WareHouse.js文件的activeID，用来表示用户正在查看的instance。获取列表时如果发现此id与调用函数时获取的id不同，则认定用户在加载完成之前离开了此页面并停止查询
function setInstanceManagerDetector() {
    ipcMain.on('new-instance', async (event, {
        instanceName,
        minecraftVersion,
        forgeVersion,
        liteloaderVersion,
        fabricLoaderVersion,
        optifineVersion,
        quiltVersion,
        author
    }) => {
        let result
        let err
        try {
            result = await newInstance(
                instanceName,
                minecraftVersion,
                forgeVersion,
                liteloaderVersion,
                fabricLoaderVersion,
                optifineVersion,
                quiltVersion,
                author)
        } catch (error) {
            err = error
        }
        event.reply('new-instance', { result: result, err: err })
    })
    ipcMain.on('rename-instance', async (event, { oldInstanceName, newInstanceName }) => {
        let result
        let err
        try {
            result = await renameInstance(oldInstanceName, newInstanceName)
        } catch (error) {
            err = error
        }
        event.reply('rename-instance', { result: result, err: err })
    })
    ipcMain.on('delete-instance', async (event, { instanceName }) => {
        let result
        let err
        try {
            result = await deleteInstance(instanceName)
        } catch (error) {
            err = error
        }
        event.reply('delete-instance', { result: result, err: err })
    })
    ipcMain.handle('get-instances', async () => {
        return await getInstances()
    })
    ipcMain.handle('get-mod-meta', async (event, { instanceName, modfileName }) => {
        try {
            return await getModMeta(instanceName, modfileName)
        } catch (error) { }
    })
    ipcMain.handle('get-mod-type', async (event, { instanceName, modfileName }) => {
        const fs = getModFileSystem(getModFilePath(instanceName, modfileName))
        return await getModType(fs)
    })
    ipcMain.on('add-mod', async (event, { from, instanceName }) => {
        let result
        let err
        try {
            result = await addMod(from, instanceName)
        } catch (error) {
            err = error
        }
        event.reply('add-mod', { result: result, err: err })
    })
    ipcMain.on('remove-mod', async (event, { instanceName, modFileName }) => {
        let result
        let err
        try {
            result = await removeMod(instanceName, modFileName)
        } catch (error) {
            err = error
        }
        event.reply('remove-mod', { result: result, err: err })
    })
    ipcMain.handle('get-mods', async (event, { instanceName, id }) => {
        return await getMods(instanceName, id)
    })
    ipcMain.on('add-resourcepack', async (event, { from, instanceName }) => {
        let result
        let err
        try {
            result = await addResourcepacks(from, instanceName)
        } catch (error) {
            err = error
        }
        event.reply('add-resourcepack', { result: result, err: err })
    })
    ipcMain.on('remove-resourcepack', async (event, { instanceName, resourcepackName }) => {
        let result
        let err
        try {
            result = await removeResourcepacks(instanceName, resourcepackName)
        } catch (error) {
            err = error
        }
        event.reply('remove-resourcepack', { result: result, err: err })
    })
    ipcMain.handle('get-resourcepacks', async (event, { instanceName, id }) => {
        return await getResourcepacks(instanceName, id)
    })
    ipcMain.on('add-shaderpack', async (event, { from, instanceName }) => {
        let result
        let err
        try {
            result = await addShaderpack(instanceName, from)
        } catch (error) {
            err = error
        }
        event.reply('add-shaderpack', { result: result, err: err })
    })
    ipcMain.on('remove-shaderpack', async (event, { instanceName, shaderpackName }) => {
        let result
        let err
        try {
            result = await removeShaderpack(instanceName, shaderpackName)
        } catch (error) {
            err = error
        }
        event.reply('remove-shaderpack', { result: result, err: err })
    })
    ipcMain.handle('get-shaderpacks', async (event, { instanceName, id }) => {
        return await getShaderpacks(instanceName, id)
    })
    ipcMain.handle('get-world-info', async (event, { instanceName, DirName }) => {
        return await getWorldInfo(instanceName, DirName)
    })
    ipcMain.handle('get-world-name', async (event, { instanceName, DirName }) => {
        return await getWorldName(instanceName, DirName)
    })
    ipcMain.on('add-world', async (event, { instanceName, from }) => {
        let result
        let err
        try {
            result = await addWorld(instanceName, from)
        } catch (error) {
            err = error
        }
        event.reply('get-shaderpacks', { result: result, err: err })
    })
    ipcMain.on('remove-world', async (event, { instanceName, worldDirName }) => {
        let result
        let err
        try {
            result = await removeWorld(instanceName, worldDirName)
        } catch (error) {
            err = error
        }
        event.reply('get-shaderpacks', { result: result, err: err })
    })
    ipcMain.handle('get-world-list', async (event, { instanceName, id }) => {
        return await getWorldList(instanceName)
    })
    ipcMain.handle('change-activeID', (event, id) => {
        activeID = id
    })
    
}

function GetActiveID() {
    return activeID
}

export {
    setInstanceManagerDetector,
    GetActiveID
}