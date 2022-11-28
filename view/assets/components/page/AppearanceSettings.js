import inputText from "../inputText.js";
import checkbox from "../checkbox.js";
import cardHeader from "../cardHeader.js";
import commandButton from "../commandButton.js";
import inputColor from "../inputColor.js";
import zh_cn from "../../scripts/onload.js";

export default {
    data() {
        return zh_cn;
    },
    template: /* html */ `
  <div id="09C2A5F5" style="display: none">
  <div class="card">
  <card-header title="主题" description="更改主题、加载自定义主题" icon="brush"></card-header>
  <div class="card-body">
    <div>
      <div class="input input-list" id="version_isolation">
        <span class="name">更改主题</span>
        <div class="input-data input-data-list" onclick="input_list(this,'156px')">
          <div></div>
          <ul class="option" style="display: none">
            <li class="option" onclick="set_input_list(this)">默认</li>
            <li class="option" onclick="set_input_list(this)">方形</li>
            <li class="option" onclick="set_input_list(this)">Minecraft</li>
            <li class="option" onclick="set_input_list(this)">Minecraft launcher</li>
            <li class="option" onclick="set_input_list(this)">Windows 98</li>
            <li class="option" onclick="set_input_list(this)">从文件加载</li>
            <div></div>
          </ul>
        </div>
      </div>
      <command-button name="安装新主题" text="转到「市场」"></command-button>
      <command-button name="打开自定义主题文件夹" text="打开"></command-button>
      <command-button name="主题色" text="更改" click="popup_window('color_chooser')"></command-button>
    </div>
  </div>
</div>
<div class="card">
  <card-header title="背景" description="修改背景图像" icon="window-flip"></card-header>
  <div class="card-body">
    <div>
      <div class="input input-list" id="version_isolation">
        <span class="name">背景类型</span>
        <div class="input-data input-data-list" onclick="input_list(this,'106px')">
          <div></div>
          <ul class="option" style="display: none">
            <li class="option" onclick="set_input_list(this)">纯色</li>
            <li class="option" onclick="set_input_list(this)">渐变</li>
            <li class="option" onclick="set_input_list(this)">图像</li>
            <div></div>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>
  </div>
   
`,
    components: { inputText, checkbox, cardHeader, commandButton, inputColor },
};
