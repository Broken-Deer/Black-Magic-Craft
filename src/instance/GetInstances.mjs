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
import { GetPath } from '../installer/InstallerHelper.mjs';

async function getInstancesList() {
    const InstancesPath = path.join(GetPath().gamePath, "instances");
    if (!await f.exists(InstancesPath)) f.mkdirSync(InstancesPath);
    const InstancesDirContent = f.readdirSync(InstancesPath);
    let Instances = []
    for (let index = 0; index < InstancesDirContent.length; index++) {
        const instance = InstancesDirContent[index];
        if (!f.existsSync(path.join(InstancesPath, instance, "instance.json"))) continue;
        try {
            const InstanceInfo = JSON.parse(f.readFileSync(path.join(InstancesPath, instance, "instance.json")));
            if (InstanceInfo.name === "") {
                Instances.push(instance)
            } else {
                Instances.push(InstanceInfo.name)
            }
        } catch (e) {
            continue;
        }
    }
    return Instances
}
export {
   getInstancesList
}

