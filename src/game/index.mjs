import { ipcMain } from "electron";
import { addMicrosoftAccount, getAccountInfo, getAccounts, microsoftlogin, refreshAccessToken } from "./AccountServices.mjs";

function setGameServicesDetector() {
    ipcMain.handle('ms-login', async (event, code) => {
        try {
            const result = await microsoftlogin(code, null)
            return ['complete', result]
        } catch (e) {
            return ['error', e]
        }
    })
    ipcMain.handle('refresh-access-token', async (event, uuid) => {
        try {
            const AccountInfo = await getAccountInfo(uuid, null, null)
            await refreshAccessToken(null, AccountInfo.refreshToken)
            refreshAccessToken
            return false
        } catch (e) {
            return ['error', e]
        }
    })
    ipcMain.handle('add-microsoft-account', (event, { id, name, refreshToken, accessToken }) => {
        addMicrosoftAccount(id, name, refreshToken, accessToken)
    })
    ipcMain.handle('get-accounts', () => {
        return getAccounts()
    })
}


export {
    setGameServicesDetector
}