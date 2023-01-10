import { IpcMain } from "electron";
import f from 'fs/promises'
import path from "path";
import { getInstancePath } from "../instance/InstanceManager.mjs";
import { getSettings } from "../settings/Settings.mjs";

async function launchGame(instanceName) {
    const instanceInfo = JSON.parse(await f.readFile(path.join(getInstancePath(instanceName), 'instance.json')))
    const DefaultSettings = getSettings()
}