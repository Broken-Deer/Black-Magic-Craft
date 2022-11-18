import f from "graceful-fs";
import got from "got";
import pLimit from "p-limit";
import util from "util";
import stream from "stream";
import path, { resolve } from "path";
import { ipcMain } from "electron";

export async function parallelDownload(from, to, plimit, event, taskname) {
    var _event = event;
    const _taskname = taskname;
    const limit = pLimit(plimit);
    const task = [];
    var reply = true;
    if (from.length != to.length) {
        throw "请确保下载地址与路径一一对应";
    }
    var i = 0;
    var rua = 0;
    var downloaded = 0;
    console.log(`下载队列共有${from.length}个文件`);
    while (i < from.length) {
        i++;
        task.push(
            limit(async () => {
                const aaa = rua++;
                const from_ = from[aaa];
                const to_ = to[aaa];
                if (f.existsSync(to_)) {
                    downloaded++;
                    console.log(`下载完成(${downloaded}/${from.length})：${to_}已存在`);
                    _event.reply("updateUI", [downloaded, from.length, _taskname]);
                } else {
                    const pipeline = util.promisify(stream.pipeline);
                    makeDir(to_.replace(/(?=(\/)(?!.*\1)).*?$/g, ""));
                    const downloadStream = got.stream(from_, { timeout: {} });
                    const fileWriterStream = f.createWriteStream(to_);
                    downloadStream.on("error", (error) => {
                        console.log(`${to_}下载失败，跳过此文件`);
                        downloaded++;
                        _event.reply("updateUI", [downloaded, from.length, _taskname]);
                    });
                    fileWriterStream
                        .on("error", () => {})
                        .on("finish", () => {
                            downloaded++;
                            console.log(`下载完成(${downloaded}/${from.length})：${to_}`);
                            _event.reply("updateUI", [downloaded, from.length, _taskname]);
                        });

                    await pipeline(downloadStream, fileWriterStream);
                }
            })
        );
    }

    await Promise.all(task).catch();
}

export async function downloadFile(from, to) {
    makeDir(to.replace(/(?=(\/)(?!.*\1)).*?$/g, ""));
    const pipeline = util.promisify(stream.pipeline);
    const downloadStream = got.stream(from, { timeout: {} });
    const fileWriterStream = f.createWriteStream(to);
    downloadStream.on("retry", (retryCount, error, createRetryStream) => {
        console.log(`${to}下载失败，第${retryCount}次重试`);
    });
    downloadStream.on("error", (error) => {
        console.log(`assets file: ${error.message}`);
    });
    fileWriterStream
        .on("error", () => {})
        .on("finish", () => {
            console.log(`下载完成：${to}`);
        });

    await pipeline(downloadStream, fileWriterStream);
}

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
