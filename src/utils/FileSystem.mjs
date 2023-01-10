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

import f from 'fs/promises'
import path from 'path'
/**
 * 递归删除文件夹
 */
async function removeDir(dir) {
    const files = await f.readdir(dir).catch((reason) => { throw reason });
    for (var i = 0; i < files.length; i++) {
        let newPath = path.join(dir, files[i]);
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