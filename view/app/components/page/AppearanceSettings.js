import { inputText } from "../inputText.js";
import { checkbox } from "../checkbox.js";
import cardHeader from "../cardHeader.js";
import { commandButton } from "../commandButton.js";
import zh_cn from "../../onload.js";

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
      <command-button name="更改主题" text="选择已安装主题"></command-button>
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
        <p>即将到来</p>
    </div>
  </div>
</div>
  </div>
   
`,
    components: { inputText, checkbox, cardHeader, commandButton },
};
