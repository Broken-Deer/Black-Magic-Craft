function sidebar() {
    if ($("#sidebar").hasClass("sidebar-close")) {
        $("#sidebar").removeClass("sidebar-close");
    } else {
        $("#sidebar").addClass("sidebar-close");
    }
}


function sidebar_active(el, pgid, id2) {
    $(el.parentNode.parentNode.parentNode.lastElementChild).children("*").fadeOut(100);
    $(el).siblings().removeClass("active");
    const style = $(el.parentNode).attr("style");
    $(el.parentNode).attr("style", `pointer-events: none; ${style ? style : ""}`);
    $(el).addClass("active");
    if (typeof id2 != "undefined") {
        $(document.getElementById(id2).firstElementChild).siblings().removeClass("active");
    }
    setTimeout(() => {
        $(`.rua>#${pgid}`).fadeIn(150);
        setTimeout(() => {
            $(el.parentNode).attr("style", style ? style : "");
        }, 100);
    }, 100);
}