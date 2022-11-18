const ipc = require("electron").ipcRenderer;


function execute(command) {
    ipc.send(command);
}

function choose_java(eventobj) {
    ipc.send("choose_java");

    $(".choose-file-msg").attr("style", "pointer-events: all; opacity: 0.5");
    //收到文件后，相应地处理
    ipc.once("file", (event, path) => {
        var inputbox =
            eventobj.parentNode
                .previousElementSibling; /* 获取输入框外面一层的元素 */
        var input =
            eventobj.parentNode.previousElementSibling
                .firstElementChild; /* 获取输入框元素 */
        $(".choose-file-msg").attr("style", "");
        if (path == "canceled") {
            return;
        } else if (path == "error") {
            var title =
                eventobj.parentNode.previousElementSibling
                    .previousElementSibling;
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
    updateUI(message)
});