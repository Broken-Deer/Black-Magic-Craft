import ElectronStore from "electron-store";
import f from 'fs/promises'
import path from "path";
import { GetPath } from "../installer/InstallerHelper.mjs";
import { getSettings } from "../settings/Settings.mjs";
import { launch, Version } from "@xmcl/core";
import { installDependencies } from "@xmcl/installer";
import { MinecraftFolder } from "@xmcl/core";
import { getJavalist } from "../utils/JavaManager.mjs";
import { getAccountInfo } from "./AccountServices.mjs";

const Store = new ElectronStore()
async function launchGame(instanceName, uuid) {
    const MinecraftLocation = GetPath().gamePath
    const InstanceInfo = await f.readFile(
        path.join(
            MinecraftLocation, 'instances', instanceName, 'instance.json'
        )
    )
    const VersionJSON = await f.readFile(
        path.join(
            MinecraftLocation, 'versions', InstanceInfo.version
        )
    )
    let javaPath
    /**
     * 获取设置
     */
    const Settings = await getGameSettings()
    if (Settings.autojv == true) {
        var javaVersion = String(VersionJSON.javaVersion.majorVersion)
        if (majorVersion === 8) {
            javaVersion = '1.8'
        }
        const Javalist = await getJavalist()
        for (let index = 0; index < Javalist.length; index++) {
            if (Javalist[index].version.substring(0, 3) === javaVersion + '.' ||
                Javalist[index].version.substring(0, 3) === javaVersion) {
                javaPath = Javalist[index].path
                break
            }
        }
        if (!javaPath) {
            // 抛出未找到java的错误，要求安装正确的java或自己指定
        }
    } else {
        javaPath = Settings.jvpath
    }
    await installDependencies(await Version.parse(MinecraftLocation, InstanceInfo.version))
    const minecraftFolder = new MinecraftFolder(path.join(MinecraftLocation, 'instances', instanceName))
    const PlayerInfo = getAccountInfo(uuid)
    if (PlayerInfo === null) {
        throw '账户不存在'
    }
    const LaunchOption = {
        gameProfile: {
            name: PlayerInfo.name,
            id: uuid
        },
        accessToken: PlayerInfo.accessToken,
        properties: {},
        gamePath: minecraftFolder.root,
        resourcePath: MinecraftLocation,
        javaPath: javaPath,
        version: InstanceInfo.version,
        extraExecOption: {
            detached: true,
            cwd: minecraftFolder.root,
        }
    }
    const proc = launch(LaunchOption)
}

async function getGameSettings(instanceInfo) {
    const DefaultSettings = getSettings().defaultLaunchSettings.globle.game
    if (JSON.stringify(instanceInfo.settings) != '{}') {
        return {
            ...DefaultSettings,
            ...Store.get('globle.game', DefaultSettings),
            ...instanceInfo.settings
        }
    } else {
        return {
            ...DefaultSettings,
            ...Store.get('globle.game', DefaultSettings)
        }
    }
}

export {
    launchGame,
    getGameSettings
}
