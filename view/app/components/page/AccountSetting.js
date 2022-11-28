import inputText from "../inputText.js";
import checkbox from "../checkbox.js";
import cardHeader from "../cardHeader.js";
import commandButton from "../commandButton.js";
import inputColor from "../inputColor.js";

export default {
    template: /* html */ `
    <div id="A3FAE39B" style="display: none">
      <div class="card">
      <div class="card-body">
        <div>
          <p>如果你需要管理你的 Minecraft 帐户，请在「仪表盘」中操作</p>
        </div>
      </div>
    </div>
    <div class="card">
      <card-header title="Black Magic 帐户" description="管理你的 Black Magic 帐户" icon="user-tie"
        click="expanded_card(this, 116)">
      </card-header>
      <div class="card-body">
        <div class="user-data">
          <div>
            <img src="./assets/images/BrokenDeer.png" alt="你的头像">
            <div>
              <h2>Broken_Deer</h2>
              <p>V Me, We Are Poor</p>
              <p>Black Magic 帐户</p>
            </div>
          </div>
          <div>
            <button class="command-button" onclick="">退出登录</button>
          </div>
        </div>
      </div>
    </div>
    <div class="card">
      <card-header title="修改信息" description="修改你的 Black Magic 帐户信息" icon="pen-to-square"></card-header>
      <div class="card-body">
        <div>
          <input-text name="用户名"
            placeholder="Broken_Deer"></input-text>
            <input-text name="描述"
            placeholder="V Me, We Are Poor"></input-text>
            <command-button name="更改头像" text="选择文件"></command-button>
        </div>
      </div>
    </div>
    <div class="card not-expanded" style="border-color: #cf222e; color: #cf222e;">
      <card-header title="危险区" description="谨防误触" icon="triangle-exclamation"></card-header>
      <div class="card-body" style="height: 0;overflow: hidden;">
        <div style="color: #000;">
          <command-button name="删除你的 Black Magic 帐户" text="删除帐户"></command-button>
        </div>
      </div>
    </div>
    </div>`,
    components: { inputText, checkbox, cardHeader, commandButton, inputColor },
};
