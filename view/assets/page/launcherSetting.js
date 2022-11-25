import inputText from "../components/inputText.js";
import checkbox from "../components/checkbox.js";
import cardHeader from "../components/cardHeader.js";
import commandButton from "../components/commandButton.js";
import inputColor from "../components/inputColor.js";

export default {
    template: /* html */ `
        <div id="l_setting_pg" style="display: none">
            <div class="page-title">启动器设置</div>
            <div class="card">
            <card-header title="更新" description="配置启动器更新选项" icon="arrows-rotate"></card-header>
            <div class="card-body">
              <div>
                <checkbox name="使用预览版启动器"></checkbox>
                <checkbox name="自动更新"></checkbox>
                <checkbox name="检查更新时同时检查插件是否有更新"></checkbox>
                <command-button name="立即检查更新" text="检查更新"></command-button>
              </div>
            </div>
          </div>
          <div class="card">
            <card-header title="个性化" description="设置启动器外观" icon="paintbrush"></card-header>
            <div class="card-body">
              <div>
                <div class="input input-list" id="version_isolation">
                  <span class="name">主题</span>
                  <div class="input-data input-data-list" onclick="input_list(this,'156px')">
                    <div></div>
                    <ul class="option" style="display: none">
                      <li class="option" onclick="set_input_list(this)">平滑</li>
                      <li class="option" onclick="set_input_list(this)">方形</li>
                      <li class="option" onclick="set_input_list(this)">复古</li>
                      <li class="option" onclick="set_input_list(this)">官方启动器</li>
                      <li class="option" onclick="set_input_list(this)">Windows 11</li>
                      <div></div>
                    </ul>
                  </div>
                </div>
                <input-color name="主题色"></input-color>
                <div class="input input-list" id="version_isolation">
                  <span class="name">背景</span>
                  <div class="input-data input-data-list" onclick="input_list(this,'156px')">
                    <div></div>
                    <ul class="option" style="display: none">
                      <li class="option" onclick="set_input_list(this)">主题色</li>
                      <li class="option" onclick="set_input_list(this)">渐变</li>
                      <li class="option" onclick="set_input_list(this)">图片</li>
                      <li class="option" onclick="set_input_list(this)">必应每日一图</li>
                      <li class="option" onclick="set_input_list(this)">自定义</li>
                      <div></div>
                    </ul>
                  </div>
                </div>
                <input-text name="字体"></input-text>
              </div>
            </div>
          </div>
        </div>`,
    components: { inputText, checkbox, cardHeader, commandButton, inputColor },
};
