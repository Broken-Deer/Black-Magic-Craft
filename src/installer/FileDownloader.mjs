/*
 * Black Magic Launcher
 * Copyright (C) 2020 Broken-Deer <old_driver__@outlook.com> and contributors
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
import f from "fs";
import got from "got";
import pLimit from "p-limit";
import util from "util";
import stream from "stream";
import path from "path";
import exe from "child_process";
/* import ElectronStore from "electron-store";
const store = new ElectronStore(); */
/**
 * 并行下载
 * @param {array} tasklist 下载队列
 * @param {int} plimit 最大线程数
 * @param {obj} event ipc event, 用于向渲染进程汇报下载进度
 * @param {string} taskname 汇报下载进度时会一同发给渲染进程
 */
export async function parallelDownload(tasklist, plimit, event, taskname) {
    if (!store.has("globle.download.module")) {
        store.set("globle.download.module", 1);
    }
    var _event = event;
    const limit = pLimit(plimit);
    const task = [];
    var reply = true;
    if (tasklist.length != tasklist.length) {
        throw "请确保下载地址与路径一一对应";
    }

    var i = 0;
    var rua = 0;
    var downloaded = 0;
    console.log(`下载队列共有${tasklist.length}个文件`);
    console.log(`使用Got下载`);
    while (i < tasklist.length) {
        i++;
        task.push(
            limit(async () => {
                const i = rua++;
                const from_ = tasklist[i][0];
                const to_ = to[i][1];
                console.log(`从${from_}到${to_}`);
                if (f.existsSync(to_)) {
                    downloaded++;
                    _event.reply("updateUI", [downloaded, tasklist.length, taskname]);
                    if (downloaded > tasklist.length * 0.95 && reply === true) {
                        console.log(_event);
                        _event.reply("taskdone", [taskname]);
                        reply = false;
                    }
                } else {
                    const pipeline = util.promisify(stream.pipeline);
                    makeDir(to_.replace(/(?=(\/)(?!.*\1)).*?$/g, ""));
                    const downloadStream = got.stream(from_, { timeout: {} });
                    const fileWriterStream = f.createWriteStream(to_);
                    downloadStream.on("error", error => {
                        downloaded++;
                        _event.reply("updateUI", [downloaded, tasklist.length, taskname]);
                        if (downloaded > tasklist.length * 0.95 && reply === true) {
                            console.log(_event);
                            _event.reply("taskdone", [taskname]);
                            reply = false;
                        }
                    });
                    fileWriterStream
                        .on("error", () => {})
                        .on("finish", () => {
                            downloaded++;
                            _event.reply("updateUI", [downloaded, tasklist.length, taskname]);
                            if (downloaded > tasklist.length * 0.95 && reply === true) {
                                console.log(_event);
                                _event.reply("taskdone", [taskname]);
                                reply = false;
                            }
                        });

                    await pipeline(downloadStream, fileWriterStream);
                }
            })
        );
    }
    await Promise.all(task).catch();
}

/**
 * 使用Got模块下载单个文件
 * @param {array} from 下载来源
 * @param {array} to 保存路径，需要和from参数一一对应
 */
export async function useGotToDownloadFile(from, to) {
    makeDir(to.replace(/(?=(\/)(?!.*\1)).*?$/g, ""));
    const pipeline = util.promisify(stream.pipeline);
    const downloadStream = got.stream(from, { timeout: {} });
    const fileWriterStream = f.createWriteStream(to);
    downloadStream.on("retry", (retryCount, error, createRetryStream) => {
        console.log(`${to}下载失败，第${retryCount}次重试`);
    });
    downloadStream.on("error", error => {
        console.log(`assets file: ${error.message}`);
    });
    fileWriterStream
        .on("error", () => {})
        .on("finish", () => {
            console.log(`下载完成：${to}`);
        });

    await pipeline(downloadStream, fileWriterStream);
}

/**
 * 使用Aria2下载单个文件
 */
export async function useAria2ToDownloadFile(from, to, callbackA, callbackB) {
    if (f.existsSync(to)) {
        return;
    }
    const FileName = path.basename(to);
    const DirName = path.dirname(to);
    makeDir(DirName);
    console.log(`开始下载文件${to}`);
    const DownloadProcess = exe.spawn(
        //-x 16 -s 256
        `${process.cwd()}/vendor/aria2-win-64bit/aria2c.exe`,
        [`-d ${DirName} -o ${FileName} ${from} --file-allocation=none`],
        { shell: true }
    );
    DownloadProcess.stdout.on("data", data => {
        data = data.toString().trim();
        console.log(data);
        if (data.substring(0, 1) === "[" && data.substring(data.length - 1, data.length) === "]") {
            data = data.substring(1, data.length - 1).split(" ");
            try {
                callbackA({
                    id: ID,
                    downloaded: data[1].replace(/\(.*\)/g, "").split("/")[0],
                    total: data[1].replace(/\(.*\)/g, "").split("/")[1],
                    percentage: data[1].match(/\(.*\)/g)[0].substring(1, data[1].match(/\(.*\)/g)[0].length - 1),
                    speed: data[3].substring(3, data[3].length) + "b/s",
                    eta: data[4].substring(4, data[4].length),
                });
                return;
            } catch (e) {}
        }
        let isDone = false;
        try {
            if (data.match("Download Results") || data.match("Status Legend:")) {
                data = data.split("\n");
                isDone = true;
                data = data.filter((value, index, arr) => {
                    if (data[index - 3] === "Download Results:" || data[index + 2] === "Status Legend:") {
                        return true;
                    } else {
                        return false;
                    }
                });
            }
            data = data[0].split("|");
        } catch (e) {
            return;
        }

        if (typeof callbackB !== "undefined" && isDone === true) {
            callbackB({
                stat: data[1].trim(),
                avgspeed: data[2].trim(),
                path: data[3].trim(),
            });
            if (data[1].trim() !== "OK" && typeof callbackA === "undefined" && typeof callbackB === "undefined") {
                useAria2ToDownloadFile(from, to);
            }
        }
    });
}
/**
 * 如果文件夹不存在则递归创建
 * @param {string} dirname 目录
 * @returns
 */
function makeDir(dirname) {
    if (f.existsSync(dirname)) {
        return true;
    } else {
        if (makeDir(path.dirname(dirname))) {
            f.mkdirSync(dirname);
            return true;
        }
    }
}
