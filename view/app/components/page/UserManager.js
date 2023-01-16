import cardCommandButton from "../cardCommandButton.js"
import card from "../card.js"
import { listItem, listItemButton } from "../listItem.js"
import { dialogs } from '../dialogs.js'
import { load } from "../../LoadConfigs.js"
export default {
    name: 'UserManager',
    data() {
        return {
            accounts: [],
            AccountsIsLoading: false,
        }
    },
    template: /* template */ `
    <div>
    <card-command-button @click="addMicrosoftAccount" title="添加微软帐户" description="使用微软帐户登录到Minecraft" icon="microsoft" margin="10,0,10,0"></card-command-button>
    <card-command-button title="添加离线模式帐户" description="指定用户名登录到Minecraft，但不能加入有正版验证的服务器" icon="link-slash" margin="0,0,10,0"></card-command-button>
    <ul v-if="!this.AccountsIsLoading">
    <TransitionGroup name="list-item">
    <list-item :logo="account.avatar" :title="account.name" :description="account.id" v-for="account in accounts" :havelogo="true" :key="account.id" :logoPixelated="true">
    <list-item-button icon="arrow-rotate-right"></list-item-button>
    <list-item-button icon="circle-info"></list-item-button>
    <list-item-button icon="trash-can"></list-item-button>
    </list-item>
</TransitionGroup>

        </ul>
        <p class="text-center text-gray text-italic" v-if="this.AccountsIsLoading">正在加载...</p>
    </div>
    `,
    components: {
        cardCommandButton,
        card,
        listItem,
        listItemButton,
    },
    mounted() {
        const this_ = this
        ipc.invoke('get-accounts').then((value) => {
            this_.accounts = value.reverse()
        })
    },
    methods: {
        addMicrosoftAccount() {
            dialogs.openDialog('ms-login')
            $('#ms-login-content').attr('style', '')
            $('#ms-login-progress').empty()
            $('#ms-login-loading').attr('style', $('#ms-login-loading').attr('style') + 'opacity: 1;')
            const new_webview = document.createElement("webview");
            new_webview.id = "ms_login_webview";
            const URL =
                "https://login.live.com/oauth20_authorize.srf" +
                "?client_id=00000000402b5328" +
                "&response_type=code" +
                "&prompt=select_account" +
                // "$prompt=login"
                "&scope=service%3A%3Auser.auth.xboxlive.com%3A%3AMBI_SSL" +
                "&redirect_uri=https%3A%2F%2Flogin.live.com%2Foauth20_desktop.srf";
            new_webview.src = URL
            new_webview.style = "display: inline-flex;width: 100%;height: 308px;";
            setTimeout(() => {
                $(document.getElementById("ms_login_body").firstElementChild).empty();
                $(new_webview).appendTo(document.getElementById("ms_login_body").firstElementChild);
                const webview = document.querySelector("webview");
                webview.addEventListener("did-finish-load", () => {
                    // 网页加载完成隐藏加载动画
                    $('#ms-login-loading').attr('style', $('#ms-login-loading').attr('style') + 'opacity: 0;')
                });
                webview.addEventListener("dom-ready", async (e) => {
                    // webview.openDevTools()
                    webview.setZoomFactor(1);
                    const url = webview.getURL()
                    const pref = 'https://github.com'
                    if (url.startsWith(pref) && !url.startsWith(`${pref}/login`)) {
                        webview.loadURL(URL)
                    }
                    const color = await load('globle.appearance.themecolor')
                    webview.insertCSS(/* css */ `html {overflow-y: overlay !important;}.background-logo {display: none !important;}#footer {display: none !important;}.inner, .sign-in-box {max-width: none  !important;max-height: none !important;width: 100vw !important;height: 100vh !important;}#backgroundImage, .background-image-small, .background-image-holder, .background-logo-holder {display: none !important;}.login-paginated-page, .outer, .background-image-holder {background: #00000000 !important;}.inner.app, .sign-in-box.app, .vertical-split-content.app {border: none !important;box-shadow: none !important;max-width: none !important;max-height: none !important;width: 100vw !important;height: 100vh !important}.inline-block {border-radius: 4px !important;overflow: hidden !important;}.middle.app {padding: 0 !important} .inner{margin: 0 !important} .button.primary, .btn.btn-primary, button.btn-primary, input[type="button"].btn-primary, input[type="submit"].btn-primary, input[type="reset"].btn-primary {border-color: ${color} !important; background-color: ${color} !important;}.input.text-box:focus, input[type="color"]:focus, input[type="date"]:focus, input[type="datetime"]:focus, input[type="datetime-local"]:focus, input[type="email"]:focus, input[type="month"]:focus, input[type="number"]:focus, input[type="password"]:focus, input[type="search"]:focus, input[type="tel"]:focus, input[type="text"]:focus, input[type="time"]:focus, input[type="url"]:focus, input[type="week"]:focus, textarea:focus, select:focus {    border-color: ${color} !important;}
              ::-webkit-scrollbar {
                display: none
              }
              `);
                });
                webview.addEventListener("did-redirect-navigation", async ({ url }) => {
                    const pref = "https://login.live.com/oauth20_desktop.srf?";
                    if (url.startsWith(pref + 'error=')) {
                        webview.loadURL(URL)
                    }
                    if (url.startsWith(pref + "code=")) {
                        $(webview).remove();
                        $('#ms-login-loading').attr('style', $('#ms-login-loading').attr('style') + 'opacity: 1;')
                        $('#ms-login-content').attr('style', 'display: none')
                        ipc.on('ms-login-progress', (event, msg) => {
                            $('#ms-login-progress').text(`正在完成登录：${msg}`)
                        })
                        const result = await ipcInvoke('ms-login', url.substring(pref.length).split("&")[0].split("=")[1]);
                        dialogs.closeDialog('ms-login')
                        if (result[0] === 'complete') {
                            // 登录成功的操作
                            var avatar = await this.getAvatar(result[1].skin, 32)
                            await ipcInvoke('add-microsoft-account', {
                                id: result[1].id,
                                name: result[1].name,
                                skin: result[1].skin,
                                avatar: avatar,
                                refreshToken: result[1].refreshToken,
                                accessToken: result[1].minecraftAccessToken
                            })
                            this.accounts = (await ipcInvoke('get-accounts')).reverse()
                        } else {
                            // 登录失败的操作
                        }
                    } else if (url.startsWith(pref + "error=")) {
                        dialog_close("ms_login");
                    }
                });
            }, 300);
        },
        /**
         * 从皮肤截取头像
         * @param {String} src 皮肤文件地址
         * @param {int} size 截取头像的大小
         * @returns {Promise<String>} base64编码后的头像
         */
        async getAvatar(src, size) {
            const canvas = document.createElement("canvas");
            canvas.width = size
            canvas.height = size
            const ctx = canvas.getContext('2d')
            const img = new Image()
            img.src = src
            await new Promise(reslove => {
                img.onload = function () {
                    const scale = img.width / 64
                    const faceOffset = Math.round(size / 18.0)
                    ctx.imageSmoothingEnabled = false;
                    /* Inspired by HMCL */
                    ctx.drawImage(img,
                        8 * scale, 8 * scale, 16 * scale - 8 * scale, 16 * scale - 8 * scale,
                        faceOffset, faceOffset, size - faceOffset - faceOffset, size - faceOffset - faceOffset)
                    ctx.drawImage(img,
                        40 * scale, 8 * scale, 48 * scale - 40 * scale, 16 * scale - 8 * scale,
                        0, 0, size, size)
                    reslove();
                }
            })
            return canvas.toDataURL('image/png')
        }
    },
}
