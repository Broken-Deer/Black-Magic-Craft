import got from "got"
import ElectronStore from "electron-store"
import { getEventObj } from "../utils/Other.mjs"
const store = new ElectronStore()

/**
 * 授权码 -> 授权令牌
 * @param {String} code 授权码
 */
async function getAccessToken(code) {
    return JSON.parse((await got.post('https://login.live.com/oauth20_token.srf', {
        headers: {
            "Content-Type": 'application/x-www-form-urlencoded',
        },
        body:
            "client_id=00000000402b5328" +
            "&grant_type=authorization_code" +
            "&code=" +
            code +
            "&redirect_uri=" +
            encodeURI("https://login.live.com/oauth20_desktop.srf") +
            "&scope=" +
            encodeURI("service::user.auth.xboxlive.com::MBI_SSL"),
    }).catch(reason => {
        console.log(reason) // 以后改为写入日志
        throw '获取 Microsoft 授权令牌失败，请检查你的帐户'
    })).body)
}

/**
 * 刷新令牌 -> 授权令牌
 * @returns 授权令牌
 */
async function getAccessTokenFromRefreshToken(refreshToken) {
    return JSON.parse((await got.post('https://login.live.com/oauth20_token.srf', {
        headers: {
            "Content-Type": 'application/x-www-form-urlencoded',
        },
        body:
            "client_id=00000000402b5328" +
            "&grant_type=refresh_token" +
            "&refresh_token=" + refreshToken +
            "&redirect_uri=" +
            encodeURI("https://login.live.com/oauth20_desktop.srf") +
            "&scope=" +
            encodeURI("service::user.auth.xboxlive.com::MBI_SSL"),
    }).catch(reason => {
        console.log(reason) // 以后改为写入日志
        throw '获取 Microsoft 授权令牌失败，请重新添加Microsoft账户（也可能是网络问题）'
    })).body)
}

/**
 * Xbox身份验证
 * @param {String} AccessToken 授权令牌
 */
async function XboxAuthenticate(AccessToken) {
    const Response = JSON.parse((await got.post('https://user.auth.xboxlive.com/user/authenticate', {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body:
            JSON.stringify({
                Properties: {
                    AuthMethod: "RPS",
                    SiteName: "user.auth.xboxlive.com",
                    RpsTicket: AccessToken,
                },
                RelyingParty: "http://auth.xboxlive.com",
                TokenType: "JWT",
            }),
    }).catch(reason => {
        console.log(reason) // 以后改为写入日志
        throw 'Xbox 身份验证失败，请检查你的帐户'
    })).body)
    return {
        xblToken: Response.Token,
        xblUhs: Response.DisplayClaims.xui[0].uhs,
    }
}

/**
 * XSTS身份验证
 * @param {String} xblToken 
 */
async function XSTSAuthenticate(xblToken) {
    return JSON.parse((await got.post('https://xsts.auth.xboxlive.com/xsts/authorize', {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body:
            JSON.stringify({
                Properties: {
                    SandboxId: "RETAIL",
                    UserTokens: [xblToken],
                },
                RelyingParty: "rp://api.minecraftservices.com/",
                TokenType: "JWT",
            }),
    }).catch(reason => {
        console.log(reason) // 以后改为写入日志
        throw 'XSTS 身份验证失败，请检查你的帐户'
    })).body).Token
}

/**
 * Minecraft身份验证
 */
async function MinecraftAuthenticate(XBLuhs, XSTStoken) {
    return JSON.parse((await got.post('https://api.minecraftservices.com/authentication/login_with_xbox', {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body:
            JSON.stringify({
                identityToken: `XBL3.0 x=${XBLuhs}; ${XSTStoken}`,
            }),
    }).catch(reason => {
        console.log(reason) // 以后改为写入日志
        throw 'XSTS 身份验证失败，请检查你的帐户'
    })).body).access_token
}

/**
 * 检查是否有正版
 */
async function CheckGame(minecraftAccessToken) {
    await got.get('https://api.minecraftservices.com/entitlements/mcstore', {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${minecraftAccessToken}`,
        },
    }).catch(reason => {
        console.log(reason) // 以后改为写入日志
        throw '无法获取游戏档案，可能是还没有购买'
    })
}

/**
 * 获取档案信息
 */
async function getPlayerInfomations(minecraftAccessToken) {
    return JSON.parse((await got.get('https://api.minecraftservices.com/minecraft/profile', {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${minecraftAccessToken}`,
        },
    }).catch(reason => {
        console.log(reason) // 以后改为写入日志
        throw '无法获取游戏档案，详细信息请查看启动器日志'
    })).body)
}

/**
 * 微软登录，可以使用授权码或刷新令牌
 * @param {String | null} code 授权码
 * @param {String | null} refreshToken 刷新令牌
 */
