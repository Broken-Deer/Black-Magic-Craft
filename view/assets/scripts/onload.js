window.onload = function () {
    $("body").attr("style", "transform: scale(1); opacity: 1; transition: transform .4s ease, opacity .4s ease");

    $("#user_add").bind("click", function () {});
    $("#start_game").bind("click", function () {
        display_btn();
        $("#main").empty();
    });
    $("#version_list").bind("click", function () {});
    $("#download").bind("click", function () {
        change_page("#download_pg");
        version_list("vanilla");
    });
    $("#v_setting").bind("click", function () {
        test();
    });
    $("#g_setting").bind("click", function () {
        change_page("#g_setting_pg");
        setTimeout(() => {
            slider("CA028F76", "memory_value", 128, 16384);
        }, 550);
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

