function expanded_card(eventobj, value) {
    var card = eventobj.parentNode.parentNode;
    var body = card.lastElementChild;
    var height = $(body).height();
    var heightt = value;
    $(eventobj).addClass("btn-disable"); /* 禁用按钮防止连点 */
    setTimeout(() => {
        /* 动画完成后恢复按钮 */
        $(eventobj).removeClass("btn-disable");
    }, 250);
    if ($(card).hasClass("not-expanded")) {
        /* 如果已经处于折叠状态 */
        $(body).attr("style", "height: 0;overflow: hidden;"); /* 设置元素溢出隐藏，高度0 */
        $(card).removeClass("not-expanded"); /* 移除标记 */
        if (typeof heightt != "number") {
            height = 23 * 2 + $(body.firstElementChild).children("div").length * (32 + 9.6); /* 计算动画播放完成后的高度 */
        } else {
            height = heightt;
        }
        $(body).height(height); /* 设置为上一步得到的高度 */
        setTimeout(() => {
            /* 动画播放完成后移除“溢出隐藏” */
            $(body).attr("style", "");
        }, 250);
    } else {
        /* 如果没有处于折叠状态 */
        $(card).addClass("not-expanded");
        $(body).height(height);
        setTimeout(() => {
            $(body).attr("style", "height: 0;overflow: hidden;");
        }, 10);
    }
}