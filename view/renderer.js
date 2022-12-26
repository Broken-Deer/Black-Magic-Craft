const ipc = require("electron").ipcRenderer;

function execute(command) {
    ipc.send(command);
}
function choose_java(eventobj) {
    ipc.send("choose_java");

    $(".choose-file-msg").attr("style", "pointer-events: all; opacity: 0.5");
    //收到文件后，相应地处理
    ipc.once("file", (event, path) => {
        var inputbox = eventobj.parentNode.previousElementSibling; /* 获取输入框外面一层的元素 */
        var input = eventobj.parentNode.previousElementSibling.firstElementChild; /* 获取输入框元素 */
        $(".choose-file-msg").attr("style", "");
        if (path == "canceled") {
            return;
        } else if (path == "error") {
            var title = eventobj.parentNode.previousElementSibling.previousElementSibling;
            $(inputbox).addClass("input-error");
            $(input).val("Java 路径不正确！");
            setTimeout(() => {
                $(input).val("");
                $(inputbox).removeClass("input-error");
            }, 3000);
        } else {
            $(input).val('"' + path + '"');
        }
    });
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
ipc.on("updateUI", (event, message) => {
    updateUI(message);
});

ipc.on("taskdone", (event, message) => {
    console.log(message);
    switch (message[0]) {
        case "task1":
        case "task2":
            taskdone("#" + message[0]);
            $(document.getElementById(message[0]).parentNode.previousElementSibling).fadeOut(1000);
            break;
        case "lib":
            taskdone("#task3");
            $("#" + message[0]).fadeOut(200);
            break;
        case "assets_file":
            taskdone("#task4");
            $("#" + message[0]).fadeOut(200);

        default:
            break;
    }
});

function start() {
    ipc.send("launchGame", ["1.19.2"]);
}
function updateGamelist() {
    ipc.send("getGamelist");
    ipc.once("Gamelist", (event, data) => {
        console.log(data);
        $("#gamelist").empty();
        if (data == 0) {
            $("#gamelist").append(`<p style="
            margin: auto;
            font-size: 13px;
            color: #000000b5;
            font-style: italic;
        ">还没有安装游戏</p>`);
        }
        for (let index = 0; index < data.length; index++) {
            const versionName = data[index];
            $("#gamelist").append(`<li><img src="./assets/images/Grass_Block.webp">${versionName}</li>`);
        }
    });
}
function test() {
    ipc.send("getJavalist");
    ipc.once("Javalist", (event, args) => {
        console.log(args);
    });
}
