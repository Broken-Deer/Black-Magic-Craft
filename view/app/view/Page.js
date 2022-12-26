function change_page(id2) {
    if (id2 === '#home_pg') {$('.footer').fadeIn(1000)
        
    } else {
        $('.footer').fadeOut(1000)
    }
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
