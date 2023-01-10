import loading from "../loading.js";
import { checkbox } from "../controller/checkbox.js";
import { commandButton, commandButtonMini } from "../commandButton.js";

export default {
    template: /* html */ `
        <div id="download_pg">
          <div class="child-sidebar">
            <ul>
              <li class="active" onclick="sidebar_active(this)"><i class="rectangle-terminal"></i>自动安装</li>
              <li onclick="sidebar_active(this)"><i class="screwdriver-wrench"></i>手动安装</li>
              <li onclick="sidebar_active(this)"><i class="folders"></i>导入整合包</li>
            </ul>
          </div>
          <div class="rua">
            <div class="card">
              <div class="card-body">
                <checkbox name="显示远古版、快照版" id="2B39A329" id2="5D4CBB91" chek="checked"></checkbox>
              </div>
            </div>
            <div style="opacity: 1;" id="B9C498C7">
              <span>正在加载版本列表</span>
              <loading></loading>
            </div>
            <ul class="list disposable" id="_version_list" style="max-height: 0">
            </ul>
          </div>
        </div>
`,
    components: { loading, checkbox, commandButton, commandButtonMini },
};
