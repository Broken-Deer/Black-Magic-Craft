/* 杂七杂八的ui操作放在这里 */

async function popup_window(id) {
    var jqid = `#${id}`;
    await $("#pop_up_window_shadow").addClass("popup_window_display");
    await $(jqid).clone(true).appendTo("#pop_up_window_shadow");

    setTimeout(async () => {
        switch (id) {
            case "ms_login":
                await show_login_window();
                break;

            case "game_install":
                await install_progress();
            default:
                break;
        }
    }, 300);
}

function popup_window_close(window_id) {
    var jqid = window_id;
    $(jqid).attr("style", "transform: scale(0.9);opacity: 0;");
    setTimeout(() => {
        $("#pop_up_window_shadow").removeClass("popup_window_display");
    }, 300);
    setTimeout(() => {
        $("#pop_up_window_shadow").empty();
    }, 600);
}

function taskdone(id) {
    $(id).removeClass("spinner-third");
    $(id).addClass("circle-check");
}
function display_btn() {
    $(".btn").attr("style", "margin-top: 0rem;");
}

function hide_btn() {
    $(".btn").attr("style", "margin-top: 5.5rem;transition: margin-top .3s cubic-bezier(0.6, -0.28, 0.74, 0.05);");
}

function change_page(id2) {
    const el = document.querySelectorAll("#main>div");
    hide_btn();
    $("#main").attr("style", "margin-top: -20px; opacity: 0;");
    setTimeout(() => {
        var disposables = document.querySelectorAll(".disposable");
        $(disposables).empty();
        $("#main").attr("style", "display:none");
        $(el).attr("style", "display:none");

        $(id2).attr("style", "");
        $("#main").attr("style", "");
    }, 250);
    setTimeout(() => {
        $("#main").attr("style", "margin-top: 0; opacity: 1;");
    }, 500);
}

function slider(id, text_box_id, minimum, maximum) {
    setTimeout(() => {
        $("#" + id).draggable({
            axis: "x",
            containment: "parent",
            drag: function () {
                left = parseInt($("#" + id).css("left"));
                orbit = document.getElementById(id).previousElementSibling;
                $(orbit.firstElementChild).attr("style", "width:" + (left + 3) + "px");
                $("#" + text_box_id).attr("placeholder", ((left / (parseInt($(orbit).css("width")) - 20)) * (maximum - minimum) + minimum).toFixed());
            },
        });
    }, 100);
}
function disable(event, id) {
    if ($(event).prop("checked")) {
        $(`#${id}`).addClass("disable");
    } else {
        $(`#${id}`).removeClass("disable");
    }
}

function change_sideabr(id) {}

function sidebar() {
    if ($("#sidebar").hasClass("sidebar-close")) {
        $("#sidebar").removeClass("sidebar-close");
    } else {
        $("#sidebar").addClass("sidebar-close");
    }
}

function sidebar_hidden() {
    if ($("#sidebar").hasClass("sidebar-close")) {
        $("#sidebar").addClass("sidebar-close");
    }
    $("#sidebar").attr("style", "width: 0px !important");
}

function sidebar_show() {
    $("#sidebar").attr("style", "");
}

function sidebar_active(el, pgid) {
    $(el.parentNode.parentNode.parentNode.lastElementChild).children("*").fadeOut(150);
    $(el).siblings().removeClass("active");
    setTimeout(() => {
        $(`.rua>#${pgid}`).fadeIn(150);
        $(el).addClass("active");
    }, 150);
}

function backtoHome() {
    sidebar_show();
    change_page("#download_pg");
}

/* 颜色选择器 */

