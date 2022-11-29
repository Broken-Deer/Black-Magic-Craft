import inputText from "./components/inputText.js";
import checkbox from "./components/checkbox.js";
import cardHeader from "./components/cardHeader.js";
import loading from "./components/loading.js";
import commandButton from "./components/commandButton.js";
import sidebarItem from "./components/sidebarItem.js";

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
export default zh_cn

window.onload = function () {
    $("body").attr("style", "transform: scale(1); opacity: 1; transition: transform .4s ease, opacity .4s ease");
    $("#2B39A329").click(function () {
        const a = document.querySelectorAll(".crafting_table");
        const b = document.querySelectorAll(".ancient_debris");
        if ($("#2B39A329").prop("checked")) {
            $(a).removeClass("dispnone");
            $(b).removeClass("dispnone");
        } else {
            $(a).addClass("dispnone");
            $(b).addClass("dispnone");
        }
    });
    const btns = document.querySelectorAll(".btn_");
    btns.forEach((btn) => {
        btn.addEventListener("mousedown", (e) => {
            var a = btn.getAttribute("style");
            btn.setAttribute("style", "pointer-events:none; cursor: default;");
            let span = document.createElement("span");
            span.style.left = e.offsetX + "px";
            span.style.top = e.offsetY + "px";
            btn.appendChild(span);
            setTimeout(() => {
                span.remove();
                btn.setAttribute("style", a);
            }, 500);
        });
    });

};
document.addEventListener("DOMContentLoaded", () => {});
Vue.createApp({
    data() {
        return zh_cn;
    },
    components: {
        inputText,
        checkbox,
        cardHeader,
        loading,
        commandButton,
        sidebarItem
    },
}).mount("#win");
Vue.createApp({
    template: /* html */ `
    <sidebar></sidebar>
    `,
    components: { sidebar },
}).mount(".sidebar-links");
Vue.createApp({
    template: `
        <download-page></download-page>
        <settings></settings>
        `,
    components: { downloadPage, settings },
}).mount("#main");
Vue.createApp({
    template: /* html */ `
<ms-login></ms-login>
<game-install></game-install>
<color-chooser></color-chooser>
`,
    components: {
        msLogin,
        gameInstall,
        colorChooser,
    },
}).mount(".dont_display");


slider("CA028F76", "memory_value", 128, 16384);
slider('D3FCE504','1CFC2233', 1, 256)
slider('42B168E1', 'B51A8693', 1, 50)

