/*
 * Black Magic Launcher
 * Copyright (C) 2022-2023 Broken_Deer <old_driver__@outlook.com> and contributors
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

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
