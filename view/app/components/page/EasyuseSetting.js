import checkbox from "../checkbox.js";
import cardHeader from "../cardHeader.js";

export default {
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
            <div>正常</div>
            <ul class="option" style="display: none">
              <li class="option" onclick="set_input_list(this)">特别快</li>
              <li class="option" onclick="set_input_list(this)">快</li>
              <li class="option" onclick="set_input_list(this)">正常</li>
              <li class="option" onclick="set_input_list(this)">慢</li>
              <li class="option" onclick="set_input_list(this)">特别慢</li>
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
};
