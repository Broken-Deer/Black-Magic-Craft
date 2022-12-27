var tasklist = [
]
var downloading = [];
var UniqueID = 0; // 唯一id，使用完必须自增一次
function addToDownloadQueue(from, to) {
    tasklist.push([from, to]);
}
function startDownloadQueue() {
    if (tasklist == 0) {
        return;
    }
    // 如果正在下载小于最大并行数则启动新的任务
    if (downloading.length < 256) {
        const WillBeAdd = 256 - downloading.length;
        console.log(WillBeAdd);
        var i = 0;
        while (i < WillBeAdd) {
            ipc.send("downloadFile", [UniqueID, tasklist[i][0], tasklist[i][1]]);
            downloading.push([UniqueID, tasklist[i][0], tasklist[i][1]]);
            UniqueID++;
            i++;
        }

        tasklist.splice(0, WillBeAdd);
    }
}

/* ipc.on('download', (event, args) => {
    
}) */
