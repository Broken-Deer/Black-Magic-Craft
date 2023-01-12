import { inputText } from "../controller/inputText.js";
import { checkbox } from "../controller/checkbox.js";
import cardHeader from "../cardHeader.js";
import { commandButton } from "../commandButton.js";
import { load, update } from "../../LoadConfigs.js";
import card from "../card.js";

export default {
    data() {
        var confA = [
            { id: 1, text: "默认(自动选择)" },
            { id: 2, text: "SerialGC" },
            { id: 3, text: "ParallelGC" },
            { id: 4, text: "G1GC" },
            { id: 5, text: "ZGC" },
        ];
        if (typeof load("globle.advanced.gc") == "number") {
            return {
                configA: confA[load("globle.advanced.gc") - 1]["text"],
                configItemsA: confA,
            };
        } else {
            return {
                configA: confA[0]["text"],
                configItemsA: confA,
            };
        }
    },
    template: /* html */ `
    <div id="489C5E28">
    <card :card-header=false>
    <p>如果你不清楚这些选项的作用，请不要乱动它们。你可以使用右上角的重置按钮将此页设置恢复为默认值</p>
    </card>
    <card title="高级设置" description="自定义游戏启动行为" icon="pro-settings">
    <checkbox name="检查游戏库文件完整性" config="globle.advanced.checklib"></checkbox>
    <div class="input input-list" id="version_isolation">
        <!-- Inspired by BakaXL -->
        <span class="name">Java 垃圾回收器</span>
        <div class="input-data input-data-list" onclick="input_list(this,'158px')">
            <div></div>
            <ul class="option" style="display: none">
                <li v-for="(item,index) in configItemsA" class="option" onclick="set_input_list(this);"
                    @click="updateData('globle.advanced.gc', item.id)">{{item.text}}</li>
                <div></div>
            </ul>
        </div>
    </div>
</card>
<card title="调试选项" description="这些设置只用于调试" icon="debug-settings">
    <checkbox name="将启动器日志保存到文件" config="globle.advanced.savelog"></checkbox>
    <command-button name="导出启动器日志" text="导出"></command-button>
    <command-button name="打开开发人员工具" text="启动 DevTools" @click="OpenDevtools"></command-button>
</card>
    </div>`,
    components: { inputText, checkbox, cardHeader, commandButton, card },
    methods: {
        updateData(key, val) {
            update(key, val);
        },
        OpenDevtools() {
            ipc.send('OpenDevTools')
        }
    },
};
