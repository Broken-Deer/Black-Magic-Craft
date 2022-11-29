import inputText from "../inputText.js";
import checkbox from "../checkbox.js";
import cardHeader from "../cardHeader.js";
import commandButton from "../commandButton.js";
import zh_cn from "../../onload.js";

export default {
    data() {
        return zh_cn;
    },
    template: /* html */ `
  <div id="AF3BE70D" style="display: none">
     <div class="card">
            <card-header :title="ui.global_settings.java_path_title"
              :description=" ui.global_settings.java_path_description" icon="java-logo fa-brands"></card-header>
            <div class="card-body">
              <div>
                <checkbox :name="ui.global_settings.auto_choose_java" click="disable(this,'E16616C6')"  config="globle.game.autojv"></checkbox>
                <div class="input input-text input-file" id="E16616C6">
                  <span class="name">{{ ui.global_settings.java_path }}</span>
                  <div class="input-data input-data-file">
                    <input type="text" id="input_a" title="{{ ui.global_settings.java_path }}" required />
                    <div class="underline"></div>
                  </div>
                  <div class="choose-file">
                    <i onclick="choose_java(this);"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="card">
            <card-header :title="ui.global_settings.launch_options_title"
              :description="ui.global_settings.launch_options_description" icon="start-game"></card-header>
            <div class="card-body">
              <div>
                <input-text :name="ui.global_settings.game_window_title"
                  :placeholder="ui.global_settings.game_window_title_placeholder"  config="globle.game.gmwintitle"></input-text>
                <input-text :name="ui.global_settings.customize_launcher_info"
                  :placeholder="ui.global_settings.customize_launcher_info_placeholder" config="globle.game.lauchermsg"></input-text>
                <input-text :name="ui.global_settings.server_address"
                  :placeholder="ui.global_settings.server_address_placeholder" config="globle.game.serverIP"></input-text>
                <div class="input input-list" id="version_isolation">
                  <span class="name">{{ui.global_settings.process_priority}}</span>
                  <div class="input-data input-data-list" onclick="input_list(this,'158px')">
                    <div></div>
                    <ul class="option" style="display: none">
                      <li class="option" onclick="set_input_list(this)">{{ui.global_settings.process_priority_highest}}
                      </li>
                      <li class="option" onclick="set_input_list(this)">{{ui.global_settings.process_priority_higher}}
                      </li>
                      <li class="option" onclick="set_input_list(this)">{{ui.global_settings.process_priority_medium}}
                      </li>
                      <li class="option" onclick="set_input_list(this)">{{ui.global_settings.process_priority_lower}}
                      </li>
                      <li class="option" onclick="set_input_list(this)">{{ui.global_settings.process_priority_minimum}}
                      </li>
                      <div></div>
                    </ul>
                  </div>
                </div>

                <div class="input input-text">
                  <span class="name">{{ui.global_settings.window_size}}</span>
                  <div style="display: flex; line-height: 1.7">
                    <div class="input-data mini">
                      <input type="text" id="input_a" title="{{ui.global_settings.window_width}}" placeholder="800"
                        required />
                      <div class="underline"></div>
                    </div>
                    ×
                    <div class="input-data mini">
                      <input type="text" id="input_a" title="{{ui.global_settings.window_height}}" placeholder="600"
                        required />
                      <div class="underline"></div>
                    </div>
                  </div>
                </div>

                <checkbox :name="ui.global_settings.automatic_memory_allocation" click="disable(this,'D3E268A7')" config="globle.game.autojv">
                </checkbox>
                <div class="input input-text" id="D3E268A7">
                  <span class="name">{{ui.global_settings.game_memory}}</span>
                  <div style="display: flex; line-height: 1.7">
                    <div class="slider">
                      <div class="orbit">
                        <div></div>
                      </div>
                      <div class="slider_btn" id="CA028F76">
                        <div></div>
                      </div>
                    </div>
                    <div class="input-data mini">
                      <input type="text" id="memory_value" title="{{ui.global_settings.game_memory}}" placeholder=""
                        required />
                      <div class="underline"></div>
                    </div>
                    <span class="text">MB</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="card not-expanded">
            <card-header :title="ui.global_settings.advanced_settings"
              :description="ui.global_settings.advanced_settings_description" icon="pro-settings"></card-header>
            <div class="card-body" style="overflow: hidden; height: 0">
              <div>
                <input-text :name="ui.global_settings.game_parameters"
                  :placeholder="ui.global_settings.game_parameters_placeholder" config="globle.game.gmarg"></input-text>
                <input-text :name="ui.global_settings.exec_before_starting"
                  :placeholder="ui.global_settings.exec_before_starting_placeholder" config="globle.game.beforeExec"></input-text>
                <input-text :name="ui.global_settings.wrap_command"
                  :placeholder="ui.global_settings.wrap_command_placeholder">
                </input-text>
                <input-text :name="ui.global_settings.exec_after_starting"
                  :placeholder="ui.global_settings.exec_after_starting_placeholder" config="globle.game.afterExec"></input-text>
                <input-text :name="ui.global_settings.jvm_parameters"
                  :placeholder="ui.global_settings.jvm_parameters_placeholder" config="globle.game.jvmarg"></input-text>
                <input-text :name="ui.global_settings.memory_persistence_area"
                  :placeholder="ui.global_settings.memory_persistence_area_placeholder" config="globle.game.memPersistenceArea"></input-text>
              </div>
            </div>
          </div>
          <div class="card not-expanded">
            <div class="card-header">
              <div class="card-title">
                <div class="card-icon"><i class="debug-settings"></i></div>
                <div>
                  <h4>{{ui.global_settings.debugging_options}}</h4>
                  <p>{{ui.global_settings.debugging_options_description}}</p>
                </div>
              </div>
              <div class="card-button" onclick="expanded_card(this)"><i></i></div>
            </div>
            <div class="card-body" style="overflow: hidden; height: 0">
              <div>
                <input-text :name="ui.global_settings.lwjgl" :placeholder="ui.global_settings.lwjgl_placeholder" config="globle.game.nativesDir">
                </input-text>
                <checkbox :name="ui.global_settings.dont_check_jvm_parameters" config="globle.game.noJVMArgs"></checkbox>
                <checkbox :name="ui.global_settings.dont_check_assets_files" config="globle.game.notCheckGame"></checkbox>
                <checkbox :name="ui.global_settings.dont_check_JVM_compatibility" config="globle.game.notCheckJVM"></checkbox>
                <checkbox :name="ui.global_settings.use_system_GLFW" config="globle.game.sysGLFW"></checkbox>
                <checkbox :name="ui.global_settings.use_system_OpenAL" config="globle.game.sysOpenAL"></checkbox>
              </div>
            </div>
          </div>
  </div>
   
`,
    components: { inputText, checkbox, cardHeader, commandButton },
};
