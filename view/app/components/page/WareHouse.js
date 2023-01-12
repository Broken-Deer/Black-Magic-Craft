import card from "../card.js";
import { listItem, listItemButton } from "../listItem.js";
import { checkboxMini } from "../controller/checkbox.js";
import MainPage from './MainPage.js'
import InstanceInfoPage from "./InstanceInfoPage.js";
import UserManager from "./UserManager.js";

export default {
    data() {
        return {
            instanceInfoData: {
                instanceName: '',
                minecraftVersion: '',
                instanceMetadata: {},
                banner: '',
                index: 0,
                installed: false,
                savesIsLoading: false,
                modsIsLoading: false,
                resourcepacksIsLoading: false,
                shaderpacksIsLoading: false,
                nosave: false,
                nomod: false,
                noresourcepack: false,
                noshaderpack: false
            },
            saves: [],
            mods: [],
            resourcepacks: [],
            shaderpacks: [],
            instances: [],
            activeID: 1,
            activeInstanceID: 0,
            noinstances: 0,
            activeComponent: 'MainPage',
            transitionName: ''
        };
    },
    template: /* template */ `
        <div class="home-page" id="home_pg">
          <div>
            <div class="child-sidebar">
              <li class="active" @click="setActiveComponent($event,'MainPage',1)"><i class="house"></i>主页</li>
              <li @click="setActiveComponent($event,'UserManager',2)"><i class="user"></i>帐户</li>
              <p @click="updateInstances">游戏</p>
              <ul class="gamelist" id="gamelist">
                <li v-for="(instance, index) in instances" @click="showInstancePage($event, index)">
                  <img src="./assets/images/Grass_Block.webp">{{instance.name}}
                </li>
                <p v-if="instances == 0">此视图筛选条件无匹配结果</p>
              </ul>
            </div>
          </div>
          <div>
          <Transition :name="transitionName" mode="out-in">
          <component :is="activeComponent" :saves="saves" :mods="mods" :resourcepacks="resourcepacks" :shaderpacks="shaderpacks" :instanceInfo="instanceInfoData" :key="instanceInfoData.instanceName"></component>
          </Transition>
          </div>
        </div>
  `,
    components: {
        card,
        listItem,
        listItemButton,
        checkboxMini,
        InstanceInfoPage,
        MainPage,
        UserManager
    },
    mounted() {
        this.updateInstances()
    },
    methods: {
        test() {
            alert('114514')
        },
        setActiveComponent(el, componentName, id, index) {
            el = el.currentTarget
            setTimeout(() => {
                $(el.parentNode.parentNode.parentNode.lastElementChild).scrollTop(0);
            }, 100);
            $(el).siblings().removeClass("active");
            if (componentName != 'InstanceInfoPage') {
                $(el.parentNode.lastElementChild).children().removeClass("active");
            } else {
                $(el.parentNode).siblings().removeClass("active");
            }
            $(el).addClass("active");
            if (this.activeID === id) {
                if (index < this.instanceInfoData.index) {
                    this.transitionName = 'slide-down'
                } else {
                    this.transitionName = 'slide-up'
                }
            } else if (id < this.activeID) {
                this.transitionName = 'slide-down'
            } else {
                this.transitionName = 'slide-up'
            }
            this.activeID = id
            this.activeComponent = componentName
        },
        showInstancePage(el, index) {
            this.setActiveComponent(el, 'InstanceInfoPage', 3, index)
            const this_ = this
            this.updateInstances().then(() => {
                this_.instanceInfoData.instanceName = this_.instances[index].name;
                this_.instanceInfoData.minecraftVersion = `Minecraft ${this_.instances[index].metadata.runtime.minecraft}`;
                this_.instanceInfoData.installed = this_.instances[index].installed;
                this_.instanceInfoData.banner = this_.instances[index].banner
                this_.instanceInfoData.index = index
                this_.activeInstanceID = index;
                this_.updateSaves(this_.instances[index].name, index);
                this_.updateMods(this_.instances[index].name, index);
                this_.updateResourcepacks(this_.instances[index].name, index);
                this_.updateShaderpacks(this_.instances[index].name, index);
                ipcInvoke('change-activeID', index);
            })
            setTimeout(() => {
                VanillaTilt.init(document.querySelectorAll(".start-game, .install-game"), {
                    max: 0,
                    speed: 500,
                    glare: true,
                    "max-glare": 0.7, //最大眩光的不透明度
                });
            },100);
        },
        async updateInstances() {
            let gotInstances = await ipcInvoke('get-instances')
            this.instances = gotInstances
        },
        async updateSaves(instanceName, index) {
            this.instanceInfoData.savesIsLoading = true
            let gotSaves = await ipcInvoke('get-world-list', { instanceName: instanceName, id: index })
            let saves = []
            for (let index = 0; index < gotSaves.length; index++) {
                const element = gotSaves[index];
                saves.push({
                    name: element.worldInfo.LevelName,
                    description: `${element.time}, ${gotSaves[index].worldInfo.allowCommands ? '允许作弊' : '不允许作弊'}`,
                    icon: element.icon.replace(/[\r\n]/g, '')
                })
            }
            if (this.activeInstanceID != index) return
            this.saves = saves
            if (gotSaves == 0) {
                this.instanceInfoData.nosave = true
            } else {
                this.instanceInfoData.nosave = false
            }
            this.instanceInfoData.savesIsLoading = false
        },
        async updateMods(instanceName, index) {
            this.instanceInfoData.modsIsLoading = true
            let gotMods = await ipcInvoke('get-mods', { instanceName: instanceName, id: index })
            let mods = []
            for (let index = 0; index < gotMods.length; index++) {
                const element = gotMods[index];
                let name
                try {
                    name = element.modmeta.name
                    if (typeof name == 'undefined') {
                        name = element.filename
                    }
                } catch (error) {
                    name = element.filename
                }
                let description
                try {
                    description = element.modmeta.description
                } catch (error) {
                    description = undefined
                }
                mods.push({
                    name: name,
                    description: description,
                    icon: element.icon.replace(/[\r\n]/g, '')
                })
            }
            if (this.activeInstanceID != index) return
            this.mods = mods
            if (gotMods == 0) {
                this.instanceInfoData.nomod = true
            } else {
                this.instanceInfoData.nomod = false
            }
            this.instanceInfoData.modsIsLoading = false
        },
        async updateResourcepacks(instanceName, index) {
            this.instanceInfoData.resourcepacksIsLoading = true
            let gotResourcepacks = await ipcInvoke('get-resourcepacks', { instanceName: instanceName, id: index })
            let resourcepacks = []
            for (let index = 0; index < gotResourcepacks.length; index++) {
                const element = gotResourcepacks[index];
                let description
                try {
                    description = element.metadata.metadata.description.replace(/§+./g, '')
                } catch (error) { }
                resourcepacks.push({
                    name: element.name,
                    description: description,
                    icon: element.icon.replace(/[\r\n]/g, '')
                })
            }
            if (this.activeInstanceID != index) return
            this.resourcepacks = resourcepacks
            if (gotResourcepacks == 0) {
                this.instanceInfoData.noresourcepack = true
            } else {
                this.instanceInfoData.noresourcepack = false
            }
            this.instanceInfoData.resourcepacksIsLoading = false
        },
        async updateShaderpacks(instanceName, index) {
            this.instanceInfoData.shaderpacksIsLoading = true
            let gotShaderpacks = await ipcInvoke('get-shaderpacks', { instanceName: instanceName, id: index })
            let shaderpacks = []
            for (let index = 0; index < gotShaderpacks.length; index++) {
                const element = gotShaderpacks[index];
                shaderpacks.push({ name: element.name })
            }
            if (this.activeInstanceID != index) return
            this.shaderpacks = shaderpacks
            if (shaderpacks == 0) {
                this.instanceInfoData.noshaderpack = true
            } else {
                this.instanceInfoData.noshaderpack = false
            }
            this.instanceInfoData.shaderpacksIsLoading = false
        },
    },
};

