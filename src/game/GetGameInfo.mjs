import f from 'fs'
import { GetPath } from '../installer/InstallerHelper.mjs'
import path from 'path'

export function GetInstancesList() {
    const InstancesPath = path.join(GetPath().gamePath, "instances");
    if (!f.existsSync(InstancesPath)) f.mkdirSync(InstancesPath);
    const InstancesDirContent = f.readdirSync(InstancesPath);
    let InstancesList = []
    for (let index = 0; index < InstancesDirContent.length; index++) {
        const element = InstancesDirContent[index];
        if (!f.existsSync(path.join(InstancesPath, element, "instance.json"))) continue;
        try {
            const InstanceInfo = JSON.parse(f.readFileSync(path.join(InstancesPath, element, "instance.json")));
            if (InstanceInfo.name === "") {
                InstancesList.push(element)
            } else {
                InstancesList.push(InstanceInfo.name)
            }
        } catch (e) {
            continue;
        }
    }

    return InstancesList
}

