/*
 * Black Magic Launcher
 * Copyright (C) 2022-2023 Broken_Deer <old_driver__@outlook.com> and contributors
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import { inputText } from "./components/controller/inputText.js";
import { checkbox } from "./components/controller/checkbox.js";
import cardHeader from "./components/cardHeader.js";
import loading from "./components/loading.js";
import { commandButton, commandButtonMini } from "./components/commandButton.js";
import sidebarItem from "./components/sidebarItem.js";
import sliderBar from "./components/controller/sliderBar.js";
import card from "./components/card.js";
import { listItem, listItemButton } from "./components/listItem.js";

import WareHouse from "./components/page/WareHouse.js";
import downloadPage from "./components/page/DownloadPage.js";
import settings from "./components/page/Settings.js";

import sidebar from "./components/sidebar.js";
import colorChooser from "./components/window/colorChooser.js";
import gameInstall from "./components/window/gameInstall.js";
import msLogin from "./components/window/msLogin.js";

var zh_cn = {
    ui: {
        global_settings: {
            title: "全局游戏设置",
            java_path_title: "Java 路径",
            java_path: "选择 Java 路径",
            java_path_description: "自定义游戏运行所需Java的位置",
            auto_choose_java: "自动选择合适的 Java",
            launch_options_title: "启动选项",
            launch_options_description: "自定义游戏启动行为",
            game_window_title: "游戏窗口标题",
            game_window_title_placeholder: "默认",
            customize_launcher_info: "自定义启动器信息",
            customize_launcher_info_placeholder: "默认",
            server_address: "服务器地址",
            server_address_placeholder: "启动游戏后将自动进入此服务器",
            process_priority: "进程优先级",
            process_priority_highest: "最高",
            process_priority_higher: "较高",
            process_priority_medium: "中",
            process_priority_lower: "较低",
            process_priority_minimum: "最低",
            window_size: "窗口大小",
            window_width: "宽",
            window_height: "高",
            automatic_memory_allocation: "自动分配内存",
            game_memory: "游戏内存",
            advanced_settings: "高级设置",
            advanced_settings_description: "自定义启动命令",
            game_parameters: "游戏参数",
            game_parameters_placeholder: "默认",
            exec_before_starting: "启动前执行",
            exec_before_starting_placeholder: "在游戏启动前执行",
            wrap_command: "包装命令",
            wrap_command_placeholder: "会自动添加至启动命令前方",
            exec_after_starting: "启动后执行",
            exec_after_starting_placeholder: "在游戏启动后执行",
            jvm_parameters: "Java 虚拟机参数",
            jvm_parameters_placeholder: "填写此字段以覆盖默认设置",
            memory_persistence_area: "内存永久保存区域",
            memory_persistence_area_placeholder: "填写整数（单位 MB）",
            debugging_options: "调试选项",
            debugging_options_description: "如果你不知道这些选项的作用，请不要乱动它们！",
            lwjgl: "本地库路径 (LWJGL)",
            lwjgl_placeholder: "默认由启动器提供，填写此选项以自定义游戏需要的本地库",
            dont_check_jvm_parameters: "不检查默认的 JVM 参数",
            dont_check_assets_files: "不检查资源文件完整性",
            dont_check_JVM_compatibility: "不检查 JVM 与游戏的兼容性",
            use_system_GLFW: "[Linux] 使用系统GLFW",
            use_system_OpenAL: "[Linux] 使用系统OpenAL",
            dev_tools: "启动 Developer Tools",
            dev_tools_btn: "启动",
        },
        launcher_settings: {
            general: {
                title: "常规",
                description: "启动器基本设置",
            },
        },
    },
};
export default zh_cn;
$(document).ready(function () {
    ipc.send('dcl')
});
window.onload = () => {
    /*     $("#2B39A329").click(function () {
        const a = document.querySelectorAll(".crafting_table");
        const b = document.querySelectorAll(".ancient_debris");
        if ($("#2B39A329").prop("checked")) {
            $(a).removeClass("dispnone");
            $(b).removeClass("dispnone");
        } else {
            $(a).addClass("dispnone");
            $(b).addClass("dispnone");
        }
    }); */
    $("#win").attr(
        "style",
        "transform: scale(1); opacity: 1; transition: all 250ms cubic-bezier(0.04, 0.47, 0.47, 0.98)"
    );
    console.log(`
     ___  __         __       __  ___          _         __                      __          
    / _ )/ /__ _____/ /__    /  |/  /__ ____ _(_)___    / /  ___ ___ _____  ____/ /  ___ ____        
   / _  / / _ \`/ __/  '_/   / /|_/ / _ \`/ _ \`/ / __/   / /__/ _ \`/ // / _ \\/ __/ _ \\/ -_) __/    
  /____/_/\\_,_/\\__/_/\\_\\   /_/  /_/\\_,_/\\_, /_/\\__/   /____/\\_,_/\\_,_/_//_/\\__/_//_/\\__/_/       
                                       /___/                    
    Black Magic Launcher v1.0.0-b1                               由 Broken_Deer 用 ❤️ 制作
  `);
    ipc.send('onload')
    ipc.send('event-obj')
};
/* updateGamelist();
setInterval(() => {
    try {
        updateGamelist();
    } catch (e) {}
}, 500); */

Vue.createApp({
    data() {
        return zh_cn;
    },
    components: {
        card,
        inputText,
        checkbox,
        cardHeader,
        loading,
        commandButton,
        sidebarItem,
        sliderBar,
        commandButtonMini,
        listItem,
        listItemButton,
    },
}).mount("#win");

Vue.createApp({
    template: /* template */ `
<sidebar></sidebar>
    `,
    components: { sidebar }
}).mount(".sidebar-links");
export const page = Vue.createApp({
    data() {
        return {
            transitionName: 'page-winui',
            activeComponent: 'WareHouse',
        }
    },
    template: `
    <Transition :name="transitionName" mode="out-in">
        <component :is="activeComponent"></component>
    </Transition>
        `,
    components: { downloadPage, settings, WareHouse },
}).mount("#main");
Vue.createApp({
    template: /* template */ `
<ms-login></ms-login>
<game-install></game-install>
<color-chooser></color-chooser>
`,
    components: {
        msLogin,
        gameInstall,
        colorChooser,
    },
}).mount(".dialogs");


