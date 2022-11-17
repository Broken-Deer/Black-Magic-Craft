import f from "graceful-fs";
import { join } from "path";
import got from "got";
import path from "path";
import pLimit from "p-limit";
import util from "util";
import stream from "stream";
var data = JSON.parse(
    '{"objects": {"icons/icon_16x16.png": {"hash": "bdf48ef6b5d0d23bbb02e17d04865216179f510a", "size": 3665}, "icons/icon_32x32.png": {"hash": "92750c5f93c312ba9ab413d546f32190c56d6f1f", "size": 5362}, "icons/minecraft.icns": {"hash": "991b421dfd401f115241601b2b373140a8d78572", "size": 114786}, "minecraft/icons/icon_16x16.png": {"hash": "bdf48ef6b5d0d23bbb02e17d04865216179f510a", "size": 3665}, "minecraft/icons/icon_32x32.png": {"hash": "92750c5f93c312ba9ab413d546f32190c56d6f1f", "size": 5362}, "minecraft/icons/minecraft.icns": {"hash": "991b421dfd401f115241601b2b373140a8d78572", "size": 114786}, "minecraft/lang/af_za.json": {"hash": "c40cd563a7f4b0fce3e3ff541dfa26bb3cb61804", "size": 331738}, "minecraft/lang/ar_sa.json": {"hash": "7d8bb8fdf11284025e5c84b03be07b3bda809d4b", "size": 696722}, "minecraft/lang/ast_es.json": {"hash": "229c8f64d174cc03de9253a9f2bdb35f84fd638e", "size": 321282}, "minecraft/lang/az_az.json": {"hash": "9abe2de6c5925509f6bfcc8c835d4af8b9e1b4d4", "size": 422225}, "minecraft/lang/ba_ru.json": {"hash": "81bcfdd27f758c3eaf40ec4f72633959d12b1a5a", "size": 779657}, "minecraft/lang/bar.json": {"hash": "2fca83f438a5c7dbfb964de13f0c724b0aaff068", "size": 344567}, "minecraft/lang/be_by.json": {"hash": "8b73c1d651f66e54949fb381416c5b9bca905a8a", "size": 812238}, "minecraft/lang/bg_bg.json": {"hash": "0a5ce2e043ea37f9c8910518ac34c8a42ffb8da5", "size": 818936}, "minecraft/lang/br_fr.json": {"hash": "6b1d3888f86c1df5208a55756a91252ec8cad8bc", "size": 268550}, "minecraft/lang/brb.json": {"hash": "906dd88f5cc36e49182798306395719322a613f3", "size": 347843}, "minecraft/lang/bs_ba.json": {"hash": "10e0011a547baf20aa3537d400991c95ae8a38d6", "size": 348427}, "minecraft/lang/ca_es.json": {"hash": "913b1a21b357047a80ca658e8c09e6ad1a3701ab", "size": 349005}, "minecraft/lang/cs_cz.json": {"hash": "4c9db3ed7d6600cb331ae810a6bba2cfe2681a46", "size": 407215}, "minecraft/lang/cy_gb.json": {"hash": "93cb238fd5ea76f4440c213a4cf134e820bcc976", "size": 334652}, "minecraft/lang/da_dk.json": {"hash": "1a95c89f1168742179647830065274739ea575cd", "size": 342134}, "minecraft/lang/de_at.json": {"hash": "d96d0bba44c5d8fdb8e799b797c3b5b43dd82005", "size": 342026}, "minecraft/lang/de_ch.json": {"hash": "753a064191a8bd23c28c0e7693648fe78a28f4ba", "size": 347573}, "minecraft/lang/de_de.json": {"hash": "e78fd734b462d328537877f1db1ca1c512cd0c25", "size": 351846}, "minecraft/lang/el_gr.json": {"hash": "84d61df7ab528e443db81e5e4e663698b23b6517", "size": 906190}, "minecraft/lang/en_au.json": {"hash": "4e49b4c138ed952410ff803f6f5d1403a404b25d", "size": 323081}, "minecraft/lang/en_ca.json": {"hash": "00e2d3516f633d0c7c22f46909b98f42bcc4d711", "size": 323062}, "minecraft/lang/en_gb.json": {"hash": "964a7f686d8e5bcb0604a0783ca5b85d7195b3a3", "size": 323085}, "minecraft/lang/en_nz.json": {"hash": "b7d18c3520e93c0236436765e639970c168be9a2", "size": 323200}, "minecraft/lang/en_pt.json": {"hash": "f609e9cf60f145875feab920d43c3627abeb415a", "size": 336176}, "minecraft/lang/en_ud.json": {"hash": "830f19d207d4fb7883c1f958583954ec156d17cd", "size": 606836}, "minecraft/lang/enp.json": {"hash": "b2a2cc1d28ae51d9487f2c1444b3f21c2bf2b80f", "size": 326970}, "minecraft/lang/enws.json": {"hash": "a931336d3e6de385e1e2ad9424cc9baf22e0e5aa", "size": 331876}, "minecraft/lang/eo_uy.json": {"hash": "daa9a42f3097b4d21b51349e09346c591fb6c302", "size": 342882}, "minecraft/lang/es_ar.json": {"hash": "7338e67e7eb3e83015e70fbad614b5767c0531f6", "size": 352231}, "minecraft/lang/es_cl.json": {"hash": "affbaa0bdecdf4a5be2ed333cb7e93997a28b404", "size": 350318}, "minecraft/lang/es_ec.json": {"hash": "beb35e3d82aa08d466daeb78a7ffeef5f2d856da", "size": 351550}, "minecraft/lang/es_es.json": {"hash": "52b67efc6c5003deb41f5827f4cd2badf9de0765", "size": 352827}, "minecraft/lang/es_mx.json": {"hash": "64581c826b1d3b7c49d3f1c8043fbf765e41700a", "size": 351170}, "minecraft/lang/es_uy.json": {"hash": "99371ba2da9a49178a4bc5317993460202f36ebc", "size": 352811}, "minecraft/lang/es_ve.json": {"hash": "e4956f892bdae9836109113035f130164c0f5850", "size": 351300}, "minecraft/lang/esan.json": {"hash": "4fe54ae806271614632a42d08563d43903792113", "size": 397820}, "minecraft/lang/et_ee.json": {"hash": "be60f22f1fafc4bb3990cbd9de9aba3947aee88a", "size": 353098}, "minecraft/lang/eu_es.json": {"hash": "60ebe50aa6fa256fd975ac76c8bbd532ab612039", "size": 344442}, "minecraft/lang/fa_ir.json": {"hash": "602ff2d0d7c2d8a43072783ea9202ee7e1976382", "size": 726551}, "minecraft/lang/fi_fi.json": {"hash": "d759d85ba0ee4a908299e85621aabaa2338f390d", "size": 358374}, "minecraft/lang/fil_ph.json": {"hash": "87dbddc611c5b3704adc2df0613d9b8f5be8c7ac", "size": 350485}, "minecraft/lang/fo_fo.json": {"hash": "d7080d91102a7e059787473212c342ec8d14c7d6", "size": 336601}, "minecraft/lang/fr_ca.json": {"hash": "19d7c1d506a1d1210fd06ce5293226e9c3102efe", "size": 371720}, "minecraft/lang/fr_fr.json": {"hash": "4a92aae174615c0d9cc9f572e0532588caa1c7da", "size": 371587}, "minecraft/lang/fra_de.json": {"hash": "c70b142b704587c6f5a53979efce5bfdd1f714c6", "size": 347529}, "minecraft/lang/fur_it.json": {"hash": "5bbf4ace0d60c9f2da1bf9438f9d56db1105b33b", "size": 353947}, "minecraft/lang/fy_nl.json": {"hash": "687574a63e6617801e4b45068ec80508ab91857b", "size": 341273}, "minecraft/lang/ga_ie.json": {"hash": "31cb9e0446ce826fb15c09c1c857c8ac9021133b", "size": 377921}, "minecraft/lang/gd_gb.json": {"hash": "c60aae55ca6b3d5c3b978a6c65dc453a4078eac7", "size": 370260}, "minecraft/lang/gl_es.json": {"hash": "d2dbb67c62b46344048cb0bf279beb186122961a", "size": 349926}, "minecraft/lang/haw_us.json": {"hash": "24aabf622c9d6c2fe4f2dcf1c2a051ce417d0735", "size": 344691}, "minecraft/lang/he_il.json": {"hash": "5bff334ac312c9cc84c90c8b31ff71fc149e44cd", "size": 634153}, "minecraft/lang/hi_in.json": {"hash": "31ba21e63110bf37b436b34f23e8668779706a3f", "size": 763162}, "minecraft/lang/hr_hr.json": {"hash": "cc5bf52f47b9cbc1d17b40b3c647f09c0e9cc7eb", "size": 352532}, "minecraft/lang/hu_hu.json": {"hash": "82433dc3ce1989491c8e6c6eedce87832e90e44a", "size": 394958}, "minecraft/lang/hy_am.json": {"hash": "80402dcb8f12a0951a167ef4cba7f18a61280233", "size": 815400}, "minecraft/lang/id_id.json": {"hash": "ee41870f7b741b1711d48ce4a3744ef6d97c8cae", "size": 333844}, "minecraft/lang/ig_ng.json": {"hash": "bf35527d0f1456d04615d49e62b3f7851cc2fa4a", "size": 317952}, "minecraft/lang/io_en.json": {"hash": "4dc087436eae2b530a56f5015e86eee90568dcb4", "size": 279803}}}'
);
async function removeDir(dir) {
    let files = f.readdirSync(dir);
    for (var i = 0; i < files.length; i++) {
        let newPath = join(dir, files[i]);
        let stat = f.statSync(newPath);
        if (stat.isDirectory()) {
            //如果是文件夹就递归下去
            removeDir(newPath);
        } else {
            //删除文件
            f.unlinkSync(newPath);
        }
    }
    f.rmdirSync(dir); //如果文件夹是空的，就将自己删除掉
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
var Path = "X:/Windows 10/.minecraft/";
var from = [];
var to = [];
var assets_list = data["objects"];
Object.keys(assets_list).forEach((e) => {
    // 下载每一个键描述的内容
    let hash = assets_list[e]["hash"];
    let hash_ = hash.substring(0, 2);
    makeDir(`${Path}assets/objects/${hash_}`);
    from.push(`http://resources.download.minecraft.net/${hash_}/${hash}`);
    to.push(`${Path}assets/objects/${hash_}/${hash}`);
});
parallelDownload(from, to, 5);



























async function parallelDownload(from, to, plimit) {
    const limit = pLimit(plimit);
    const input = [];
    if (from.length != to.length) {
        throw "请确保下载地址与路径一一对应";
    }
    var i = 0;
    var rua = 0;
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
            })
        );
    }

    await Promise.all(input);
}
