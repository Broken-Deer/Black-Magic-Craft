import card from "../card.js";
import { listItem, listItemButton } from "../listItem.js";
import { checkboxMini } from "../checkbox.js";
import MainPage from './MainPage.js'
import InstanceInfoPage from "./InstanceInfoPage.js";

export default {
    data() {
        return {
            instanceInfoData: {
                instanceName: '',
                minecraftVersion: '',
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
              <p @click="updateInstances">游戏</p>
              <ul class="gamelist" id="gamelist">
                <li v-for="(instance, index) in instances" @click="showInstancePage($event, index)">
                  <img src="./assets/images/Grass_Block.webp">{{instance.metadata.name}}
                </li>
              </ul>
            </div>
          </div>
          <div>
          <Transition :name="transitionName" mode="out-in">
          <component :is="activeComponent" :saves="saves" :mods="mods" :instanceInfo="instanceInfoData"></component>
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
        MainPage
    },
    mounted() {
        this.updateInstances()
    },
    methods: {
        setActiveComponent(el, componentName, id) {
            el = el.currentTarget
            setTimeout(() => {
                $(el.parentNode.parentNode.parentNode.lastElementChild).scrollTop(0);
            }, 100);
            $(el).siblings().removeClass("active");
            if (componentName === 'MainPage') {
                $(el.parentNode.lastElementChild).children().removeClass("active");
            } else {
                $(el.parentNode).siblings().removeClass("active");
            }
            $(el).addClass("active");
            if (id < this.activeID) {
                this.transitionName = 'slide-down'
            } else {
                this.transitionName = 'slide-up'
            }
            console.log(this.transitionName)
            this.activeID = id
            this.activeComponent = componentName
        },
        showInstancePage(el, index) {
            console.log(index)
            this.instanceInfoData.instanceName = this.instances[index].metadata.name
            this.instanceInfoData.minecraftVersion = `Minecraft ${this.instances[index].metadata.runtime.minecraft}`
            this.setActiveComponent(el, 'InstanceInfoPage', 2)
            this.activeInstanceID = index
            this.updateSaves(this.instances[index].metadata.name, index)
            this.updateMods(this.instances[index].metadata.name, index)
            ipcInvoke('change-activeID', index)
            VanillaTilt.init(document.querySelectorAll(".start-game"), {
                max: 0, //最大倾斜度数
                speed: 500, //倾斜转换的速度
                glare: true, //是否开启眩光效果
                "max-glare": 0.7, //最大眩光的不透明度
            });

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
                    time: `最后打开于${element.time}`,
                    icon: element.icon.replace(/[\r\n]/g, '')
                })
            }
            console.log(index)
            if (this.activeInstanceID != index) return
            console.log(saves)
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
            console.log(gotMods)
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
            console.log(this.activeID, index)
            if (this.activeInstanceID != index) return
            this.mods = mods
            console.log(this.mods)
            if (gotMods == 0) {
                this.instanceInfoData.nomod = true
            } else {
                this.instanceInfoData.nomod = false
            }
            this.instanceInfoData.modsIsLoading = false
        }
    },
};

