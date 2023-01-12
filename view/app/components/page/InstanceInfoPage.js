import card from "../card.js"
import { listItem, listItemButton } from "../listItem.js"
import cardCommandButton from "../cardCommandButton.js"

export default {
    data() {
        return {
            instanceName: '',
            downloading: '',
            faild: false
        }
    },
    template: /* template */`
    <div>
    <div class="version-info card" :style="banner">
        <div>
            <div><img src="./assets/images/Grass_Block_JE2.webp">{{instanceInfo.minecraftVersion}}{{downloading}}</div>
        </div>
        <div>
            <p class="version-name">{{instanceInfo.instanceName}}</p>
            <div style="display: flex;flex-direction: row-reverse;align-items: center;">
            <div v-if="faild">
                <div class="download-faild" @click="installGame"><i class="xmark-large"
                style="font-family: 'fa-pro'; font-style: normal; margin-right: 5px; font-weight: 100;"></i>安装失败
                </div>
            </div>
            <div v-else>
                <div class="start-game" v-if="instanceInfo.installed" @click="launchGame"><i class="play"
                style="font-family: 'fa-pro'; font-style: normal; margin-right: 5px; font-weight: 100;"></i>开始游戏
                </div>
                <div class="install-game" v-else @click="installGame"><i class="download"
                style="font-family: 'fa-pro'; font-style: normal; margin-right: 5px; font-weight: 400;"></i>安装
                </div>
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
        <list-item :logo="save.icon" :title="save.name" :description="save.description" v-for="save in saves" :key="save">
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
        <ul class="in-card show-scroolbar" v-if="!this.instanceInfo.resourcepacksIsLoading">
            <list-item :logo="resourcepack.icon" :title="resourcepack.name" :description="resourcepack.description"
                v-for="resourcepack in resourcepacks" :key="resourcepack">
                <list-item-button icon="circle-info"></list-item-button>
                <list-item-button icon="folders"></list-item-button>
                <list-item-button icon="trash-can"></list-item-button>
            </list-item>
            </ul>
            <p class="text-center text-gray text-italic" v-if="this.instanceInfo.noresourcepack && !this.instanceInfo.resourcepacksIsLoading">此视图筛选条件无匹配结果</p>
            <p class="text-center text-gray text-italic" v-if="this.instanceInfo.resourcepacksIsLoading">正在加载...</p>
    </card>
    <card margin="10,0,20,0" title="光影包" :description="shaderpacksCount" icon="lightbulb-on" :is-swaped="true" :can-swap="true"
        :padding="[16,20,16,20]">
        <ul class="in-card show-scroolbar" v-if="!this.instanceInfo.shaderpacksIsLoading">
       <list-item :title="shaderpack.name" v-for="shaderpack in shaderpacks"
                :key="shaderpack">
                <list-item-button icon="circle-info"></list-item-button>
                <list-item-button icon="folders"></list-item-button>
                <list-item-button icon="trash-can"></list-item-button>
            </list-item>
            </ul>
            <p class="text-center text-gray text-italic" v-if="this.instanceInfo.noshaderpack && !this.instanceInfo.shaderpacksIsLoading">此视图筛选条件无匹配结果</p>
            <p class="text-center text-gray text-italic" v-if="this.instanceInfo.shaderpacksIsLoading">正在加载...</p>
    </card>
</div>
    `,
    props: {
        saves: Array,
        mods: Array,
        resourcepacks: Array,
        shaderpacks: Array,
        instanceInfo: Object,
    },
    components: {
        listItemButton,
        listItem,
        card,cardCommandButton
    },
    computed: {
        banner() {
            return `background-image: linear-gradient(0deg, #00000094, #0000), url(${this.instanceInfo.banner})`
        },
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
            return `安装了${this.mods.length}个模组`
        },
        resourcepacksCount() {
            if (this.instanceInfo.resourcepacksIsLoading) {
                return '正在加载...'
            }
            return `安装了${this.resourcepacks.length}个资源包`
        },
        shaderpacksCount() {
            if (this.instanceInfo.shaderpacksIsLoading) {
                return '正在加载...'
            }
            return `安装了${this.shaderpacks.length}个光影包`
        }
    },
    methods: {
        launchGame() {
            ipc.send('launch-game', this.instanceInfo.instanceName)
        },
        async installGame() {
            await ipc.invoke('install-game-from-instance', this.instanceInfo.instanceName)
        },
        updateUI(downloadingInfo) { // 检查收到的下载状态对应的名字是否当前正在显示的相同
            if (this.instanceInfo.instanceName != downloadingInfo.instanceName) return
            this.downloading = downloadingInfo.status
        },
        async downloadCompleted(instanceName) {
            if (instanceName === this.instanceInfo.instanceName) {
                let instances = await ipcInvoke('get-instances')
                for (let index = 0; index < instances.length; index++) {
                    const instance = instances[index];
                    if (
                        instance.name === this.instanceInfo.instanceName
                    ) this.instanceInfo.installed = true
                }
            }
        },
        downloadFaild(instanceName) {
            if (instanceName === this.instanceInfo.instanceName) {
                this.faild = true
            }
        },
    },
    mounted() {
        const this_ = this
        ipc.on('update-download-task', function (event, downloadingInfo) {
            updateUI(downloadingInfo)
        })
        ipc.on('download-complete', (event, instanceName) => {
            downloadCompleted(instanceName)
        })
        ipc.on('download-faild', (event, {instanceName, error}) => {
            downloadFaild(instanceName)
            console.log(error)
        })
        function updateUI(downloadingInfo) {
            this_.updateUI(downloadingInfo)
        }
        function downloadCompleted(instanceName) {
            this_.downloadCompleted(instanceName)
        }
        function downloadFaild(instanceName) {
            this_.downloadFaild(instanceName)
        }
    },
}
