import path from "path";
import nbt from "prismarine-nbt";
import { GetPath } from "../installer/InstallerHelper.mjs";
import f from "fs";
/**
 * 获取存档信息。用时较长
 * @param {String} InstanceName 实例名称
 * @param {String} DirName 存档所在目录的名称
 * @returns 存档信息
 */
export async function GetWorldInfo(InstanceName, DirName) {
    const WorldInfoNBT = (
        await nbt.parse(
            f.readFileSync(path.join(GetPath().gamePath, `instances/${InstanceName}/saves/${DirName}/level.dat`))
        )
    ).parsed.value.Data.value;
    let Info = {};
    Object.keys(WorldInfoNBT).forEach(key => {
        Info[key] = WorldInfoNBT[key].value;
    });
    return Info;
}
/**
 * 仅获取存档名称
 * @param {*} InstanceName
 * @param {*} DirName
 * @returns
 */
export async function GetWorldName(InstanceName, DirName) {
    return (
        await nbt.parse(
            f.readFileSync(path.join(GetPath().gamePath, `instances/${InstanceName}/saves/${DirName}/level.dat`))
        )
    ).parsed.value.Data.value.LevelName.value;
}
