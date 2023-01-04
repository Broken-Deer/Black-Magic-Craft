import f from 'fs/promises'

/**
 * 递归删除文件夹
 */
async function removeDir(dir) {
    const files = await f.readdir(dir).catch((reason) => { throw reason });
    for (var i = 0; i < files.length; i++) {
        let newPath = join(dir, files[i]);
        if ((await f.stat(newPath)).isDirectory()) {
            //如果是文件夹就递归下去
            await removeDir(newPath).catch((reason) => { throw reason });
        } else {
            await f.unlink(newPath).catch((reason) => { throw reason });
        }
    }
    await f.rmdir(dir).catch((reason) => { throw reason });
}

export { removeDir }