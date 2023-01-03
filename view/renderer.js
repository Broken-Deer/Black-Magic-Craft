const ipc = require("electron").ipcRenderer;

async function a() {
    ipc.invoke().then((result) => { })
    console.log(1)
}

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
ipc.send("main-get-event-obj");

ipc.on("close-window", () => {
    win_close();
});
function win_close() {
    $("#win").attr("style", "transform: scale(0.93);  opacity: 0;");
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

var Gamelist;
function updateGamelist() {
    ipc.send("getGamelist");
    ipc.once("Gamelist", (event, data) => {
        if (JSON.stringify(Gamelist) != JSON.stringify(data)) {
            Gamelist = data;
            $("#gamelist").empty();
            if (data == 0) {
                $("#gamelist").append(
                    /* html */ `<p style="margin: auto;font-size: 13px;color: #000000b5;font-style: italic;">此视图筛选条件无匹配结果</p>`
                );
            }
            for (let index = 0; index < data.length; index++) {
                const versionName = data[index];
                $("#gamelist").append(
                    /* html */ `<li><label><input type="radio" name="gamelist" oninput="sidebar_active(this.parentNode.parentNode, '4AA85CFD')"><img src="./assets/images/Grass_Block.webp">${versionName}</label></li>`
                );
            }
        }
    });
}

function test() {
    ipc.send("GetLaunchOption", ["Javalist"]);
    ipc.once("LaunchOption", (event, args) => {
        console.log(args);
    });
}

ipc.on("DownloadInfo", (event, args) => {
    console.log(args);
});
ipc.on("DownloadResults", (event, args) => {
    downloading = downloading.filter((value, index, arr) => {
        if (arr[index][0] === args.id) {
            return false;
        } else {
            return true;
        }
    });
    startDownloadQueue();
    console.log(`队列剩余${tasklist.length}个文件`);
});
