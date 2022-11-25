import inputText from "../components/inputText.js";
import checkbox from "../components/checkbox.js";
import cardHeader from "../components/cardHeader.js";
import commandButton from "../components/commandButton.js";
import inputColor from "../components/inputColor.js";

export default {
    data() {
        return {
            ui: {
                global_settings: {
                    title: "全局游戏设置",
                    java_path_title: "Java 路径",
                    java_path: "选择 Java 路径",
                    java_path_description: "自定义游戏运行所需Java的位置",
                    auto_choose_java: "自动选择合适的 Java",
                    launch_options_title: "启动选项",
                    launch_options_description: "自定义游戏启动行为",
                    game_window_title: "游戏窗口标题",
                    game_window_title_placeholder: "默认",
                    customize_launcher_info: "自定义启动器信息",
                    customize_launcher_info_placeholder: "默认",
                    server_address: "服务器地址",
                    server_address_placeholder: "启动游戏后将自动进入此服务器",
                    process_priority: "进程优先级",
                    process_priority_highest: "最高",
                    process_priority_higher: "较高",
                    process_priority_medium: "中",
                    process_priority_lower: "较低",
                    process_priority_minimum: "最低",
                    window_size: "窗口大小",
                    window_width: "宽",
                    window_height: "高",
                    automatic_memory_allocation: "自动分配内存",
                    game_memory: "游戏内存",
                    advanced_settings: "高级设置",
                    advanced_settings_description: "自定义启动命令",
                    game_parameters: "游戏参数",
                    game_parameters_placeholder: "默认",
                    exec_before_starting: "启动前执行",
                    exec_before_starting_placeholder: "在游戏启动前执行",
                    wrap_command: "包装命令",
                    wrap_command_placeholder: "会自动添加至启动命令前方",
                    exec_after_starting: "启动后执行",
                    exec_after_starting_placeholder: "在游戏启动后执行",
                    jvm_parameters: "Java 虚拟机参数",
                    jvm_parameters_placeholder: "填写此字段以覆盖默认设置",
                    memory_persistence_area: "内存永久保存区域",
                    memory_persistence_area_placeholder: "填写整数（单位 MB）",
                    debugging_options: "调试选项",
                    debugging_options_description: "如果你不知道这些选项的作用，请不要乱动它们！",
                    lwjgl: "本地库路径 (LWJGL)",
                    lwjgl_placeholder: "默认由启动器提供，填写此选项以自定义游戏需要的本地库",
                    dont_check_jvm_parameters: "不检查默认的 JVM 参数",
                    dont_check_assets_files: "不检查资源文件完整性",
                    dont_check_JVM_compatibility: "不检查 JVM 与游戏的兼容性",
                    use_system_GLFW: "[Linux] 使用系统GLFW",
                    use_system_OpenAL: "[Linux] 使用系统OpenAL",
                    dev_tools: "启动 Developer Tools",
                    dev_tools_btn: "启动",
                },
                launcher_settings: {
                    general: {
                        title: "常规",
                        description: "启动器基本设置",
                    },
                },
            },
        };
    },
    template: /* html */ `
         <div id="g_setting_pg">
          <div class="page-title" id="text">{{ ui.global_settings.title }}</div>
          <div class="card">
            <card-header :title="ui.global_settings.java_path_title"
              :description=" ui.global_settings.java_path_description" icon="java-logo fa-brands"></card-header>
            <div class="card-body">
              <div>
                <checkbox :name="ui.global_settings.auto_choose_java" click="disable(this,'E16616C6')"></checkbox>
                <div class="input input-text input-file" id="E16616C6">
                  <span class="name">{{ ui.global_settings.java_path }}</span>
                  <div class="input-data">
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
                  :placeholder="ui.global_settings.game_window_title_placeholder"></input-text>
                <input-text :name="ui.global_settings.customize_launcher_info"
                  :placeholder="ui.global_settings.customize_launcher_info_placeholder"></input-text>
                <input-text :name="ui.global_settings.server_address"
                  :placeholder="ui.global_settings.server_address_placeholder"></input-text>
                <div class="input input-list" id="version_isolation">
                  <span class="name">{{ui.global_settings.process_priority}}</span>
                  <div class="input-data input-data-list" onclick="input_list(this,'156px')">
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

                <checkbox :name="ui.global_settings.automatic_memory_allocation" click="disable(this,'D3E268A7')">
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
                  :placeholder="ui.global_settings.game_parameters_placeholder"></input-text>
                <input-text :name="ui.global_settings.exec_before_starting"
                  :placeholder="ui.global_settings.exec_before_starting_placeholder"></input-text>
                <input-text :name="ui.global_settings.wrap_command"
                  :placeholder="ui.global_settings.wrap_command_placeholder">
                </input-text>
                <input-text :name="ui.global_settings.exec_after_starting"
                  :placeholder="ui.global_settings.exec_after_starting_placeholder"></input-text>
                <input-text :name="ui.global_settings.jvm_parameters"
                  :placeholder="ui.global_settings.jvm_parameters_placeholder"></input-text>
                <input-text :name="ui.global_settings.memory_persistence_area"
                  :placeholder="ui.global_settings.memory_persistence_area_placeholder"></input-text>
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
                <input-text :name="ui.global_settings.lwjgl" :placeholder="ui.global_settings.lwjgl_placeholder">
                </input-text>
                <checkbox :name="ui.global_settings.dont_check_jvm_parameters"></checkbox>
                <checkbox :name="ui.global_settings.dont_check_assets_files"></checkbox>
                <checkbox :name="ui.global_settings.dont_check_JVM_compatibility"></checkbox>
                <checkbox :name="ui.global_settings.use_system_GLFW"></checkbox>
                <checkbox :name="ui.global_settings.use_system_OpenAL"></checkbox>
                <command-button :name="ui.global_settings.dev_tools" :text="ui.global_settings.dev_tools_btn"
                  click="execute('OpenDevTools')">
                </command-button>
              </div>
            </div>
          </div>
        </div>`,
    components: { inputText, checkbox, cardHeader, commandButton, inputColor },
};
