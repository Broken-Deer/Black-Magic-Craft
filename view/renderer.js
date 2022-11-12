var dialog = require('electron').remote;
var ipcRenderer = require('electron').ipcRenderer;

var min = document.getElementById('min');

min.addEventListener('mousedown', () => {
    setTimeout(() => {
        ipcRenderer.send('window-min');
    }, 200);
})

var close = document.getElementById('close');
if (close) {
    close.addEventListener('mousedown', () => {
        setTimeout(() => {
            $('body').attr('style', 'transform: scale(0.95, 0.95); ; opacity: 0;')
            setTimeout(() => {
                ipcRenderer.send('window-close');
            }, 360);
        }, 200);

    })
}

function execute(command) {
    ipcRenderer.send(command);
}

function choose_java(eventobj) {
    ipcRenderer.send('choose_java');

    $('.choose-file-msg').attr('style', 'pointer-events: all; opacity: 0.5')
    //收到文件后，相应地处理
    ipcRenderer.once('file', (event, path) => {
        var inputbox = eventobj.parentNode.previousElementSibling /* 获取输入框外面一层的元素 */
        var input = eventobj.parentNode.previousElementSibling.firstElementChild /* 获取输入框元素 */
        $('.choose-file-msg').attr('style', '')
        if (path == 'canceled') {
            return;
        } else if (path == 'error') {
            var title = eventobj.parentNode.previousElementSibling.previousElementSibling
            $(inputbox).addClass('input-error');
            $(input).val("Java 路径不正确！");
            setTimeout(() => {
                $(input).val("");
                $(inputbox).removeClass('input-error');
            }, 3000);
        } else {
            $(input).val('"' + path + '"');
        }
    });
}