function inputUpdateUI(el, type) {
    var val = String(el.value);
    var color;
    console.log(val);

    if (type == "hex") {
        color = new Color({ color: String(val), type: "hex" });
        console.log(color);
        var hsv = rgbToHsv(color.rgb);
        UpdateUI(hsv[0], hsv[1], hsv[2], type);
        return;
    } else {
        if (type != "rgb") {
            val = String(val).match(/\((.+?)\)/g)[0];
        }
        val = val
            .substring(1, val.length - 1)
            .replace(/\%/g, "")
            .replace(/\n/g, "");
        console.log(val);
        val = val.split(",");
        console.log([Number(val[0]), Number(val[1]), Number(val[2])]);
        if (type == "hsv") {
            UpdateUI(Number(val[0]), Number(val[1]), Number(val[2]), type);
            return;
        } else {
            color = new Color({ color: [Number(val[0]), Number(val[1]), Number(val[2])], type: type });
        }
    }

    console.log(color.rgb);
    var hsv = rgbToHsv(color.rgb);
    UpdateUI(hsv[0], hsv[1], hsv[2], type);
}
function SliderUpdateUI() {
    UpdateUI(Number(document.getElementById("h").value), Number(document.getElementById("s").value), Number(document.getElementById("v").value), "slider");
}
function choosedNearlyColor(el) {
    console.log(window.getComputedStyle(el, null).background);
    var val = String(window.getComputedStyle(el, null).background).match(/\((.+?)\)/g)[0];
    val = val
        .substring(1, val.length - 1)
        .replace(/\%/g, "")
        .replace(/\n/g, "");
    val = val.split(",");
    var hsv = rgbToHsv(val);
    UpdateUI(hsv[0], hsv[1], hsv[2], null);
}
function UpdateUI(h, s, v, exclude) {
    console.log(exclude);
    var hl = (hd = h);
    var sl = (sd = s);
    var vl = (vd = v);
    var rgb = hsvToRgb(h, s, v);
    var b;
    if (v + 15 < 101) {
        vl = v + 15;
    } else {
        vl = 100;
        if (h + 4 < 360) {
            hl = h + 4;
        } else {
            hl = h + 4 - 359;
        }
    }
    b = hsvToRgb(hl, sl, vl);
    if (vl + 15 < 101) {
        vl = vl + 15;
    } else {
        vl = 100;
        if (hl + 4 < 360) {
            hl = hl + 4;
        } else {
            hl = hl + 4 - 359;
        }
    }
    c = hsvToRgb(hl, sl, vl);
    if (v - 20 > -1) {
        vd = v - 20;
    } else {
        hd = sd = vd = 0;
    }
    d = hsvToRgb(hd, sd, vd);
    if (v - 20 > -1) {
        vd = vd - 20;
    } else {
        hd = sd = vd = 0;
    }
    e = hsvToRgb(hd, sd, vd);
    var hh = hsvToRgb(document.getElementById("h").value, 100, 100);
    document.getElementById("style").innerHTML = /* css */ `
                div#color_chooser>div:last-child>div.color input#s::-webkit-slider-runnable-track {
                    background-image: linear-gradient(to right, rgb(255, 255, 255) 0, rgb(${hh[0]}, ${hh[1]}, ${hh[2]}));
                }

                div#color_chooser>div:last-child>div.color input#v::-webkit-slider-runnable-track {
                    background-image: linear-gradient(to right, rgb(0, 0, 0) 0, rgb(${hh[0]}, ${hh[1]}, ${hh[2]}));
                }
                #a {
                    background: rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})
                }
                #b {
                    background: rgb(${b[0]}, ${b[1]}, ${b[2]})
                }
                #c {
                    background: rgb(${c[0]}, ${c[1]}, ${c[2]})
                }
                #d {
                    background: rgb(${d[0]}, ${d[1]}, ${d[2]})
                }
                #e {
                    background: rgb(${e[0]}, ${e[1]}, ${e[2]})
                }
            `;
    let color = new Color({ color: [rgb[0], rgb[1], rgb[2]], type: "rgb" });
    if (exclude != "slider") {
        document.getElementById("h").value = h;
        document.getElementById("s").value = s;
        document.getElementById("v").value = v;
    }
    if (exclude != "rgb") {
        document.getElementById("rgb").value = `${rgb[0]}, ${rgb[1]}, ${rgb[2]}`;
    }
    if (exclude != "hsv") {
        document.getElementById("hsv").value = `hsv(${h}, ${s}%, ${v}%)`;
    }
    if (exclude != "hex") {
        document.getElementById("hex").value = color.hex;
    }
    if (exclude != "hsl") {
        document.getElementById("hsl").value = `hsl(${parseInt(color.hsl[0])}, ${parseInt(color.hsl[1])}%, ${parseInt(color.hsl[2])}%)`;
    }
    if (exclude != "lab") {
        document.getElementById("lab").value = `CIELab(${parseInt(color.lab[0])}, ${parseInt(color.lab[1])}, ${parseInt(color.lab[2])})`;
    }
    if (exclude != "xyz") {
        document.getElementById("xyz").value = `XYZ(${parseInt(color.xyz[0])}, ${parseInt(color.xyz[1])}, ${parseInt(color.xyz[2])})`;
    }
    if (exclude != "luv") {
        document.getElementById("luv").value = `luv(${parseInt(color.luv[0])}, ${parseInt(color.luv[1])}, ${parseInt(color.luv[2])})`;
    }
}

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
        h = 0; //事实上，max===min的时候，h无论为多少都无所谓
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
