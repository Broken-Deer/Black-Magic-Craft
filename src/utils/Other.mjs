
var eventObj
/**
 * 设置ipc回复消息的event对象，以便主动向主进程发送消息。一般在启动完成后调用
 */
function setEventObj(obj) {
    eventObj = obj
}

/**
 * 获取electron ipc的event对象
 */
function getEventObj() {
    return eventObj
}

export {
    setEventObj,
    getEventObj,
}