function disable(event, id) {
    if ($(event).prop("checked")) {
        $(`#${id}`).addClass("disable");
    } else {
        $(`#${id}`).removeClass("disable");
    }
}

