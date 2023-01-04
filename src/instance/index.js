import { ipcMain } from "electron";
import { getWorldInfo, getWorldList, getWorldName } from "./GetWorldsInfo.mjs";

ipcMain.
    on("get-world-list", async (event, instanceName) => {
        event.reply(await getWorldList(instanceName));
    })
    .on("get-world-info", async (event, { instanceName, dirName }) => {
        event.reply(await getWorldInfo(instanceName, dirName));
    })
    .on("get-world-name", async (event, { instanceName, dirName }) => {
        event.reply(await getWorldName(instanceName, dirName));
    })
    .on("get")