async function microsoftlogin(code, refreshToken) {
    console.log('开始微软登录流程')
    const event = getEventObj()
    var Step1
    event.reply('ms-login-progress', '第 1 步，共 6 步')
    if (typeof refreshToken === 'string') {
        console.log('(1/6) 刷新令牌 -> 授权令牌')
        Step1 = await getAccessTokenFromRefreshToken(refreshToken)
    } else {
        console.log('(1/6) 授权码 -> 授权令牌')
        Step1 = await getAccessToken(code)
    }
    const AccessToken = Step1.access_token
    const RefreshToken = Step1.refresh_token
    console.log("(2/6) 授权令牌 -> xbox身份验证");
    event.reply('ms-login-progress', '第 2 步，共 6 步')
    const Step2 = await XboxAuthenticate(AccessToken)
    const XBLtoken = Step2.xblToken
    const XBLuhs = Step2.xblUhs
    console.log('(3/6) XSTS身份验证')
    event.reply('ms-login-progress', '第 3 步，共 6 步')
    const XSTStoken = await XSTSAuthenticate(XBLtoken)
    console.log('(4/6) Minecraft身份验证')
    event.reply('ms-login-progress', '第 4 步，共 6 步')
    const MinecraftAccessToken = await MinecraftAuthenticate(XBLuhs, XSTStoken)
    console.log('(5/6) 检查是否购买了游戏')
    event.reply('ms-login-progress', '第 5 步，共 6 步')
    await CheckGame(MinecraftAccessToken)
    console.log('(6/6) 获取档案信息')
    event.reply('ms-login-progress', '第 6 步，共 6 步')
    const PlayerInfo = await getPlayerInfomations(MinecraftAccessToken)
    console.log(PlayerInfo)
    return {
        ...PlayerInfo,
        minecraftAccessToken: MinecraftAccessToken,
        refreshToken: RefreshToken // 保存它，每次登录时要用
    }
}

/**
 * 向配置文件中添加微软账户
 * @param {String} id 玩家的uuid
 * @param {String} name 玩家的名字
 * @param {String} refreshToken 刷新令牌
 * @param {String} accessToken Minecraft访问令牌
 * @param {String} skin 玩家的皮肤url
 */
function addMicrosoftAccount(id, name, refreshToken, accessToken, skin) {
    var accounts
    if (!store.has('msAccounts')) {
        accounts = []
    } else {
        if (hasAccount(id)) {
            removeMicrosoftAccount(id)
        }
        accounts = store.get('msAccounts')
    }
    accounts.push({
        id: id,
        name: name,
        skin: skin,
        refreshToken: refreshToken,
        accessToken: accessToken,
    })
    store.set('msAccounts', accounts)
}

/**
 * 移除微软账户，三个参数指定任何一个都行。推荐使用uuid
 * @param {String | null} uuid 玩家的uuid
 * @param {String | null} name 玩家的名字
 * @param {String | null} refreshToken 刷新令牌
 */
function removeMicrosoftAccount(uuid, name, refreshToken) {
    if (!store.has('msAccounts')) {
        return
    }
    var accounts = store.get('msAccounts')
    for (let index = 0; index < accounts.length; index++) {
        if (accounts[index].id === uuid ||
            accounts[index].name === name ||
            accounts[index].refreshToken === refreshToken
        ) {
            accounts.splice(index, 1)
        }
    }
    store.set('msAccounts', accounts)
}

/**
 * 获取微软账户信息，三个参数指定任何一个都行，推荐使用uuid
 * @param {String | null} uuid 玩家的uuid
 * @param {String | null} name 玩家的名字
 * @param {String | null} refreshToken 刷新令牌
 */
function getAccountInfo(uuid, name, refreshToken) {
    if (!store.has('msAccounts')) {
        return null
    }
    var accounts = store.get('msAccounts')
    for (let index = 0; index < accounts.length; index++) {
        if (accounts[index].id === uuid ||
            accounts[index].name === name ||
            accounts[index].refreshToken === refreshToken
        ) {
            return accounts[index]
        }
    }
}

/**
 * 查询账户是否存在
 * @param {String} uuid 玩家的uuid
 * @returns {Boolean} 是否有此账户
 */
function hasAccount(uuid) {
    if (!store.has('msAccounts')) {
        return false
    }
    var accounts = store.get('msAccounts')
    var hasAccount = false
    for (let index = 0; index < accounts.length; index++) {
        if (accounts[index].id === uuid) {
            hasAccount = true
        }
    }
    if (hasAccount) {
        return true
    } else {
        return false
    }
}

/**
 * 刷新某一账户的访问令牌
 */
async function refreshAccessToken(refreshToken) {
    const AccessToken = await microsoftlogin(null, refreshToken)
    const Accounts = store.get('msAccounts')
    for (let index = 0; index < Accounts.length; index++) {
        if (Accounts[index].refreshToken === refreshToken) {
            Accounts[index].accessToken = AccessToken
        }
    }
    store.set('msAccounts', Accounts)
}

/**
 * 获取帐户列表
 */
function getAccounts() {
    if (!store.has('msAccounts')) {
        return []
    }
    return store.get('msAccounts')
}
/**
 * 刷新皮肤
 */
async function refreshSkin() {
    // 即将到来
}
export {
    microsoftlogin,
    refreshAccessToken,
    addMicrosoftAccount,
    removeMicrosoftAccount,
    getAccountInfo,
    hasAccount,
    getAccounts
}