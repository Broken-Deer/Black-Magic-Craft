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

function sidebar_active(el) {
    $("*.active").removeClass("active");
    setTimeout(() => {
        $(el).addClass("active");
    }, 100);
}
