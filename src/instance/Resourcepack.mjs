import path from "path";
import { GetPath, removeDir } from "../installer/InstallerHelper.mjs";
import { readPackMetaAndIcon } from "@xmcl/resourcepack"
import f from 'fs/promises'
import { copydir } from "../utils/Promisify.mjs";

async function getResourcepacks(instanceName) {
    const ResourcepacksPath = path.join(
        GetPath().gamePath,
        'instances',
        instanceName,
        'resourcepacks'
    )
    let resourcepacks = []
    let resourcepackDirs = await f.readdir(ResourcepacksPath)
    for (let index = 0; index < resourcepackDirs.length; index++) {
        const Resourcepack = path.join(ResourcepacksPath, resourcepackDirs[index])
        try {
            resourcepacks.push({
                name: path.basename(Resourcepack),
                path: path.join(Resourcepack),
                ...(await readPackMetaAndIcon(Resourcepack))
            })
        } catch (error) { continue }
    }
    return resourcepacks;
}

async function addResourcepacks(from, instanceName) {
    const ResourcepacksPath = path.join(
        GetPath().gamePath,
        'instances',
        instanceName,
        'resourcepacks'
    )
    if ((await f.stat(from)).isDirectory()) {
        await copydir(from, path.join(ResourcepacksPath, path.basename(from)))
            .catch((reason) => { throw reason })
    } else {
        await f.copyFile(from, path.join(ResourcepacksPath, path.basename(from)))
            .catch((reason) => { throw reason })
    }
}

async function removeResourcepacks(instanceName, resourcepackName) {
    const Resourcepack = path.join(
        GetPath().gamePath,
        'instances',
        instanceName,
        'resourcepacks',
        resourcepackName
    )
    try {
        if ((await f.stat(Resourcepack)).isDirectory()) {
            await removeDir(Resourcepack)
        } else {
            await f.unlink(Resourcepack)
        }
        return true
    } catch (error) { }
}

export { getResourcepacks, addResourcepacks, removeResourcepacks }