/*
 * Black Magic Launcher
 * Copyright (C) 2022-2023 Broken_Deer <old_driver__@outlook.com> and contributors
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

// 已弃用


var status_code;

async function show_login_window() {
        console.log("1. 等待用户登录完成");
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
        await $(new_webview).appendTo(document.getElementById("ms_login_body").firstElementChild);
        const webview = document.querySelector("webview");
        webview.addEventListener("dom-ready", (e) => {
            /* 缩放比例 */
            webview.setZoomFactor(1);
            /* 覆盖巨硬登录页某些元素的样式：移除背景，并让中间用来登录的东西撑满 */
            webview.insertCSS(/* css */ `
            html {
              overflow-y: overlay !important;
            }
            .background-logo {
                display: none !important;
            }

            #footer {
                display: none !important;
            }

            .inner, .sign-in-box {
                max-width: none  !important;
                max-height: none !important;
                width: 100vw !important;
                height: 100vh !important;
            }
            #backgroundImage, .background-image-small, .background-image-holder, .background-logo-holder {
              display: none !important;
            }
            .login-paginated-page, .outer, .background-image-holder {
              background: #00000000 !important;
            }
            .inner.app, .sign-in-box.app, .vertical-split-content.app {
              border: none !important;
              box-shadow: none !important;
              max-width: none !important;
              max-height: none !important;
              width: 100vw !important;
              height: 100vh !important
            }
            .inline-block {
              border-radius: 4px !important;
                overflow: hidden !important;
            }
        `);
        });
        /* 添加事件侦测器，用来检测重定向事件 */
        webview.addEventListener("did-redirect-navigation", async (r) => {
            var url = r["url"];
            const pref = "https://login.live.com/oauth20_desktop.srf?";
            /* 如果重定向地址以https://login.live.com/oauth20_desktop.srf?code= 开头，从中截取code的值，并丢给验证程序进行验证 */
            if (url.startsWith(pref + "code=")) {
                console.log("第一步完成");
                $("webview").remove();
                var code = url.substring(pref.length).split("&")[0].split("=")[1];
                /* 把code丢给登录程序，检查返回值 */
                await ms_oauth(code);
                switch (status_code) {
                    case 0:
                        dialog_close("ms_login");
                        break;
                    case 2:
                        login_fail_alert("ms_login", "获取 Microsoft 授权令牌失败，请检查你的 Microsoft 帐户");
                        break;
                    case 3:
                        login_fail_alert("ms_login", "Xbox 身份验证失败，请检查你的 Xbox 帐户");
                        break;
                    case 4:
                        login_fail_alert("ms_login", "XSTS 身份验证失败，请检查你的 Xbox 帐户");
                        break;
                    case 5:
                        login_fail_alert("ms_login", "Minecraft 验证失败，请检查你的帐户");
                        break;
                    case 6:
                    case 7:
                        login_fail_alert("ms_login", "UUID 获取失败，你可能没有购买 Minecraft");
                        break;
                }
            } else if (url.startsWith(pref + "error=")) {
                dialog_close("ms_login");
            }
        });
}

async function ms_oauth(code) {
    /* 初始化 */
    var access_token;
    var xbl_token;
    var xbl_uhs;
    var xsts_token;
    var minecraft_access_token;
    /* 授权码 -> 授权令牌 */
    console.log("2. 授权码 -> 授权令牌");
    try {
        await $.ajax({
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            type: "POST",
            url: "https://login.live.com/oauth20_token.srf",
            data:
                "client_id=00000000402b5328" +
                "&grant_type=authorization_code" +
                "&code=" +
                code +
                "&redirect_uri=" +
                encodeURI("https://login.live.com/oauth20_desktop.srf") +
                "&scope=" +
                encodeURI("service::user.auth.xboxlive.com::MBI_SSL"),
            success: function (response) {
                access_token = response["access_token"];
                console.log("第二步完成");
            },
        });
    } catch (e) {
        status_code = 2;
        return;
    }
    /* 用授权令牌进行xbox身份验证 */
    console.log("3. 用授权令牌进行xbox身份验证");
    try {
        await $.ajax({
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            type: "POST",
            url: "https://user.auth.xboxlive.com/user/authenticate",
            data: JSON.stringify({
                Properties: {
                    AuthMethod: "RPS",
                    SiteName: "user.auth.xboxlive.com",
                    RpsTicket: access_token,
                },
                RelyingParty: "http://auth.xboxlive.com",
                TokenType: "JWT",
            }),
            success: function (response) {
                xbl_token = response["Token"];
                xbl_uhs = response["DisplayClaims"]["xui"][0]["uhs"];
                console.log("第三步完成");
            },
        });
    } catch (error) {
        status_code = 3;
        return;
    }

    /* XSTS身份验证 */
    console.log("4. XSTS身份验证");
    try {
        await $.ajax({
            type: "POST",
            url: "https://xsts.auth.xboxlive.com/xsts/authorize",
            data: JSON.stringify({
                Properties: {
                    SandboxId: "RETAIL",
                    UserTokens: [xbl_token],
                },
                RelyingParty: "rp://api.minecraftservices.com/",
                TokenType: "JWT",
            }),
            success: function (response) {
                xsts_token = response["Token"];
                console.log("第四步完成");
            },
        });
    } catch (error) {
        status_code = 4;
        return;
    }

    /* 验证Minecraft */
    console.log("5. 验证Minecraft");
    try {
        await $.ajax({
            headers: {
                "Content-Type": "application/json",
            },
            type: "POST",
            url: "https://api.minecraftservices.com/authentication/login_with_xbox",
            data: JSON.stringify({
                identityToken: `XBL3.0 x=${xbl_uhs}; ${xsts_token}`,
            }),
            success: function (response) {
                minecraft_access_token = response["access_token"];
                console.log("第五步完成");
            },
        });
    } catch (error) {
        status_code = 5;
        return;
    }

    /* 检查游戏拥有情况 */
    console.log("6. 检查游戏拥有情况");
    try {
        await $.ajax({
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${minecraft_access_token}`,
            },
            type: "GET",
            url: "https://api.minecraftservices.com/entitlements/mcstore",
            data: "",
            success: function (response) {
                console.log("第六步完成");
            },
        });
    } catch (error) {
        status_code = 6;
        return;
    }

    /* 获取uuid */
    console.log("7. 获取uuid");
    try {
        await $.ajax({
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${minecraft_access_token}`,
            },
            type: "GET",
            url: "https://api.minecraftservices.com/minecraft/profile",
            data: "",
            success: function (response) {
                console.log("第七步完成");
            },
        });
    } catch (error) {
        status_code = 7;
        return;
    }
    console.log("============巨硬登录完成============");
    status_code = 0;
}

function login_fail_alert(window_id, msg) {
    let file_msg = document.createElement("span");
    file_msg.id = "login-fail-msg";
    file_msg.innerHTML = `<strong>登录失败</strong><p>${msg}</p>`;
    $(file_msg).appendTo(document.getElementById(window_id + "_body").firstElementChild);
    $(`#${window_id}_body`).attr("style", "height: 78.8px;padding: 0;background-color: #00000000;");
    $(document.getElementById(window_id + "_body").parentNode).attr("style", "background-color: #00000000");
}
