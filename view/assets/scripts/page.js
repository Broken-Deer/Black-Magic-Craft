window.onload = function () {
    bind_events();/* 绑定事件 */
    $('body').attr('style',
        'transform: scale(1); opacity: 1; transition: transform .4s ease, opacity .4s ease')

    $('#user_add').bind('click', function () { });
    $('#start_game').bind('click', function () {
        display_btn()
        $('#main').empty();
    });
    $('#version_list').bind('click', function () { });
    $('#download').bind('click', function () { });
    $('#v_setting').bind('click', function () { });
    $('#g_setting').bind('click', function () { change_page('#g_setting_pg') });
    if ($('#java_auto_choose').prop('checked')) {
        $('#E16616C6').addClass('disable');
    } else {
        $('#E16616C6').removeClass('disable');
    }
    if ($('#automatic_memory').prop('checked')) {
        $('#D3E268A7').addClass('disable');
    } else {
        $('#D3E268A7').removeClass('disable');
    }
};

function display_btn() {
    $('.btn').attr('style', 'margin-top: 0rem;')
}

function hide_btn() {
    $('.btn').attr('style', 'margin-top: 5.5rem;transition: margin-top .3s cubic-bezier(0.6, -0.28, 0.74, 0.05);')
}

function change_page(page_id) {
    hide_btn()
    $('#main').attr('style', 'margin-top: -20px; opacity: 0;')
    setTimeout(() => {
        $('#main').attr('style', 'display:none')
        $('#main').empty()
        $(page_id).clone(true).appendTo("#main")
        $('#main').attr('style', '')
    }, 250)
    setTimeout(() => {
        $('#main').attr('style', 'margin-top: 0; opacity: 1;')
        bind_events(); /* 重新绑定事件 */
    }, 500)
}

function bind_events() {
    $(function () {
        $("#CA028F76").draggable({
            axis: "x",
            containment: "parent",
            drag: function () {
                $(
                    document.getElementById('CA028F76').previousElementSibling.firstElementChild
                ).attr(
                    'style',
                    'width:' + (parseInt($('#CA028F76').css('left')) + 3) + 'px'
                );
            }
        });
    });
}