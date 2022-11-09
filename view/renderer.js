let ipcRenderer = require('electron').ipcRenderer;

var min = document.getElementById('min');

min.addEventListener('click', () => {
    //发送最小化命令
    ipcRenderer.send('window-min');
})

var close = document.getElementById('close');
if (close) {
    close.addEventListener('click', () => {
        //发送关闭命令
        ipcRenderer.send('window-close');
    })
}