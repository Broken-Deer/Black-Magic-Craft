import card from "../card.js";
import { listItem, listItemButton } from "../listItem.js";
import { checkboxMini } from "../checkbox.js";
export default {
    data() {
        return {
            saves: [
                { name: "新的世界", icon: "./assets/images/Unknown_server.webp", time: "2022/11/4 16:10:53" },
                { name: "新的世界", icon: "./assets/images/Unknown_server.webp", time: "2022/11/4 16:10:53" },
                { name: "新的世界", icon: "./assets/images/Unknown_server.webp", time: "2022/11/4 16:10:53" },
            ],
            mods: [
                {
                    name: "Fabric API",
                    description: "Core API module providing key hooks and intercompatibility features.",
                    icon: "./assets/images/Unknown_server.webp",
                },
                {
                    name: "Fabric API",
                    description: "Core API module providing key hooks and intercompatibility features.",
                    icon: "./assets/images/Unknown_server.webp",
                },
                {
                    name: "Fabric API",
                    description: "Core API module providing key hooks and intercompatibility features.",
                    icon: "./assets/images/Unknown_server.webp",
                },
                {
                    name: "Fabric API",
                    description: "Core API module providing key hooks and intercompatibility features.",
                    icon: "./assets/images/Unknown_server.webp",
                },
                {
                    name: "Fabric API",
                    description: "Core API module providing key hooks and intercompatibility features.",
                    icon: "./assets/images/Unknown_server.webp",
                },
            ],
            resourcepacks: [
                {
                    name: "32x32",
                    description: "Website > https://faithful.team Authors > Kraineff and Team",
                    icon: "./assets/images/pack.png",
                },
                {
                    name: "32x32",
                    description: "Website > https://faithful.team Authors > Kraineff and Team",
                    icon: "./assets/images/pack.png",
                },
                {
                    name: "32x32",
                    description: "Website > https://faithful.team Authors > Kraineff and Team",
                    icon: "./assets/images/pack.png",
                },
                {
                    name: "32x32",
                    description: "Website > https://faithful.team Authors > Kraineff and Team",
                    icon: "./assets/images/pack.png",
                },
                {
                    name: "32x32",
                    description: "Website > https://faithful.team Authors > Kraineff and Team",
                    icon: "./assets/images/pack.png",
                },
                {
                    name: "32x32",
                    description: "Website > https://faithful.team Authors > Kraineff and Team",
                    icon: "./assets/images/pack.png",
                },
                {
                    name: "32x32",
                    description: "Website > https://faithful.team Authors > Kraineff and Team",
                    icon: "./assets/images/pack.png",
                },
            ],
            shaderpacks: [
                {
                    name: 'ComplementaryShaders_v4.4.zip',
                    description: '"M:\\Minecraft\\.minecraft\\versions\\1.18.2\\shaderpacks\\ComplementaryShaders_v4.4.zip"'
                }
            ]
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
                  <img src="./assets/images/Grass_Block.webp">1.19.2-forge
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
              <card margin="10,0,0,0" title="地图存档" description="创建了0个世界" icon="map" :is-swaped="true" :can-swap="true"
                :padding="[16,20,16,20]">
                <list-item :logo="save.icon" :title="save.name" :description="save.time" v-for="save in saves">
                  <list-item-button icon="folders"></list-item-button>
                  <list-item-button icon="circle-info"></list-item-button>
                  <list-item-button icon="arrow-up-right-from-square"></list-item-button>
                </list-item>
              </card>
              <card margin="10,0,0,0" title="模组" description="启用了0个模组" icon="puzzle-piece" :is-swaped="true"
                :can-swap="true" :padding="[16,20,16,20]">
                <list-item :logo="mod.icon" :title="mod.name" :description="mod.description" v-for="mod in mods">
                <list-item-button icon="circle-info"></list-item-button>
                <list-item-button icon="folders"></list-item-button>
                <list-item-button icon="trash-can"></list-item-button>
                </list-item>
              </card>
              <card margin="10,0,0,0" title="资源包" description="启用了0个资源包" icon="palette" :is-swaped="true"
                :can-swap="true" :padding="[16,20,16,20]">
                <list-item :logo="resourcepack.icon" :title="resourcepack.name" :description="resourcepack.description" v-for="resourcepack in resourcepacks">
                <list-item-button icon="circle-info"></list-item-button>
                <list-item-button icon="folders"></list-item-button>
                <list-item-button icon="trash-can"></list-item-button>
              </list-item>
                </card>
              <card margin="10,0,20,0" title="光影包" description="启用了0个光影包" icon="lightbulb-on" :is-swaped="true" :can-swap="true" :padding="[16,20,16,20]">
              <list-item :title="shaderpack.name" v-for="shaderpack in shaderpacks">
              <list-item-button icon="circle-info"></list-item-button>
              <list-item-button icon="folders"></list-item-button>
              <list-item-button icon="trash-can"></list-item-button>
            </list-item>
              </card>
            </div>
          </div>
        </div>
  `,
    components: {
        card,
        listItem,
        listItemButton,
        checkboxMini,
    },
};
