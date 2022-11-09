window.onload = function () {
    $('#user_add').bind('click', function () {
        $('#main').empty();
    });
    $('#version_list').bind('click', function () {
        $('#main').empty();
    });
    $('#download').bind('click', function () {
        $('#main').empty();
    });
    $('#v_setting').bind('click', function () {
        $('#main').empty();
    });
    $('#g_setting').bind('click', function () {
        $('#main').attr('style', 'margin-top: -20px; opacity: 0;')
        setTimeout(() => {
            $('#main').attr('style', 'display:none')
            $('#main').empty()
            $('#g_setting_pg').clone().appendTo("#main")
            $('#main').attr('style', '')
        }, 250)
        setTimeout(() => {
            $('#main').attr('style', 'margin-top: 0; opacity: 1;')
        }, 500)
    });
};
