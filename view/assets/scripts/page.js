window.onload = function () {
    setTimeout(() => {
        $('body').attr('style', 'transform: scale(1, 1); ; opacity: 1; transition: transform .3s ease, opacity .3s ease')
    }, 200);
    $('#user_add').bind('click', function () {
        hide_btn()
        $('#main').empty();
    });
    $('#start_game').bind('click', function () {
        display_btn()
        $('#main').empty();
    });
    $('#version_list').bind('click', function () {
        hide_btn()
        $('#main').empty();
    });
    $('#download').bind('click', function () {
        hide_btn()
        $('#main').empty();
    });
    $('#v_setting').bind('click', function () {
        hide_btn()
        $('#main').empty();
    });
    $('#g_setting').bind('click', function () {
        hide_btn()
        $('#main').attr('style', 'margin-top: -20px; opacity: 0;')
        setTimeout(() => {
            $('#main').attr('style', 'display:none')
            $('#main').empty()
            $('#g_setting_pg').clone(true).appendTo("#main")
            $('#main').attr('style', '')
        }, 250)
        setTimeout(() => {
            $('#main').attr('style', 'margin-top: 0; opacity: 1;')
        }, 500)
    });
};

function display_btn() {
    $('.btn').attr('style', 'margin-top: 0rem;')
}

function hide_btn() {
    $('.btn').attr('style', 'margin-top: 5.5rem;transition: margin-top .3s cubic-bezier(0.6, -0.28, 0.74, 0.05);')
}