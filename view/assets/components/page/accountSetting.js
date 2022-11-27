import inputText from "../inputText.js";
import checkbox from "../checkbox.js";
import cardHeader from "../cardHeader.js";
import commandButton from "../commandButton.js";
import inputColor from "../inputColor.js";

export default {
    template: /* html */ `
    <div id="A3FAE39B">
      <div class="card">
        <div class="card-body">
          <div>
            <p>Black Magic Craft 是一个实用、优雅、美观、开源的 Minecraft 启动器，由 Broken_Deer 用 ❤️ 制作，您的赞助将帮助 Black Magic Craft 获得更好的发展</p>
            <p style="margin-top: 5px;">Black Magic Craft 本体的所有内容都是免费的，但某些扩展可能会向你收取费用</p>
          </div>
        </div>
      </div>
      <div class="card">
        <card-header title="更新与安全" description="最新正式版 上次检查时间: 2022/11/27 18:03" icon="arrows-rotate">
        </card-header>
        <div class="card-body">
          <div>
            <checkbox name="使用预览版启动器"></checkbox>
            <checkbox name="自动更新" chek="checked"></checkbox>
            <checkbox name="检查更新时同时检查扩展更新" chek="checked"></checkbox>
            <checkbox name="有重大安全更新时自动更新" chek="checked"></checkbox>
            <command-button name="立即检查更新" text="检查更新"></command-button>
          </div>
        </div>
      </div>
    </div>`,
    components: { inputText, checkbox, cardHeader, commandButton, inputColor },
};
