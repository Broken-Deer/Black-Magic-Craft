import { inputText, inputTextMini } from "../inputText.js";
import { checkbox } from "../checkbox.js";
import cardHeader from "../cardHeader.js";
import { commandButton } from "../commandButton.js";
import sliderBar from "../sliderBar.js";
import zh_cn from "../../onload.js";
import { load, update } from "../../LoadConfigs.js";
import card from "../card.js";

export default {
    data() {
        var confA = [
            { id: 1, text: "最高" },
            { id: 2, text: "较高" },
            { id: 3, text: "中" },
            { id: 4, text: "较低" },
            { id: 5, text: "最低" },
        ];
        var jvpathConf = load("globle.game.jvpath");
        var jvpath;
        if (typeof jvpathConf == "string") {
            jvpath = jvpathConf;
        } else {
            jvpath = "";
        }
        if (typeof load("globle.accessibility.AnimationSpeed") == "number") {
            return {
                configA: confA[load("globle.accessibility.AnimationSpeed") - 1]["text"],
                configItemsA: confA,
                ui: zh_cn["ui"],
                jvpath: jvpath,
            };
        } else {
            return {
                configA: confA[0]["text"],
                configItemsA: confA,
                ui: zh_cn["ui"],
                jvpath: jvpath,
            };
        }
    },
    template: /* html */ `
  <div id="AF3BE70D" style="display: none">
    <card :title="ui.global_settings.java_path_title" :description=" ui.global_settings.java_path_description" icon="java-logo fa-brands">
      <checkbox :name="ui.global_settings.auto_choose_java" click="disable(this,'E16616C6')"  config="globle.game.autojv"></checkbox>
      <div class="input input-text input-file" id="E16616C6">
        <span class="name">{{ ui.global_settings.java_path }}</span>
        <div class="input-data input-data-file">
          <input type="text" title="{{ ui.global_settings.java_path }}" @input="updateData('globle.game.jvpath', jvpath)" required v-model="jvpath" readonly />
          <div class="underline"></div>
        </div>
        <div class="choose-file">
          <i onclick="choose_java(this);"></i>
        </div>
      </div>
    </card>
    <card :title="ui.global_settings.launch_options_title" :description="ui.global_settings.launch_options_description" icon="start-game">
      <input-text :name="ui.global_settings.game_window_title"
      :placeholder="ui.global_settings.game_window_title_placeholder"  config="globle.game.gmwintitle"></input-text>
      <input-text :name="ui.global_settings.customize_launcher_info"
        :placeholder="ui.global_settings.customize_launcher_info_placeholder" config="globle.game.lauchermsg"></input-text>
      <input-text :name="ui.global_settings.server_address"
        :placeholder="ui.global_settings.server_address_placeholder" config="globle.game.serverIP"></input-text>
      <div class="input input-list" id="version_isolation">
        <span class="name">{{ui.global_settings.process_priority}}</span>
        <div class="input-data input-data-list" onclick="input_list(this,'158px')">
          <div>{{configA}}</div>
          <ul class="option" style="display: none">
          <li v-for="(item,index) in configItemsA" class="option" onclick="set_input_list(this);" @click="updateData('globle.game.process', item.id)">{{item.text}}</li>
            <div></div>
          </ul>
        </div>
      </div>
      <div class="input input-text">
        <span class="name">{{ui.global_settings.window_size}}</span>
        <div style="display: flex; line-height: 1.7">
          <input-text-mini :name="ui.global_settings.window_width" placeholder="自动" config="globle.game.width"></input-text-mini>
          ×
          <input-text-mini :name="ui.global_settings.window_height" placeholder="自动" config="globle.game.height"></input-text-mini>
        </div>
      </div>
      <checkbox :name="ui.global_settings.automatic_memory_allocation" click="disable(this,'D3E268A7')" config="globle.game.mem">
      </checkbox>
      <slider-bar :name="ui.global_settings.game_memory" max="16384" min="128" step="1" text="MB" config="globle.game.mem"></slider-bar>
    </card>
    <card :title="ui.global_settings.advanced_settings" :description="ui.global_settings.advanced_settings_description" icon="pro-settings" :is-swaped=true :can-swap=true>
      <input-text :name="ui.global_settings.game_parameters"
      :placeholder="ui.global_settings.game_parameters_placeholder" config="globle.game.gmarg"></input-text>
      <input-text :name="ui.global_settings.exec_before_starting"
        :placeholder="ui.global_settings.exec_before_starting_placeholder" config="globle.game.beforeExec"></input-text>
      <input-text :name="ui.global_settings.wrap_command"
        :placeholder="ui.global_settings.wrap_command_placeholder" config="globle.game.wrapcomm">
      </input-text>
      <input-text :name="ui.global_settings.exec_after_starting"
        :placeholder="ui.global_settings.exec_after_starting_placeholder" config="globle.game.afterExec"></input-text>
      <input-text :name="ui.global_settings.jvm_parameters"
        :placeholder="ui.global_settings.jvm_parameters_placeholder" config="globle.game.jvmarg"></input-text>
      <input-text :name="ui.global_settings.memory_persistence_area"
        :placeholder="ui.global_settings.memory_persistence_area_placeholder" config="globle.game.memPersistenceArea"></input-text>
    </card>
    <card :title="ui.global_settings.debugging_options" :description="ui.global_settings.debugging_options_description" icon="debug-settings" :is-swaped=true :can-swap=true>
      <input-text :name="ui.global_settings.lwjgl" :placeholder="ui.global_settings.lwjgl_placeholder" config="globle.game.nativesDir">
      </input-text>
      <checkbox :name="ui.global_settings.dont_check_jvm_parameters" config="globle.game.noJVMArgs"></checkbox>
      <checkbox :name="ui.global_settings.dont_check_assets_files" config="globle.game.notCheckGame"></checkbox>
      <checkbox :name="ui.global_settings.dont_check_JVM_compatibility" config="globle.game.notCheckJVM"></checkbox>
      <checkbox :name="ui.global_settings.use_system_GLFW" config="globle.game.sysGLFW"></checkbox>
      <checkbox :name="ui.global_settings.use_system_OpenAL" config="globle.game.sysOpenAL"></checkbox>
    </card>
  </div>
   
`,
    components: { inputText, checkbox, cardHeader, commandButton, sliderBar, inputTextMini, card },
    methods: {
        updateData(key, val) {
            update(key, val);
        },
    },
};
