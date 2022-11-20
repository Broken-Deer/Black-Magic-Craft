import f from "fs";
import got from "got";
import pLimit from "p-limit";
import util from "util";
import stream from "stream";
import path from "path";


/**
 * 并行下载
 * @param {array} from 下载来源
 * @param {array} to 保存路径，需要和from参数一一对应
 * @param {int} plimit 最大线程数
 * @param {obj} event ipc event, 用于向渲染进程汇报下载进度
 * @param {string} taskname 汇报下载进度时会一同发给渲染进程
 */
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
                    _event.reply("updateUI", [downloaded, from.length, _taskname]);
                    if (downloaded > from.length * 0.95 && reply === true) {
                        console.log(_event);
                        _event.reply("taskdone",[_taskname]);
                        reply = false;
                    }
                } else {
                    const pipeline = util.promisify(stream.pipeline);
                    makeDir(to_.replace(/(?=(\/)(?!.*\1)).*?$/g, ""));
                    const downloadStream = got.stream(from_, { timeout: {} });
                    const fileWriterStream = f.createWriteStream(to_);
                    downloadStream.on("error", (error) => {
                        downloaded++;
                        _event.reply("updateUI", [downloaded, from.length, _taskname]);
                        if (downloaded > from.length * 0.95 && reply === true) {
                            console.log(_event);
                            _event.reply("taskdone",[_taskname]);
                            reply = false;
                        }
                    });
                    fileWriterStream
                        .on("error", () => {})
                        .on("finish", () => {
                            downloaded++;
                            _event.reply("updateUI", [downloaded, from.length, _taskname]);
                            if (downloaded > from.length * 0.95 && reply === true) {
                                console.log(_event);
                                _event.reply("taskdone",[_taskname]);
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
 * 下载单个文件
 * @param {array} from 下载来源
 * @param {array} to 保存路径，需要和from参数一一对应
 */
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
