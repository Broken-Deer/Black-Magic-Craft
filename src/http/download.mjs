import f from "graceful-fs";
import got from "got";
import pLimit from "p-limit";
import util from "util";
import stream from "stream";


export async function parallelDownload(from, to, plimit) {
    const limit = pLimit(plimit);
    const input = [];
    if (from.length != to.length) {
        throw "请确保下载地址与路径一一对应";
    }
    var i = 0;
    var rua = 0;
    var done = 0
    var lm = plimit;
    console.log(`下载队列共有${from.length}个文件`);
    while (i < from.length) {
        i++;
        input.push(
            limit(async () => {
                const aaa = rua++;
                const from_ = from[aaa];
                const to_ = to[aaa];
                if (f.existsSync(to_)) {
                    console.log(`${to_}已存在`);
                } else {
                    const pipeline = util.promisify(stream.pipeline);
                    const downloadStream = got.stream(from_, { timeout: {} });
                    const fileWriterStream = f.createWriteStream(to_);
                    downloadStream.on("retry", (retryCount, error, createRetryStream) => {
                        console.log(`文件：${to_}下载失败，重试`);
                    });
                    downloadStream.on("error", (error) => {
                        console.log(`assets file: ${error.message}`);
                    });
                    fileWriterStream
                        .on("error", () => {})
                        .on("finish", () => {
                            console.log("success");
                        });

                    await pipeline(downloadStream, fileWriterStream);
                }
                if (rua == from.length) {
                    done++
                    if (done == lm) {
                        console.log('资源文件下载完成')
                    }
                }
            })
        );
    }

    await Promise.all(input);
}
