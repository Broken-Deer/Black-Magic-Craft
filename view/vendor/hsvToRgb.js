function rgbToHsv(arr) {
    var h = 0,
        s = 0,
        v = 0;
    var r = arr[0],
        g = arr[1],
        b = arr[2];
    arr.sort(function (a, b) {
        return a - b;
    });
    var max = arr[2];
    var min = arr[0];
    v = max / 255;
    if (max === 0) {
        s = 0;
    } else {
        s = 1 - min / max;
    }
    if (max === min) {
        h = 0;
    } else if (max === r && g >= b) {
        h = 60 * ((g - b) / (max - min)) + 0;
    } else if (max === r && g < b) {
        h = 60 * ((g - b) / (max - min)) + 360;
    } else if (max === g) {
        h = 60 * ((b - r) / (max - min)) + 120;
    } else if (max === b) {
        h = 60 * ((r - g) / (max - min)) + 240;
    }
    h = parseInt(h);
    s = parseInt(s * 100);
    v = parseInt(v * 100);
    return [h, s, v];
}

function hsvToRgb(h, s, v) {
    s = s / 100;
    v = v / 100;
    var r = 0,
        g = 0,
        b = 0;
    var i = parseInt((h / 60) % 6);
    var f = h / 60 - i;
    var p = v * (1 - s);
    var q = v * (1 - f * s);
    var t = v * (1 - (1 - f) * s);
    switch (i) {
        case 0:
            r = v;
            g = t;
            b = p;
            break;
        case 1:
            r = q;
            g = v;
            b = p;
            break;
        case 2:
            r = p;
            g = v;
            b = t;
            break;
        case 3:
            r = p;
            g = q;
            b = v;
            break;
        case 4:
            r = t;
            g = p;
            b = v;
            break;
        case 5:
            r = v;
            g = p;
            b = q;
            break;
        default:
            break;
    }
    r = parseInt(r * 255.0);
    g = parseInt(g * 255.0);
    b = parseInt(b * 255.0);
    return [r, g, b];
}