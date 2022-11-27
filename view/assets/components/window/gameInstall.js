export default {
    template: /* html */ `
    <div class="popup_window_main" id="game_install">
      <div class="head">
        <div class="title"><i class="folder-arrow-down"></i>
          <div>
            <span id="5E79266D">正在安装</span>
            <p>请稍等一会</p>
          </div>
        </div>
      </div>
      <div class="body" id="game_install_body" style="width: 600px;height: 210px;">
        <ul class="task-list">
          <li>
            <span><i class="spinner-third task-list-icon" id="task1"></i>获取版本信息</span>
          </li>
          <li>
            <span><i class="spinner-third task-list-icon" id="task2"></i>下载游戏主文件</span>
          </li>
          <li>
            <span><i class="spinner-third task-list-icon" id="task3"></i>补全依赖库文件</span>
            <span class="count" id="lib"></span>
          </li>
          <li>
            <span><i class="spinner-third task-list-icon" id="task4"></i>补全资源文件</span>
            <span class="count" id="assets_file"></span>
          </li>
        </ul>
      </div>

    </div>
`,
};
