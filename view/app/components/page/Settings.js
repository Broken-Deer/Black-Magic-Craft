import gameSetting from "./GameSetting.js";
import generalSetting from "./GeneralSetting.js";
import accountSetting from "./AccountSetting.js";
import advancedSetting from "./AdvancedSetting.js";
import appearanceSettings from "./AppearanceSettings.js";
import downloadSetting from "./DownloadSetting.js";
import easyuseSetting from "./EasyuseSetting.js";
import sidebar from "../sidebar.js";

export default {
    data() {
        return {
            activeComponent: 'generalSetting'
        }
    },
    template: /* html */ `
    <div id="setting_pg" class="settings">
        <div class="child-sidebar">
            <ul>
            <li class="active" @click="setActiveComponent($event,'generalSetting')"><i class="house"></i>常规</li>
            <li @click="setActiveComponent($event,'gameSetting')"><i class="gamepad"></i>游戏</li>
            <li @click="setActiveComponent($event,'accountSetting')"><i class="user"></i>帐户</li>
            <li @click="setActiveComponent($event,'advancedSetting')"><i class="pro-settings"></i>高级</li>
            <li @click="setActiveComponent($event,'appearanceSettings')"><i class="palette"></i>个性化</li>
            <li @click="setActiveComponent($event,'downloadSetting')"><i class="download"></i>下载</li>
            <li @click="setActiveComponent($event,'easyuseSetting')"><i class="arrows-spin"></i>辅助功能</li>
            </ul>
            <li @click="backtoHome" style="margin-bottom: -9px;" class="backtoHome"><i class="arrow-left"></i>返回</li>
        </div>
        <div class="rua">
        <Transition name="page-winui" mode="out-in">
        <component :is="activeComponent"></component>
        </Transition>
        </div>
    </div>`,
    methods: {
        setActiveComponent(el, componentName) {
            el = el.currentTarget
            setTimeout(() => {
                $(el.parentNode.parentNode.parentNode.lastElementChild).scrollTop(0);
            }, 100);
            $(el).siblings().removeClass("active");
            $(el).addClass("active");
            this.activeComponent = componentName
        },
        backtoHome() {
            sidebar.methods.changePage(null, 'WareHouse')
        }
    },
    components: {
        generalSetting,
        gameSetting,
        accountSetting,
        advancedSetting,
        appearanceSettings,
        downloadSetting,
        easyuseSetting,
    },
};
/* 

            <game-setting></game-setting>
            <general-setting></general-setting>
            <account-setting></account-setting>
            <advanced-setting></advanced-setting>
            <appearance-settings></appearance-settings>
            <download-setting></download-setting>
            <easyuse-setting></easyuse-setting> */