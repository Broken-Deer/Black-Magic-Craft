import card from "../card.js"

export default {
    template: /* html */`
    <div class="home-page" id="home_pg">
    <div>
      <div class="child-sidebar">
        <li class="active"><i class="house"></i>主页</li>
        <p>库</p>
        <ul class="gamelist" id="gamelist">
          
        </ul>
      </div>
    </div>
    <div>
      <card title="新情报速递" :can-swap="true" :is-swaped="false" width="100%" height="100px"></card>
      <card title="最近游戏" :can-swap="true" :is-swaped="false" width="100%" height="100px"></card>
      <card title="所有游戏" :can-swap="true" :is-swaped="false" width="100%" height="100px"></card>
    </div>

  </div>
  `,
  components: { card }
}