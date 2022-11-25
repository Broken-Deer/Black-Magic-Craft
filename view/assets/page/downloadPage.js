import loading from "../components/loading.js";

export default {
    template: /* html */ `
        <div id="download_pg">
          <div class="page-title">安装游戏</div>
          <div class="card">
            <div class="card-body">
              <div>
                <div class="input input-checkbox disable" id="5D4CBB91">
                  <span class="name">显示远古版、快照版</span>
                  <div class="input-box">
                    <label>
                      <input type="checkbox" id="2B39A329" checked="checked" />
                      <span>
                        <div class="button"></div>
                      </span>
                    </label>
                  </div>
                </div>
                <div style="opacity: 1;" id="B9C498C7">
                  <span>正在加载版本列表</span>
                  <loading styles="width: 32px;height: 32px;display: inline-block;transform: scale(0.6);"></loading>
                </div>
              </div>
            </div>
            <ul class="list disposable" id="_version_list" style="max-height: 0; padding: 0px 20px;">
            </ul>
          </div>
        </div>`,
    components: { loading },
};
