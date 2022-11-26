import inputText from "../inputText.js";
import checkbox from "../checkbox.js";
import cardHeader from "../cardHeader.js";
import commandButton from "../commandButton.js";
import inputColor from "../inputColor.js";

export default {
    template: /* html */ `
        <div id="l_setting_pg" style="display: none">
          <div class="child-sidebar">
            <ul>
              <li class="active" onclick="sidebar_active(this)"><i class="rectangle-terminal"></i>自动安装</li>
              <li onclick="sidebar_active(this)"><i class="screwdriver-wrench"></i>手动安装</li>
              <li onclick="sidebar_active(this)"><i class="folders"></i>导入整合包</li>
            </ul>
          </div>
          <div class="rua">
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
          </div>

        </div>`,
    components: { inputText, checkbox, cardHeader, commandButton, inputColor },
};
