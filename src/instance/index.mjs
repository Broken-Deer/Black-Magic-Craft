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
import { addMod, getFileSystem, getModFilePath, getModMeta, getMods, getModType, removeMod } from "./Mod.mjs";
import { addResourcepacks, getResourcepacks, removeResourcepacks } from "./Resourcepack.mjs";
import { addShaderpack, getShaderpacks, removeShaderpack } from "./Shaderpack.mjs";
import { addWorld, getWorldInfo, getWorldList, getWorldName, removeWorld } from "./Worlds.mjs";

function setInstanceManagerDetector() {
    ipcMain
        .on('new-instance', async (event, {
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
        .on('rename-instance', async (event, { oldInstanceName, newInstanceName }) => {
            let result
            let err
            try {
                result = await renameInstance(oldInstanceName, newInstanceName)
            } catch (error) {
                err = error
            }
            event.reply('rename-instance', { result: result, err: err })
        })
        .on('delete-instance', async (event, { instanceName }) => {
            let result
            let err
            try {
                result = await deleteInstance(instanceName)
            } catch (error) {
                err = error
            }
            event.reply('delete-instance', { result: result, err: err })
        })
        .on('get-instances', async (event) => {
            let result
            let err
            try {
                result = await getInstances()
            } catch (error) {
                err = error
            }
            event.reply('get-instances', { result: result, err: err })
        })
        .on('get-mod-meta', async (event, { instanceName, modfileName }) => {
            let result
            let err
            try {
                result = await getModMeta(instanceName, modfileName)
            } catch (error) {
                err = error
            }
            event.reply('get-mod-meta', { result: result, err: err })
        })
        .on('get-mod-type', async (event, { instanceName, modfileName }) => {
            let result
            let err
            try {
                const fs = getFileSystem(getModFilePath(instanceName, modfileName))
                result = await getModType(fs)
            } catch (error) {
                err = error
            }
            event.reply('get-mod-type', { result: result, err: err })
        })
        .on('add-mod', async (event, { from, instanceName }) => {
            let result
            let err
            try {
                result = await addMod(from, instanceName)
            } catch (error) {
                err = error
            }
            event.reply('add-mod', { result: result, err: err })
        })
        .on('remove-mod', async (event, { instanceName, modFileName }) => {
            let result
            let err
            try {
                result = await removeMod(instanceName, modFileName)
            } catch (error) {
                err = error
            }
            event.reply('remove-mod', { result: result, err: err })
        })
        .on('get-mods', async (event, instanceName) => {
            let result
            let err
            try {
                result = await getMods(instanceName)
            } catch (error) {
                err = error
            }
            event.reply('get-mods', { result: result, err: err })
        })
        .on('add-resourcepack', async (event, { from, instanceName }) => {
            let result
            let err
            try {
                result = await addResourcepacks(from, instanceName)
            } catch (error) {
                err = error
            }
            event.reply('add-resourcepack', { result: result, err: err })
        })
        .on('remove-resourcepack', async (event, { instanceName, resourcepackName }) => {
            let result
            let err
            try {
                result = await removeResourcepacks(instanceName, resourcepackName)
            } catch (error) {
                err = error
            }
            event.reply('remove-resourcepack', { result: result, err: err })
        })
        .on('get-resourcepacks', async (event, instanceName) => {
            let result
            let err
            try {
                result = await getResourcepacks(instanceName)
            } catch (error) {
                err = error
            }
            event.reply('get-resourcepack', { result: result, err: err })
        })
        .on('add-shaderpack', async (event, { from, instanceName }) => {
            let result
            let err
            try {
                result = await addShaderpack(instanceName, from)
            } catch (error) {
                err = error
            }
            event.reply('add-shaderpack', { result: result, err: err })
        })
        .on('remove-shaderpack', async (event, { instanceName, shaderpackName }) => {
            let result
            let err
            try {
                result = await removeShaderpack(instanceName, shaderpackName)
            } catch (error) {
                err = error
            }
            event.reply('remove-shaderpack', { result: result, err: err })
        })
        .on('get-shaderpacks', async (event, instanceName) => {
            let result
            let err
            try {
                result = await getShaderpacks(instanceName)
            } catch (error) {
                err = error
            }
            event.reply('get-shaderpacks', { result: result, err: err })
        })
        .on('get-world-info', async (event, { instanceName, DirName }) => {
            let result
            let err
            try {
                result = await getWorldInfo(instanceName, DirName)
            } catch (error) {
                err = error
            }
            event.reply('get-shaderpacks', { result: result, err: err })
        })
        .on('get-world-name', async (event, { instanceName, DirName }) => {
            let result
            let err
            try {
                result = await getWorldName(instanceName, DirName)
            } catch (error) {
                err = error
            }
            event.reply('get-shaderpacks', { result: result, err: err })
        })
        .on('add-world', async (event, { instanceName, from }) => {
            let result
            let err
            try {
                result = await addWorld(instanceName, from)
            } catch (error) {
                err = error
            }
            event.reply('get-shaderpacks', { result: result, err: err })
        })
        .on('remove-world', async (event, { instanceName, worldDirName }) => {
            let result
            let err
            try {
                result = await removeWorld(instanceName, worldDirName)
            } catch (error) {
                err = error
            }
            event.reply('get-shaderpacks', { result: result, err: err })
        })
        .on('get-world-list', async (event, instanceName) => {
            let result
            let err
            try {
                result = await getWorldList(instanceName)
            } catch (error) {
                err = error
            }
            event.reply('get-shaderpacks', { result: result, err: err })
        })
}

export {
    setInstanceManagerDetector
}