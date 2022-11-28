import loading from "../loading.js";

export default {
    template: /* html */ `
    <div class="popup_window_main" id="ms_login">
      <div class="head" style="display: none">
        <span class="title"></span>
        <div class="btn" id="popup_window_closer"><i></i></div>
      </div>
      <div class="body" id="ms_login_body" style="width: 440.8px; height: 328.8px">
        <div></div>
        <loading styles="margin: auto auto; width: 36px; height: 36px;position: absolute;z-index: -1;"></loading>
      </div>
      <div class="foot" style="display: none"></div>
    </div>
`,
    components: {
        loading,
    },
};
