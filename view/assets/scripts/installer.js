function version_list(type) {
    switch (type) {
        case "vanilla":
            $.get("https://piston-meta.mojang.com/mc/game/version_manifest.json", function (data, textStatus, jqXHR) {
                if (jqXHR.status == 200) {
                    var _version_list = data["versions"];
                    for (let i = 0; i < _version_list.length; i++) {
                        let version_info = _version_list[i];
                        console.log(version_info);
                        if (version_info["type"] == "release") {
                            var icon = "grass_block";
                            var type = "正式版";
                        }
                        if (version_info["type"] == "snapshot") {
                            var icon = "crafting_table";
                            var type = "测试版";
                        }
                        if (version_info["type"] == "old_beta" || version_info["type"] == "old_alpha") {
                            var icon = "ancient_debris";
                            var type = "远古版";
                        }
                        let date = new Date(version_info["releaseTime"]);
                        $("#_version_list").append(`
                            <li class="${icon}">
                                <div class="a">
                                    <div class="icon"></div>
                                    <div class="info">
                                        <p class="title">${version_info["id"]}</p>
                                        <span>发布于${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日 ${type}</span>
                                    </div>
                                </div>
                                <div class="button download" onclick="install_game('${version_info["url"]}', '${version_info["id"]}')">
                                    <i></i>
                                </div>
                            </li>
                            `);
                    }
                    $(document.getElementById("_version_list").lastElementChild).addClass("list-last-one"); /* 最后一项添加list-last-one类表示底部不需要分割线 */
                } else {
                    // 失败后的操作;
                }
            });
            break;
    }

}

function install_game(url, id) {
    ipc.send("install_game", [url, id]);
}
function win_close() {
    $("body").attr("style", "transform: scale(0.95, 0.95); ; opacity: 0;");
    setTimeout(() => {
        ipc.send("window-close");
    }, 360);
}
function win_min() {
    ipc.send("window-min");
}
