import cardHeader from "../cardHeader.js";
import checkbox from "../checkbox.js";
import sliderBar from "../sliderBar.js";

export default {
    template: /* html */ `
<div id="7277F10D" style="display: none">
<div class="card">
<card-header title="下载选项" description="下载源、线程限制、下载引擎设置" icon="download"></card-header>
<div class="card-body">
  <div>
    <div class="input input-list" id="version_isolation">
      <span class="name">下载引擎</span>
      <div class="input-data input-data-list" onclick="input_list(this,'80px')">
        <div></div>
        <ul class="option" style="display: none">
          <li class="option" onclick="set_input_list(this)">默认(aira2)</li>
          <li class="option" onclick="set_input_list(this)">Got</li>
          <div></div>
        </ul>
      </div>
    </div>
    <checkbox name="节流模式"></checkbox>
    <slider-bar name="最大线程数" max="256" min="1" step="1" config="globle.download.maxThreadNum"></slider-bar>
    <slider-bar name="最大下载速度(MB/s)" max="50" min="1" step="1" config="globle.download.maxDownloadSpeed"></slider-bar>
  </div>
</div>
</div>
</div>
    `,
    components: { cardHeader, checkbox, sliderBar },
};
