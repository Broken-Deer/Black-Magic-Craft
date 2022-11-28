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