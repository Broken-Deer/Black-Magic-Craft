import cardHeader from "../cardHeader.js";
import checkbox from "../checkbox.js";

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
    <div class="input input-text">
      <span class="name">最大线程数</span>
      <div style="display: flex; line-height: 1.7">
        <div class="slider">
          <div class="orbit">
            <div></div>
          </div>
          <div class="slider_btn" id="D3FCE504">
            <div></div>
          </div>
        </div>
        <div class="input-data mini">
          <input type="text" id="1CFC2233" title="最大线程数" placeholder=""
            required />
          <div class="underline"></div>
        </div>
      </div>
    </div>
    <div class="input input-text">
      <span class="name">最大下载速度</span>
      <div style="display: flex; line-height: 1.7">
        <div class="slider">
          <div class="orbit">
            <div></div>
          </div>
          <div class="slider_btn" id="42B168E1">
            <div></div>
          </div>
        </div>
        <div class="input-data mini">
          <input type="text" id="B51A8693" title="最大下载速度" placeholder=""
            required />
          <div class="underline"></div>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
</div>
    `,
    components: { cardHeader, checkbox },
};