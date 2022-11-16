window.onload = function () {
    $("body").attr(
        "style",
        "transform: scale(1); opacity: 1; transition: transform .4s ease, opacity .4s ease"
    );

    $("#user_add").bind("click", function () {});
    $("#start_game").bind("click", function () {
        display_btn();
        $("#main").empty();
    });
    $("#version_list").bind("click", function () {});
    $("#download").bind("click", function () {
        version_list('vanilla');
    });
    $("#v_setting").bind("click", function () {
        test();
    });
    $("#g_setting").bind("click", function () {
        change_page("#g_setting_pg");
    });
    if ($("#java_auto_choose").prop("checked")) {
        $("#E16616C6").addClass("disable");
    } else {
        $("#E16616C6").removeClass("disable");
    }
    if ($("#automatic_memory").prop("checked")) {
        $("#D3E268A7").addClass("disable");
    } else {
        $("#D3E268A7").removeClass("disable");
    }
    /*   const webview = document.querySelector("webview");
  webview.addEventListener("dom-ready", () => {
    webview.openDevTools();
  }); */
};

function display_btn() {
    $(".btn").attr("style", "margin-top: 0rem;");
}

function hide_btn() {
    $(".btn").attr(
        "style",
        "margin-top: 5.5rem;transition: margin-top .3s cubic-bezier(0.6, -0.28, 0.74, 0.05);"
    );
}

function change_page(page_id) {
    hide_btn();
    $("#main").attr("style", "margin-top: -20px; opacity: 0;");
    setTimeout(() => {
        $("#main").attr("style", "display:none");
        $("#main").empty();
        $(page_id).clone(true).appendTo("#main");
        $("#main").attr("style", "");
    }, 250);
    setTimeout(() => {
        $("#main").attr("style", "margin-top: 0; opacity: 1;");
        bind_events(); /* 重新绑定事件 */
    }, 500);
}

function bind_events() {
    slider("CA028F76", "memory_value", 128, 16384);
}

function slider(id, text_box_id, minimum, maximum) {
    $("#" + id).draggable({
        axis: "x",
        containment: "parent",
        drag: function () {
            left = parseInt($("#" + id).css("left"));
            orbit = document.getElementById(id).previousElementSibling;
            $(orbit.firstElementChild).attr(
                "style",
                "width:" + (left + 3) + "px"
            );
            $("#" + text_box_id).attr(
                "placeholder",
                (
                    (left / (parseInt($(orbit).css("width")) - 20)) *
                        (maximum - minimum) +
                    minimum
                ).toFixed()
            );
        },
    });
}
