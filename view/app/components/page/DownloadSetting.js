import cardHeader from "../cardHeader.js";
import { checkbox } from "../checkbox.js";
import sliderBar from "../sliderBar.js";
import { load, update } from "../../LoadConfigs.js";

export default {
    data() {
        var confA = [
            { id: 1, text: "Aira2(推荐)" },
            { id: 2, text: "Got(不推荐)" },
        ];
        if (typeof load("globle.download.module") == "number") {
            return {
                configA: confA[load("globle.download.module") - 1]["text"],
                configItemsA: confA,
            };
        } else {
            return {
                configA: confA[0]["text"],
                configItemsA: confA,
            };
        }
    },
    template: /* html */ `
<div id="7277F10D" style="display: none">
<div class="card">
    <div class="card-body">
        <div>
            <p>如果没有特殊需要，请使用默认设置以获得最佳下载速度</p>
        </div>
    </div>
</div>
<div class="card">
<card-header title="下载选项" description="下载源、线程限制、下载引擎设置" icon="download"></card-header>
<div class="card-body">
  <div>
    <checkbox name="网络节流" config="globle.download.throttling"></checkbox>
    <slider-bar name="最大线程数" max="256" min="1" step="1" config="globle.download.maxThreadNum"></slider-bar>
    <slider-bar name="最大下载速度(MiB/s)" max="50" min="1" step="1" config="globle.download.maxDownloadSpeed"></slider-bar>
  </div>
</div>
</div>
</div>
    `,
    components: { cardHeader, checkbox, sliderBar },
    methods: {
        updateData(key, val) {
            update(key, val);
        },
    },
};
