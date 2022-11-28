import gameSetting from "./GameSetting.js";
import generalSetting from "./generalSetting.js";
import accountSetting from "./AccountSetting.js";
import advancedSetting from "./AdvancedSetting.js";
import appearanceSettings from "./AppearanceSettings.js";
import downloadSetting from "./DownloadSetting.js";
import easyuseSetting from "./EasyuseSetting.js";
export default {
    template: /* html */ `
    <div id="setting_pg" style="display: none">
        <div class="child-sidebar">
            <ul>
            <li class="active" onclick="sidebar_active(this, '09B2534F')"><i class="house"></i>常规</li>
            <li onclick="sidebar_active(this, 'AF3BE70D')"><i class="gamepad"></i>游戏</li>
            <li onclick="sidebar_active(this, 'A3FAE39B')"><i class="user"></i>帐户</li>
            <li onclick="sidebar_active(this, '489C5E28')"><i class="pro-settings"></i>高级</li>
            <li onclick="sidebar_active(this, '09C2A5F5')"><i class="palette"></i>个性化</li>
            <li onclick="sidebar_active(this, '7277F10D')"><i class="download"></i>下载</li>
            <li onclick="sidebar_active(this, '6783F38B')"><i class="arrows-spin"></i>辅助功能</li>
            </ul>
            <li onclick="backtoHome()" style="margin-bottom: 8px;"><i class="arrow-left"></i>返回</li>
        </div>
        <div class="rua">
            <game-setting></game-setting>
            <general-setting></general-setting>
            <account-setting></account-setting>
            <advanced-setting></advanced-setting>
            <appearance-settings></appearance-settings>
            <download-setting></download-setting>
            <easyuse-setting></easyuse-setting>
        </div>
    </div>`,
    components: {
        gameSetting,
        generalSetting,
        accountSetting,
        advancedSetting,
        appearanceSettings,
        downloadSetting,
        easyuseSetting,
    },
};
