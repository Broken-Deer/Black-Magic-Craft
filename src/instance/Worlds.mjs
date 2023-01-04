import path from "path";
import nbt from "prismarine-nbt";
import { GetPath } from "../installer/InstallerHelper.mjs";
import f from 'fs/promises'

async function getWorldInfo(InstanceName, DirName) {
    let WorldInfoNBT;
    await f.readFile(path.join(GetPath().gamePath, `instances/${InstanceName}/saves/${DirName}/level.dat`))
        .then(async value => { WorldInfoNBT = (await nbt.parse(value)).parsed.value.Data.value; });
    let Info = {};
    Object.keys(WorldInfoNBT).forEach(key => { Info[key] = WorldInfoNBT[key].value; });
    return Info;
}

async function getWorldName(InstanceName, DirName) {
    let worldName;
    await f.readFile(path.join(GetPath().gamePath, `instances/${InstanceName}/saves/${DirName}/level.dat`))
        .then(async value => { worldName = (await nbt.parse(value)).parsed.value.Data.value.LevelName.value; });
    return
}

async function getWorldList(InstanceName) {
    const WorldsDirs =await f.readdir(path.join(GetPath().gamePath, `instances/${InstanceName}/saves`))
    let worldList = [];
    for (let index = 0; index < WorldsDirs.length; index++) {
        const dirname = WorldsDirs[index];
        worldList.push({
            worldInfo: await getWorldInfo(InstanceName, dirname),
            path: path.join(GetPath().gamePath, `instances/${InstanceName}/saves/${dirname}`),
        });
    }
    return worldList;
}

export { getWorldInfo, getWorldName, getWorldList }