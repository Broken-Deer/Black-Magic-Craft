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

import { inputText } from "./components/controller/inputText.js";
import { checkbox } from "./components/controller/checkbox.js";
import cardHeader from "./components/cardHeader.js";
import loading from "./components/loading.js";
import { commandButton, commandButtonMini } from "./components/commandButton.js";
import sidebarItem from "./components/sidebarItem.js";
import sliderBar from "./components/controller/sliderBar.js";
import card from "./components/card.js";
import { listItem, listItemButton } from "./components/listItem.js";

import WareHouse from "./components/page/WareHouse.js";
import downloadPage from "./components/page/DownloadPage.js";
import settings from "./components/page/Settings.js";

import sidebar from "./components/sidebar.js";
// import { dialogs } from "./components/dialogs.js";
import zh_cn from "./i18n/zh_cn.js";
/* import { a } from "./components/dialogs.js"; */
$(document).ready(function () {
    ipc.send('dcl')
});
/* updateGamelist();
setInterval(() => {
    try {
        updateGamelist();
    } catch (e) {}
}, 500); */

Vue.createApp({
    data() {
        return zh_cn;
    },
    components: {
        card,
        inputText,
        checkbox,
        cardHeader,
        loading,
        commandButton,
        sidebarItem,
        sliderBar,
        commandButtonMini,
        listItem,
        listItemButton,
    },
}).mount("#win");

Vue.createApp({
    template: /* template */ `
<sidebar></sidebar>
    `,
    components: { sidebar }
}).mount(".sidebar-links");
export const page = Vue.createApp({
    data() {
        return {
            transitionName: 'page-winui',
            activeComponent: 'WareHouse',
        }
    },
    template: `
    <Transition :name="transitionName" mode="out-in">
        <component :is="activeComponent"></component>
    </Transition>
        `,
    components: { downloadPage, settings, WareHouse },
}).mount("#main");
/* Vue.createApp({
    template:  `
<ms-login></ms-login>
<game-install></game-install>
<color-chooser></color-chooser>
`,
    components: {
        msLogin,
        gameInstall,
        colorChooser,
    },
}).mount(".dialogs"); */

/* const a = Vue.createApp(dialogs).mount("#dialog");
a.openDialog() */

/* Vue.createApp(a).mount("#dialog") */