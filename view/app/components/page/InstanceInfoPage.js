import card from "../card.js"
import { listItem, listItemButton } from "../listItem.js"

export default {
    data() {
        return {
            instanceName: 'a',
            nosave: false,
            nomod: false,
            resourcepacks: [
                {
                    name: "32x32",
                    description: "Website > https://faithful.team Authors > Kraineff and Team",
                    icon: "./assets/images/pack.png",
                },
            ],
            nores: false,
            shaderpacks: [
                {
                    name: "ComplementaryShaders_v4.4.zip",
                    description:
                        '"M:\\Minecraft\\.minecraft\\versions\\1.18.2\\shaderpacks\\ComplementaryShaders_v4.4.zip"',
                },
            ],
            noshader: false,
        }
    },
    template: /* template */`
    <div>
    <div class="version-info card">
        <div>
            <div><img src="./assets/images/Grass_Block_JE2.webp">{{instanceInfo.minecraftVersion}}</div>
        </div>
        <div>
            <p class="version-name">{{instanceInfo.instanceName}}</p>
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
    <card margin="10,0,0,0" title="地图存档" :description="savesCount" icon="map" :is-swaped="true" :can-swap="true"
        :padding="[16,20,16,20]">
        <ul class="in-card show-scroolbar" v-if="!this.instanceInfo.savesIsLoading">
            
        <list-item :logo="save.icon" :title="save.name" :description="save.time" v-for="save in saves" :key="save">
        <list-item-button icon="folders"></list-item-button>
        <list-item-button icon="circle-info"></list-item-button>
        <list-item-button icon="arrow-up-right-from-square"></list-item-button>
        </list-item>
        </ul>
       
        <p class="text-center text-gray text-italic" v-if="this.instanceInfo.nosave && !this.instanceInfo.savesIsLoading">此视图筛选条件无匹配结果</p>
        <p class="text-center text-gray text-italic" v-if="this.instanceInfo.savesIsLoading">正在加载...</p>
    </card>
    <card margin="10,0,0,0" title="模组" :description="modsCount" icon="puzzle-piece" :is-swaped="true" :can-swap="true"
        :padding="[16,20,16,20]">
        <ul class="in-card show-scroolbar" v-if="!this.instanceInfo.modsIsLoading">
            <list-item :logo="mod.icon" :title="mod.name" :description="mod.description" v-for="mod in mods" :key="mod">
                <list-item-button icon="circle-info"></list-item-button>
                <list-item-button icon="folders"></list-item-button>
                <list-item-button icon="trash-can"></list-item-button>
            </list-item>
            </ul>
            <p class="text-center text-gray text-italic" v-if="this.instanceInfo.nomod && !this.instanceInfo.modsIsLoading">此视图筛选条件无匹配结果</p>
            <p class="text-center text-gray text-italic" v-if="this.instanceInfo.modsIsLoading">正在加载...</p>
    </card>
    <card margin="10,0,0,0" title="资源包" :description="resourcepacksCount" icon="palette" :is-swaped="true" :can-swap="true"
        :padding="[16,20,16,20]" >
        <ul class="in-card show-scroolbar">
            <list-item :logo="resourcepack.icon" :title="resourcepack.name" :description="resourcepack.description"
                v-for="resourcepack in resourcepacks" :key="resourcepack">
                <list-item-button icon="circle-info"></list-item-button>
                <list-item-button icon="folders"></list-item-button>
                <list-item-button icon="trash-can"></list-item-button>
            </list-item>
            </ul>
        <p class="text-center text-gray text-italic" v-if="this.instanceInfo.noresourcepack">此视图筛选条件无匹配结果</p>
    </card>
    <card margin="10,0,20,0" title="光影包" :description="shaderpacksCount" icon="lightbulb-on" :is-swaped="true" :can-swap="true"
        :padding="[16,20,16,20]">
        <ul class="in-card show-scroolbar">
       <list-item :title="shaderpack.name" v-for="shaderpack in shaderpacks"
                :key="shaderpack">
                <list-item-button icon="circle-info"></list-item-button>
                <list-item-button icon="folders"></list-item-button>
                <list-item-button icon="trash-can"></list-item-button>
            </list-item>
            </ul>
        <p class="text-center text-gray text-italic" v-if="this.instanceInfo.noshaderpack">此视图筛选条件无匹配结果</p>
    </card>
</div>
    `,
    props: {
        saves: Array,
        mods: Array,
        instanceInfo: Object
    },
    components: {
        listItemButton,
        listItem,
        card
    },
    computed: {
        savesCount() {
            if (this.instanceInfo.savesIsLoading) {
                return '正在加载...'
            }
            return `创建了${this.saves.length}个世界`
        },
        modsCount() {
            if (this.instanceInfo.modsIsLoading) {
                return '正在加载...'
            }
            return `启用了${this.mods.length}个模组`
        },
        resourcepacksCount() {
            if (this.instanceInfo.resourcepacksIsLoading) {
                return '正在加载...'
            }
            return `启用了${this.resourcepacks.length}个资源包`
        },
        shaderpacksCount() {
            if (this.instanceInfo.shaderpacksIsLoading) {
                return '正在加载...'
            }
            return `启用了${this.shaderpacks.length}个光影包`
        }
    }
}