import inputText from "../inputText.js";
import checkbox from "../checkbox.js";
import cardHeader from "../cardHeader.js";
import commandButton from "../commandButton.js";

export default {
    template: /* html */ `
    <div id="09B2534F">
      <div class="card">
        <div class="card-body">
          <div>
            <p>Black Magic Craft 是一个优雅、开源、可扩展的 Minecraft 启动器，由 Broken_Deer 用 ❤️ 制作，您的赞助将帮助 Black Magic Craft 获得更好的发展</p>
            <p>Black Magic Craft <strong>本体</strong>的所有内容都是免费的，插件则按照插件作者的要求。插件作者收取的费用与 Black Magic Craft 无关</p>
          </div>
        </div>
      </div>
      <div class="card">
        <card-header title="更新与安全" description="最新正式版 上次检查时间: 2022/11/27 18:03" icon="arrows-rotate">
        </card-header>
        <div class="card-body">
          <div>
            <checkbox name="使用预览版启动器" config="globle.update.beta"></checkbox>
            <checkbox name="自动更新" config="globle.update.auto"></checkbox>
            <checkbox name="检查更新时同时检查扩展更新" config="globle.update.ext"></checkbox>
            <checkbox name="有重大安全更新时自动更新" config="globle.update.safe"></checkbox>
            <command-button name="立即检查更新" text="检查更新"></command-button>
          </div>
        </div>
      </div>
    </div>`,
    components: { inputText, checkbox, cardHeader, commandButton },
};