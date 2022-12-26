import card from "../card.js";

export default {
    template: /* html */ `
    <div class="home-page" id="home_pg">
    <div>
      <div class="child-sidebar">
        <ul id="507CD429"><li class="active" onclick="sidebar_active(this, '597CE489','gamelist')"><i class="house"></i>主页</li></ul>
        <p>游戏</p>
        <ul class="gamelist" id="gamelist">
          
        </ul>
      </div>
    </div>
    <div id="597CE489">
      <card title="新情报速递" :can-swap="true" :is-swaped="false" width="100%" height="100px"></card>
      <card title="最近游戏" :can-swap="true" :is-swaped="false" width="100%" height="100px"></card>
      <card title="所有游戏" :can-swap="true" :is-swaped="false" width="100%" height="100px"></card>
    </div>
    <div id="4AA85CFD">
    </div>
  </div>
  `,
    components: { card },
};
