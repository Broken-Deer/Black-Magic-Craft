import gameSetting from "./gameSetting.js";
import generalSetting from "./generalSetting.js";

export default {
    template: /* html */ `
    <div id="setting_pg" style="display: none">
        <div class="child-sidebar">
            <ul>
            <li class="active" onclick="sidebar_active(this, '09B2534F')"><i class="house"></i>基本</li>
            <li onclick="sidebar_active(this, 'AF3BE70D')"><i class="gamepad"></i>游戏</li>
            <li onclick="sidebar_active(this, '')"><i class="user"></i>帐户</li>
            <li onclick="sidebar_active(this)"><i class="pro-settings"></i>高级</li>
            <li onclick="sidebar_active(this)"><i class="palette"></i>个性化</li>
            <li onclick="sidebar_active(this)"><i class="download"></i>下载</li>
            <li onclick="sidebar_active(this)"><i class="wheelchair"></i>辅助功能</li>
            </ul>
            <li onclick="backtoHome()" style="margin-bottom: 8px;"><i class="arrow-left"></i>返回</li>
        </div>
        <div class="rua">
            <game-setting></game-setting>
            <general-setting></general-setting>
        </div>
    </div>`,
    components: { gameSetting, generalSetting },
};
