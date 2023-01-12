import loading from "../loading.js";

export default {
  template: /* html */ `
    <div class="dialog_main" id="ms-login" style="display; none">
      <div class="head" style="display: none">
        <span class="title"></span>
        <div class="btn" id="dialog_closer"><i></i></div>
      </div>
      <div class="body" id="ms_login_body" style="width: 440.8px; height: 328.8px">
        <div id="ms-login-content"></div>
        <loading id="ms-login-loading" styles="margin: auto auto; width: 36px; height: 36px;position: absolute;transition: opacity .2s ease;"></loading>
        <p id="ms-login-progress" style="margin-top: 80px;
        font-size: 14px;
        color: #0000007d;"></p>
      </div>
      <div class="foot" style="display: none"></div>
    </div>
`,
  components: {
    loading,
  },
};
