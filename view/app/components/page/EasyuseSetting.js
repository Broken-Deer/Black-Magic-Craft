import checkbox from "../checkbox.js";
import cardHeader from "../cardHeader.js";
import { load, update } from "../../tools/LoadConfigs.js";

export default {
    data() {
        var confA = [
            { id: 1, text: "特别慢" },
            { id: 2, text: "慢" },
            { id: 3, text: "正常" },
            { id: 4, text: "快" },
            { id: 5, text: "特别快" },
        ];
        if (typeof load("globle.accessibility.AnimationSpeed") == "number") {
            return {
                configA: confA[load("globle.accessibility.AnimationSpeed") - 1]["text"],
                configItemsA: confA,
            };
        } else {
            return {
                configA: confA[3 - 1]["text"],
                configItemsA: confA,
            };
        }
    },
    template: /* html */ `
    <div id="6783F38B" style="display:none">
    <div class="card">
    <card-header title="辅助功能" description="使你的启动器更易于使用" icon="hand"></card-header>
    <div class="card-body">
      <div>
        <checkbox name="正式版更新提示"></checkbox>
        <checkbox name="快照版更新提示"></checkbox>
        <checkbox name="默认设置为系统语言"></checkbox>
        <div class="input input-list" id="version_isolation">
          <span class="name">动画速度</span>
          <div class="input-data input-data-list" onclick="input_list(this,'158px')">
            <div>{{configA}}</div>
            <ul class="option" style="display: none">
              <li v-for="(item,index) in configItemsA" class="option" onclick="set_input_list(this);" @click="updateData('globle.accessibility.AnimationSpeed', item.id)">{{item.text}}</li>
              <div></div>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="card">
    <card-header title="无障碍" description="无障碍功能优化" icon="wheelchair"></card-header>
    <div class="card-body">
      <div>
        <checkbox name="禁用所有动画"></checkbox>
        <checkbox name="为屏幕阅读器优化"></checkbox>
        <checkbox name="高对比度模式"></checkbox>
      </div>
    </div>
  </div>
    </div>
 
    `,
    components: { checkbox, cardHeader },
    computed: {},
    methods: {
        updateData(key, val) {
            update(key, val);
        },
    },
};
