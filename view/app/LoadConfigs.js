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


/**
 * 加载一项设置
 *
 * @param class_ 这条设置所在的类
 * @param key 这条设置的键名
 * @return 这项设置的内容
 */
export async function load(key) {
    return await ipc.invoke('get-config', key)
}

/**
 * 修改一项设置
 */
export function update(key, value) {
    ipc.invoke('update-config', ({key: key, value, value}))
}

/**
 * 重置所有设置
 */
export function reset() { }
