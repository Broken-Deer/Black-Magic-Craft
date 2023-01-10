import fs from 'fs'
import { exec } from './Promisify.mjs'

async function getJavalist() {
    const stdout = (await exec('chcp 65001 && PowerShell -Command "Get-ItemProperty HKLM:\\Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\* | Select-Object InstallLocation"')).stdout
    let Paths = stdout.toString().split("\r\n");
    let Javalist = [];
    for (let index = 0; index < Paths.length; index++) {
        if (index < 4) {
            continue;
        }
        const Path = Paths[index].trim();
        if (Path == 0) {
            continue;
        }
        if (!fs.existsSync(`${Path}release`)) {
            continue;
        }
        let javaInfo = fs.readFileSync(`${Path}release`, "utf-8").split("\n");
        for (let i = 0; i < javaInfo.length; i++) {
            let javaInfoItem = javaInfo[i].split("=");
            if (javaInfoItem[0] === "JAVA_VERSION") {
                Javalist.push({
                    path: `${Path}bin\\java.exe`,
                    version: javaInfoItem[1].replace(/\"/g, "").replace(/\s/g, ""),
                });
                break
            }
        }
    }
    // 更新配置文件
    /* store.set("javalist", Javalist); */
    return Javalist
}

async function installJava() {

}

export {
    getJavalist
}