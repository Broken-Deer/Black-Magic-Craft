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

/* const Store = require("electron-store");
const store = new Store(); */
/**
 * 加载一项设置
 *
 * @param class_ 这条设置所在的类
 * @param key 这条设置的键名
 * @return 这项设置的内容
 */
export function load(key) {
    /* return store.get(key) */
}

/**
 * 加载一组设置
 *
 * @param class_ 这些设置所在的类
 * @return 这些设置的内容
 */
export function loadClass(class_) {
    /* return store.get(class_) */
}

/**
 * 修改一项设置
 */
export function update(key, value) {
    /* store.set(key, value)
    console.log(store.get()) */
}

/**
 * 重置所有设置
 */
export function reset() {}
