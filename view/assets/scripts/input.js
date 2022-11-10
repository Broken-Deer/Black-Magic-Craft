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
    if ($(card).hasClass('not-expanded')) {
        $(card).removeClass('not-expanded');
    }
    else {
        $(card).addClass('not-expanded');
    }
}