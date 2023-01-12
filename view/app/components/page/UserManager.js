import cardCommandButton from "../cardCommandButton.js"
import card from "../card.js"
import { listItem, listItemButton } from "../listItem.js"
import { dialogs } from '../dialogs.js'
export default {
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
        <list-item :logo="account.skin" :title="account.name" :description="account.description" v-for="account in accounts" :key="account">
        <list-item-button icon="folders"></list-item-button>
        <list-item-button icon="circle-info"></list-item-button>
        <list-item-button icon="arrow-up-right-from-square"></list-item-button>
        </list-item>
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
            this_.accounts = value
        })
    },
    methods: {
        addMicrosoftAccount() {
            dialogs.openDialog('ms-login')
            $('#ms-login-content').attr('style', '')
            console.log("等待用户登录完成");
            $('#ms-login-progress').empty()
            $('#ms-login-loading').attr('style', $('#ms-login-loading').attr('style') + 'opacity: 1;')
            const new_webview = document.createElement("webview");
            new_webview.id = "ms_login_webview";
            new_webview.src =
                "https://login.live.com/oauth20_authorize.srf" +
                "?client_id=00000000402b5328" +
                "&response_type=code" +
                "&prompt=select_account" +
                "&scope=service%3A%3Auser.auth.xboxlive.com%3A%3AMBI_SSL" +
                "&redirect_uri=https%3A%2F%2Flogin.live.com%2Foauth20_desktop.srf";
            new_webview.style = "display: inline-flex;width: 100%;height: 308px;";
            $(document.getElementById("ms_login_body").firstElementChild).empty();
            $(new_webview).appendTo(document.getElementById("ms_login_body").firstElementChild);
            const webview = document.querySelector("webview");
            webview.addEventListener("did-finish-load", () => {
                // 网页加载完成隐藏加载动画
                $('#ms-login-loading').attr('style', $('#ms-login-loading').attr('style') + 'opacity: 0;')
            });
            webview.addEventListener("dom-ready", (e) => {
                webview.setZoomFactor(1);
                webview.insertCSS(/* css */ `html {overflow-y: overlay !important;}.background-logo {display: none !important;}#footer {display: none !important;}.inner, .sign-in-box {max-width: none  !important;max-height: none !important;width: 100vw !important;height: 100vh !important;}#backgroundImage, .background-image-small, .background-image-holder, .background-logo-holder {display: none !important;}.login-paginated-page, .outer, .background-image-holder {background: #00000000 !important;}.inner.app, .sign-in-box.app, .vertical-split-content.app {border: none !important;box-shadow: none !important;max-width: none !important;max-height: none !important;width: 100vw !important;height: 100vh !important}.inline-block {border-radius: 4px !important;overflow: hidden !important;} 
              ::-webkit-scrollbar {
                display: none
              }
              `);
            });
            webview.addEventListener("did-redirect-navigation", async ({ url }) => {
                const pref = "https://login.live.com/oauth20_desktop.srf?";
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
                        console.log(result[1].skins)
                        const skins = result[1].skins
                        let skin
                        for (let index = 0; index < skins.length; index++) {
                            if (skins[index].state === 'ACTIVE') {
                                skin = skins[index].url
                            }
                        }
                        console.log(skin)
                        await ipcInvoke('add-microsoft-account', {
                            id: result[1].id,
                            name: result[1].name,
                            skin: result[1].skins[0],
                            refreshToken: result[1].refreshToken,
                            accessToken: result[1].minecraftAccessToken
                        })
                        this.accounts = await ipcInvoke('get-accounts')
                    } else {
                        // 登录失败的操作
                    }
                } else if (url.startsWith(pref + "error=")) {
                    dialog_close("ms_login");
                }
            });
        }
    },
}
