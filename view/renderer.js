let ipcRenderer = require('electron').ipcRenderer;

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