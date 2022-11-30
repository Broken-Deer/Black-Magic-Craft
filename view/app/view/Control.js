function disable(event, id) {
    if ($(event).prop("checked")) {
        $(`#${id}`).addClass("disable");
    } else {
        $(`#${id}`).removeClass("disable");
    }
}

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

function input_list(input_list, height) {
    var options = input_list.lastElementChild;
    var a = options.getAttribute("style");
    if (a == "display: none;") {
        options.setAttribute("style", "height: 2rem;");
        setTimeout(() => {
            options.setAttribute("style", "height: " + height + ";");
        }, 0);
        setTimeout(() => {
            options.setAttribute("style", "height: " + height + ";overflow: hidden overlay;");
        }, 200);
    } else {
        options.setAttribute("style", "height: 2rem;");
        setTimeout(() => {
            options.setAttribute("style", "display: none;");
        }, 100);
    }
}

function set_input_list(eventobj) {
    var value_box = eventobj.parentNode.parentNode.firstElementChild;
    value_box.innerHTML = eventobj.innerHTML;
}