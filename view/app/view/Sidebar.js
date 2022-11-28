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
