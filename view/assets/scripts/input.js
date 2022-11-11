function input_list(input_list, height) {
    var options = input_list.lastElementChild
    var a = options.getAttribute('style')
    if (a == 'display: none;') {
        options.setAttribute('style', 'height: 2rem;')
        setTimeout(() => {
            options.setAttribute('style', 'height: ' + height + ';')
        }, 0);
    } else {
        options.setAttribute('style', 'height: 2rem;')
        setTimeout(() => {
            options.setAttribute('style', 'display: none;')
        }, 100);
    }
}

function set_input_list(eventobj) {

    var value_box = eventobj.parentNode.parentNode.firstElementChild
    value_box.innerHTML = eventobj.innerHTML
}

function expanded_card(eventobj) {
    var card = eventobj.parentNode.parentNode
    $(eventobj).addClass('btn-disable')
    setTimeout(() => {
        $(eventobj).removeClass('btn-disable')
    }, 310);
    if ($(card).hasClass('not-expanded')) {
        $(card.lastElementChild).attr('style', 'overflow: hidden;')
        $(card).removeClass('not-expanded');
        if (!$(card).hasClass('not-expanded')) {
            setTimeout(() => {
                $(card.lastElementChild).attr('style', '')
            }, 300);
        }
    }
    else {
        $(card).addClass('not-expanded');
        $(card.lastElementChild).attr('style', 'overflow: hidden;')
    }
}