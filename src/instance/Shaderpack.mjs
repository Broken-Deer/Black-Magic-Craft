import f from 'fs/promises'
import path from 'path'
import system from '@xmcl/system'
import { GetPath } from '../installer/InstallerHelper.mjs'
import { removeDir } from '../utils/FileSystem.mjs'

async function getShaderpacks(instanceName) {
    const files = await f.readFile(getShaderpackPath(instanceName))
    let shaderpacks = []
    for (let index = 0; index < files.length; index++) {
        const stat = await f.stat(getShaderpackPath(instanceName, files[index]))
        if (stat.isDirectory() || (stat.isFile() && path.extname(files[index]) === 'zip')) {
            shaderpacks.push(files[index])
        }
    }
    return shaderpacks
}

async function addShaderpack(instanceName, from) {
    await f.copyFile(from, path.join(getShaderpackPath(instanceName), path.basename(from)))
        .catch((reason) => { throw reason })
}

async function removeShaderpack(instanceName, shaderpackName) {
    const shaderpack = getShaderpackPath(instanceName, shaderpackName)
    const stat = await f.stat(shaderpack)
    if (stat.isDirectory()) {
        await removeDir(shaderpack).catch((reason) => { throw reason })
    } else {
        await f.unlink(path.join(getModFilePath(instanceName), path.basename(from)))
            .catch((reason) => { throw reason })
    }
}

function getShaderpackPath(instanceName, shaderpackName) {
    if (typeof shaderpackName === 'undefined') {
        return path.join(
            GetPath().gamePath,
            'instances',
            instanceName,
            'shaderpacks'
        )
    } else {
        return path.join(
            GetPath().gamePath,
            'instances',
            instanceName,
            'shaderpacks',
            shaderpackName
        )
    }
}

export {
    getShaderpacks,
    addShaderpack,
    removeShaderpack,
}