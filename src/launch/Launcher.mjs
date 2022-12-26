
export async function launchGame(versionName, event, options) {
    var Path = path_handle()["gamePath"];
    if (!f.existsSync(`${Path}version/${versionName}`)) {
        return false;
    }
    const versionData = JSON.parse(f.readFileSync(`${Path}version/${versionName}/${versionName}.json`));
    options["classpath"] = `"${getClasspathOption(versionData)}"`;
    console.log(`"${getClasspathOption(versionData)}"`);
    var command = `${options["jrePath"]}`;
    var os_type;
    switch (os.type()) {
        case "Windows_NT":
            os_type = "windows";
            break;
        case "Linux":
            os_type = "linux";
            break;
        case "Darwin":
            os_type = "osx";
            break;
        default:
            return false;
    }
    let os_arch = os.arch();
    let os_version = os.release();
    let jvmArgs = versionData["arguments"]["jvm"];
    for (let index = 0; index < jvmArgs.length; index++) {
        if (typeof jvmArgs[index] == "string") {
            command = addOption(command, jvmArgs[index], options);
        } else {
            let rules = jvmArgs[index]["rules"];
            let allow = false;
            if (typeof jvmArgs[index]["rules"] == "undefined") {
                allow = true;
            } else {
                for (let rua = 0; rua < rules.length; rua++) {
                    if (typeof rules[rua]["os"] != "undefined") {
                        if (
                            rules[rua]["action"] === "allow" &&
                            (typeof rules[rua]["os"]["name"] == "undefined" || os_type === rules[rua]["os"]["name"]) &&
                            (typeof rules[rua]["os"]["arch"] == "undefined" || os_arch === rules[rua]["os"]["arch"]) &&
                            (typeof rules[rua]["os"]["version"] == "undefined" || os_version.search(rules[rua]["os"]["version"]) !== -1)
                        ) {
                            allow = true;
                        } else if (
                            rules[rua]["action"] === "disallow" &&
                            os_type != rules[rua]["os"]["name"] &&
                            os_arch != rules[rua]["os"]["arch"] &&
                            os_version.search(rules[rua]["os"]["version"]) == -1
                        ) {
                            allow = true;
                        }
                    }
                }
            }
            if (allow === true) {
                let values = jvmArgs[index]["value"];
                if (typeof jvmArgs[index]["value"] != "undefined") {
                    if (typeof jvmArgs[index]["value"] != "string") {
                        for (let i = 0; i < values.length; i++) {
                            command = addOption(command, `${values[i]}`, options);
                        }
                    } else {
                        command = addOption(command, `${values}`, options);
                    }
                }
            }
        }
    }
    command = addOption(
        command,
        `-Xmx2G -XX:+UnlockExperimentalVMOptions -XX:+UseG1GC -XX:G1NewSizePercent=20 -XX:G1ReservePercent=20 -XX:MaxGCPauseMillis=50 -XX:G1HeapRegionSize=32M net.minecraft.client.main.Main`
    );
    let gameArgs = versionData["arguments"]["game"];
    for (let index = 0; index < gameArgs.length; index++) {
        if (typeof gameArgs[index] == "string") {
            command = addOption(command, gameArgs[index], options);
        }
    }
    command = addOption(command, "--width 2048 --height 1152");
    await complete_assets(versionData, event);
    exe.exec(command);
}
