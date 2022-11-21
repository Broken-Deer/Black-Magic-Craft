function version_list(type) {
    setTimeout(() => {
        // 页面切换动画播放完之后再操作
        switch (type) {
            case "vanilla":
                $.get("https://piston-meta.mojang.com/mc/game/version_manifest.json", function (data, textStatus, jqXHR) {
                    if (jqXHR.status == 200) {
                        var _version_list = data["versions"];
                        for (let i = 0; i < _version_list.length; i++) {
                            let version_info = _version_list[i];
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
                        setTimeout(() => {
                            $("#B9C498C7").fadeOut(200);
                            $("#_version_list").attr("style", "opacity: 1;");
                            $("#5D4CBB91").removeClass("disable");
                        }, 500);
                    } else {
                        // 失败后的操作;
                    }
                });
                break;
        }
    }, 500);
}

function install_game(url, id) {
    popup_window("game_install");
    $("#5E79266D").html(`正在安装${id}`);
    $('#lib').html('');
    $("#assets_file").html('');
    setTimeout(() => {
        console.log('发送安装命令')
        ipc.send("install_game", [url, id]);
        var i = setInterval(() => {
            if ($("#task1").hasClass("circle-check") && $("#task2").hasClass("circle-check") && $("#task3").hasClass("circle-check") && $("#task4").hasClass("circle-check")) {
                popup_window_close("game_install");
                clearInterval(i);
            }
        }, 50); // 循环检查这几个元素有没有打勾
    }, 500);
}

async function install_progress() {}

function updateUI(arg) {
    $(`#${arg[2]}`).html(`${arg[0]} / ${arg[1]}`);
}

function taskControler(type) {}
