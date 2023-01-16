import loading from "../loading.js";
import { checkbox } from "../controller/checkbox.js";
import { commandButton, commandButtonMini } from "../commandButton.js";
import card from "../card.js";
import { listItem, listItemButton } from "../listItem.js";

const newInstance = {
    data() {
        return {
            minecraftVersionList: [],
            forgeVersionList: [],
            fabricVersionList: [],
            quiltVersionList: [],
            mcVersionIsloading: true,
            forgeVersionIsloading: true,
            fabricVersionIsloading: true,
            quiltVersionIsloading: true,
            noForgeVersion: false,
            noFabricVersion: false,
            noQuiltVersion: false,
            instanceName: '',
            config: {
                minecraft: '',
                forge: '',
                fabric: '',
                quilt: ''
            },
        }
    },
    components: { card, listItem, listItemButton, commandButtonMini },
    template: /* template */`
    <div>
    <div style="max-height: calc(100% - 60px);">
        <card :card-header=false :padding=[22,24,22,24]>
            <div class="newInstanceInfo">
                <div class="icon">
                </div>
                <div class="info">
                    <h4>{{instanceName}}</h4>
                    <p>{{instanceDescription}}</p>
                </div>
                <command-button-mini text="保存配置" @click="saveAndExit" v-show="!!this.config.minecraft"></command-button-mini>
            </div>
            <div class="input input-text" style="margin-bottom: 0">
                <span class="name">名称</span>
                <div class="input-data">
                    <input type="text" title="名称" required v-model="instanceName" />
                    <div class="underline"></div>
                </div>
            </div>
        </card>
        <card margin="10,0,0,0" title="Minecraft" :description="minecraftDescription" icon="minecraft" :is-swaped="true"
            :can-swap="true" :padding="[16,20,16,20]" :flexStart="true">
            <ul class="show-scroolbar" v-if="!this.mcVersionIsloading" style="width: 100%;">
                <li v-for="versions in minecraftVersionList" class="list-group">
                    <div>
                        <p>Minecraft {{versions.mainVersionID}}</p>
                    </div>
                    <ul>
                        <list-item v-for="version in versions.versions" @click="chooseMinecraftVersion($event)"
                            :data-version="version.id" :logo="version.icon" :title="version.id"
                            :description="version.description" inputID="minecraftVersion">
                            <list-item-button icon="folders"></list-item-button>
                            <list-item-button icon="circle-info"></list-item-button>
                            <list-item-button icon="arrow-up-right-from-square"></list-item-button>
                        </list-item>
                    </ul>
                </li>

            </ul>
            <p class="text-center text-gray text-italic" v-if="this.mcVersionIsloading" style="width: 100%;">正在加载...</p>
        </card>
        <card margin="10,0,0,0" title="Forge" :description="forgeDescription" icon="forge" :is-swaped="true"
            :can-swap="true" :padding="[16,20,16,20]" :flexStart="true">
            <ul class="show-scroolbar"
                v-if="!this.forgeVersionIsloading && !!this.config.minecraft && !this.config.fabric && !this.config.quilt && !noForgeVersion"
                style="width: 100%;">
                <list-item @click="chooseForgeVersion($event)" data-version="" title="不安装Forge" inputID="forgeVersion">
                </list-item>
                <list-item v-for="version in forgeVersionList" @click="chooseForgeVersion($event)"
                    :data-version="version.id" logo="./assets/images/Anvil_JE3_BE3.webp" :title="version.id"
                    :description="version.description" inputID="forgeVersion">
                    <list-item-button icon="folders"></list-item-button>
                    <list-item-button icon="circle-info"></list-item-button>
                    <list-item-button icon="arrow-up-right-from-square"></list-item-button>
                </list-item>
            </ul>
            <p class="text-center text-gray text-italic"
                v-if="this.forgeVersionIsloading && !!this.config.minecraft && !this.config.fabric && !this.config.quilt && !noForgeVersion"
                style="width: 100%;">正在加载...</p>
            <p class="text-center text-gray text-italic" v-if="!this.config.minecraft" style="width: 100%;">
                必须先选择Minecraft版本</p>
            <p class="text-center text-gray text-italic" v-if="this.config.fabric && !noForgeVersion" style="width: 100%;">与Fabric不兼容</p>
            <p class="text-center text-gray text-italic" v-if="this.config.quilt && !noForgeVersion" style="width: 100%;">与Quilt不兼容</p>
            <p class="text-center text-gray text-italic" v-if="noForgeVersion">无可用版本</p>
        </card>
        <card margin="10,0,0,0" title="Fabric" :description="fabricDescription" icon="fabric" :is-swaped="true"
            :can-swap="true" :padding="[16,20,16,20]" :logoPixelated="true" :flexStart="true">
            <ul class="show-scroolbar"
                v-if="!this.fabricVersionIsloading && !!this.config.minecraft && !this.config.forge && !this.config.quilt && !noFabricVersion"
                style="width: 100%;">
                <list-item @click="chooseFabricVersion($event)" data-version="" title="不安装Fabric" inputID="fabricVersion">
                </list-item>
                <list-item v-for="version in fabricVersionList" @click="chooseFabricVersion($event)"
                    :data-version="version.id" logo="./assets/images/fabric.webp" :title="version.id"
                    inputID="fabricVersion" :logoPixelated="true">
                    <list-item-button icon="folders"></list-item-button>
                    <list-item-button icon="circle-info"></list-item-button>
                    <list-item-button icon="arrow-up-right-from-square"></list-item-button>
                </list-item>
            </ul>
            <p class="text-center text-gray text-italic"
                v-if="this.fabricVersionIsloading && !!this.config.minecraft && !this.config.forge && !this.config.quilt && !noFabricVersion"
                style="width: 100%;">正在加载...</p>
            <p class="text-center text-gray text-italic" v-if="!this.config.minecraft" style="width: 100%;">
                必须先选择Minecraft版本</p>
            <p class="text-center text-gray text-italic" v-if="this.config.forge && !noFabricVersion" style="width: 100%;">与Forge不兼容</p>
            <p class="text-center text-gray text-italic" v-if="this.config.quilt && !noFabricVersion" style="width: 100%;">与Quilt不兼容</p>
            <p class="text-center text-gray text-italic" v-if="noFabricVersion">无可用版本</p>
        </card>
        <card margin="10,0,0,0" title="Quilt" :description="quiltDescription" icon="quilt" :is-swaped="true"
            :can-swap="true" :padding="[16,20,16,20]" :logoPixelated="true" :flexStart="true">
            <ul class="show-scroolbar"
                v-if="!this.quiltVersionIsloading && !!this.config.minecraft && !this.config.forge && !this.config.fabric"
                style="width: 100%;">
                <list-item @click="chooseQuiltVersion($event)" data-version="" title="不安装Quilt" inputID="quiltVersion">
                </list-item>
                <list-item v-for="version in quiltVersionList" @click="chooseQuiltVersion($event)"
                    :data-version="version.id" logo="./assets/images/quilt.svg" :title="version.id"
                    inputID="quiltVersion" :logoPixelated="true">
                    <list-item-button icon="folders"></list-item-button>
                    <list-item-button icon="circle-info"></list-item-button>
                    <list-item-button icon="arrow-up-right-from-square"></list-item-button>
                </list-item>
            </ul>
            <p class="text-center text-gray text-italic"
                v-if="this.quiltVersionIsloading && !!this.config.minecraft && !this.config.forge && !this.config.quilt"
                style="width: 100%;">正在加载...</p>
            <p class="text-center text-gray text-italic" v-if="!this.config.minecraft" style="width: 100%;">
                必须先选择Minecraft版本</p>
            <p class="text-center text-gray text-italic" v-if="this.config.forge" style="width: 100%;">与Forge不兼容</p>
            <p class="text-center text-gray text-italic" v-if="this.config.fabric" style="width: 100%;">与Fabric不兼容</p>
        </card>

    </div>
</div>
  `,
    computed: {
        instanceDescription() {
            return (this.config.minecraft ? `Minecraft ${this.config.minecraft}` : '') +
                (this.config.forge ? `, Forge ${this.config.forge}` : '') +
                (this.config.fabric ? `, Fabric ${this.config.fabric}` : '') +
                (this.config.quilt ? `, Quilt ${this.config.quilt}` : '')

        },
        minecraftDescription() {
            return this.config.minecraft ? `已选择${this.config.minecraft}` : '选择Minecraft版本'
        },
        forgeDescription() {
            let text
            if (this.config.minecraft) {
                text = this.config.forge ? `已选择${this.config.forge}` : '未选择'
            } else text = '必须先选择Minecraft版本'
            return text
        },
        fabricDescription() {
            let text
            if (this.config.minecraft) {
                text = this.config.fabric ? `已选择${this.config.fabric}` : '未选择'
            } else text = '必须先选择Minecraft版本'
            return text
        },
        quiltDescription() {
            let text
            if (this.config.minecraft) {
                text = this.config.quilt ? `已选择${this.config.quilt}` : '未选择'
            } else text = '必须先选择Minecraft版本'
            return text
        },
    },
    mounted() {
        this.setInstanceName()
        this.updateVersionList()
    },
    methods: {
        async setInstanceName() {
            this.instanceName = '未命名配置'
            let number = 0
            console.log(await ipc.invoke('has-instance', this.instanceName))
            while (await ipc.invoke('has-instance', this.instanceName)) {
                number++
                this.instanceName = `未命名配置 (${number})`
            }
        },
        saveAndExit() {
            if (!this.instanceName) { // 弹出错误信息
                return
            }
            ipc.invoke('new-instance', {
                name: this.instanceName,
                minecraft: this.config.minecraft,
                forge: this.config.forge,
                fabric: this.config.fabric,
                quilt: this.config.quilt,
            })
            this.back()
        },
        back() {
            page.transitionName = 'zoom-in'
            page.activeComponent = 'WareHouse'
        },
        chooseMinecraftVersion({ currentTarget }) {
            // list - item - active
            /*  console.log($($(currentTarget.parentNode).siblings())) */
            this.config.minecraft = currentTarget.dataset.version
            this.config.fabric = ''
            this.config.forge = ''
            this.config.quilt = ''
            expanded_card(currentTarget
                .parentNode
                .parentNode
                .parentNode
                .parentNode
                .parentNode
                .parentNode
                .firstElementChild
                .lastElementChild)
            $(".rua").animate({ scrollTop: 0 }, 0);
            this.updateForgeVersionList()
            this.updateFabricVersionList()
            this.updateQuiltVersionList()
        },
        chooseForgeVersion({ currentTarget }) {
            $(".rua").animate({ scrollTop: 0 }, 0);
            this.config.forge = currentTarget.dataset.version
            expanded_card(currentTarget.parentNode.parentNode.parentNode.parentNode.firstElementChild.lastElementChild)
        },
        chooseFabricVersion({ currentTarget }) {
            $(".rua").animate({ scrollTop: 0 }, 0);
            console.log(currentTarget.dataset.version)
            this.config.fabric = currentTarget.dataset.version
            expanded_card(currentTarget.parentNode.parentNode.parentNode.parentNode.firstElementChild.lastElementChild)
        },
        chooseQuiltVersion({ currentTarget }) {
            $(".rua").animate({ scrollTop: 0 }, 0);
            console.log(currentTarget.dataset.version)
            this.config.quilt = currentTarget.dataset.version
            expanded_card(currentTarget.parentNode.parentNode.parentNode.parentNode.firstElementChild.lastElementChild)
        },
        async updateVersionList() {
            this.mcVersionIsloading = true
            var VersionList
            await $.get("https://piston-meta.mojang.com/mc/game/version_manifest.json", (data, textStatus, jqXHR) => {
                if (jqXHR.status == 200) {
                    VersionList = data
                } else {
                    // 提示网络错误
                }
            })
            this.mcVersionIsloading = false
            this.minecraftVersionList = this.parseVersionList(VersionList)
        },
        parseVersionList(versionList) {
            const versions = versionList.versions
            var mainVersion
            const parsedVersionlist = new Map()
            /**
             * 将版本分类
             */
            const a = new Date().getTime()
            for (let index = 0; index < versions.length; index++) {
                var id = versions[index].id;
                const type = versions[index].type
                if (type === 'release') {
                    var _id = id.split('.')
                    if (_id[0] === '1') {
                        mainVersion = `1.${_id[1]}`
                    }
                }
                if (typeof parsedVersionlist.get(mainVersion) === 'undefined') {
                    parsedVersionlist.set(mainVersion, [])
                }
                if (type === "release") {
                    var icon = "./assets/images/Grass_Block.webp";
                    var type_ = "正式版";
                }
                if (type === "snapshot") {
                    var icon = "./assets/images/Crafting_Table.webp";
                    var type_ = "测试版";
                    continue // 暂时跳过，以后加了按钮再说(太tm卡了)
                }
                if (type === "old_beta" || type === "old_alpha") {
                    var icon = "./assets/images/Ancient_Debris.webp";
                    var type_ = "远古版";
                    continue // 暂时跳过，以后加了按钮再说(太tm卡了)
                }
                let lastlist = parsedVersionlist.get(mainVersion)
                const date = new Date(versions[index].releaseTime);
                lastlist.push({
                    id: id,
                    description: `发布于${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日 ${type_}`,
                    icon: icon
                })
                parsedVersionlist.set(mainVersion, lastlist)
            }
            versionList = []
            parsedVersionlist.forEach((value, key) => {
                versionList.push({
                    mainVersionID: key,
                    versions: value
                })
            })
            return versionList
        },
        async updateForgeVersionList() {
            this.noForgeVersion = false
            this.forgeVersionIsloading = true
            if (!this.config.minecraft) {
                return
            }
            let versionList
            try {
                versionList = (await ipc.invoke('get-forge-list', this.config.minecraft)).versions
            } catch (error) {
                this.forgeVersionIsloading = false
                this.noForgeVersion = true
                return
            }
            let versions = []
            for (let index = 0; index < versionList.length; index++) {
                let date = versionList[index].date
                date = date.split('-')
                versions.push({ id: versionList[index].version, description: `发布于${date[0]}年${date[1]}月${date[2]}日` })
            }
            this.forgeVersionIsloading = false
            this.forgeVersionList = versions
        },
        async updateFabricVersionList() {
            this.fabricVersionIsloading = true
            if (!this.config.minecraft) {
                return
            }
            const artifacts = await ipc.invoke('get-fabric-artifacts')
            const gamelist = artifacts.game
            this.noFabricVersion = true
            for (let index = 0; index < gamelist.length; index++) {
                const element = gamelist[index];
                if (element.version) this.noFabricVersion = false; break;
            }
            if (this.noFabricVersion === true) return
            const versionList = artifacts.loader
            let versions = []
            for (let index = 0; index < versionList.length; index++) {
                versions.push({ id: versionList[index].version })
            }
            this.fabricVersionIsloading = false
            this.fabricVersionList = versions
        },
        async updateQuiltVersionList() {
            this.quiltVersionIsloading = true
            if (!this.config.minecraft) {
                return
            }
            var gamelist
            await $.get("https://meta.quiltmc.org/v3/versions/game/hashed", (data, textStatus, jqXHR) => {
                if (jqXHR.status == 200) {
                    gamelist = data
                } else {
                    this.noQuiltVersion = true
                }
            });
            this.noQuiltVersion = true
            for (let index = 0; index < gamelist.length; index++) {
                const element = gamelist[index];
                if (element.version) this.noQuiltVersion = false; break;
            }
            if (this.noFabricVersion === true) return
            const versionList = (await ipc.invoke('get-quilt-list'))
            let versions = []
            for (let index = 0; index < versionList.length; index++) {
                versions.push({ id: versionList[index].version })
            }
            this.quiltVersionIsloading = false
            this.quiltVersionList = versions
        }
    }
}
const importBackup = {
    template: /* template */`
    <card :card-header=false><p>敬请期待</p></card>
    `,
    components: { card }
}
const importFromOther = {
    template: /* template */`
    <card :card-header=false><p>敬请期待</p></card>
    `,
    components: { card }
}
export default {
    data() {
        return {
            transitionName: '',
            activeComponent: 'newInstance',
            activeID: 1
        }
    },
    template: /* html */ `
        <div id="download_pg">
          <div class="child-sidebar">
            <ul>
              <li class="active" @click="changePage($event,'newInstance',1)"><i class="folder-plus"></i>新建配置</li>
              <li @click="changePage($event,'importBackup',2)"><i class="folders"></i>导入备份</li>
              <li @click="changePage($event,'importFromOther',3)"><i class="arrow-down-to-square"></i>从其他启动器导入</li>
            </ul>
            <li @click="back" style="margin-bottom: -9px;" class="backtoHome"><i class="arrow-left"></i>返回</li>
          </div>
          <div class="rua">
          <Transition :name="transitionName" mode="out-in">
          <component :is="activeComponent"></component>
          </Transition>
          </div>
        </div>
`,
    components: { newInstance, importBackup, importFromOther },
    methods: {
        back() {
            page.transitionName = 'zoom-in'
            page.activeComponent = 'WareHouse'
        },
        changePage({ currentTarget }, componentName, id) {
            console.log(id)
            $(currentTarget).siblings().removeClass("active");
            $(currentTarget).addClass("active");
            if (id < this.activeID) {
                this.transitionName = 'slide-down'
            } else {
                this.transitionName = 'slide-up'
            }
            console.log(this.transitionName)
            this.activeID = id
            this.activeComponent = componentName
        },
    },
};