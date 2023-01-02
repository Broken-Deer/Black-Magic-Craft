import card from "../card.js";

export default {
    data() {
        return {
            maps: [
                { path: "", icon: `${this.path}/icon.png` },
                { path: "", icon: `${this.path}/icon.png` },
                { path: "", icon: `${this.path}/icon.png` },
            ], // path: 存档所在的绝对路径
        };
    },
    template: /* template */ `
    <div class="home-page" id="home_pg">
    <div>
      <div class="child-sidebar">
        <li class="active" onclick="sidebar_active(this, '597CE489')"><i class="house"></i>主页</li>

        <p>游戏</p>
        <ul class="gamelist" id="gamelist" onclick="sidebar_active(this, '4AA85CFD')">
          <li>
            <label>
              <input type="radio" name="gamelist">
              <img src="./assets/images/Grass_Block.webp">1.19.2-forge
            </label>
          </li>
        </ul>
      </div>
    </div>
    <div>
      <div id="597CE489" style="display: none;">
        <card title="新情报速递" :can-swap="true" :is-swaped="false" width="100%" height="100px"></card>
        <card title="最近游戏" :can-swap="true" :is-swaped="false" width="100%" height="100px"></card>
        <card title="所有游戏" :can-swap="true" :is-swaped="false" width="100%" height="100px"></card>
      </div>
      <div id="4AA85CFD">
        <div class="version-info card">
          <div>
            <div><img src="./assets/images/Grass_Block_JE2.webp">Minecraft 1.19.2</div>
          </div>
          <div>
            <p class="version-name">Minecraft 1.19.2</p>
            <div style="display: flex;flex-direction: row-reverse;align-items: center;">
              <div class="start-game"><i class="play"
                  style="font-family: 'fa-pro'; font-style: normal; margin-right: 5px; font-weight: 100;"></i>开始游戏
              </div>
              <i class="button gear"></i>
              <i class="button circle-info"></i>
              <i class="button star"></i>
            </div>
          </div>
        </div>
        <card margin="10,0,0,0" title="地图存档" description="创建了0个世界" icon="map" :is-swaped=true>
        <div v-for="map in maps" class="list-item"></div>
        </card>
        <card margin="10,0,0,0" title="模组" description="启用了0个模组" icon="puzzle-piece" :is-swaped=true></card>
        <card margin="10,0,0,0" title="资源包" description="启用了0个资源包" icon="palette" :is-swaped=true></card>
        <card margin="10,0,20,0" title="光影包" description="启用了0个光影包" icon="lightbulb-on" :is-swaped=true></card>
      </div>
    </div>
  </div>
  `,
    components: { card },
};
