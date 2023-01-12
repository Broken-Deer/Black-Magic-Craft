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

import sidebarItem from "./sidebarItem.js";
import { page } from "../Apps.js";

export default {
    template: /* html */ `
    <div onclick="$('#sidebar').addClass('sidebar-close');">        
    <sidebar-item title="库" icon="nav-7" @click="changePage('WareHouse')"></sidebar-item>
    <sidebar-item title="新闻" icon="newspaper" @click="changePage('')"></sidebar-item>
    <sidebar-item title="下载" icon="nav-4" @click="changePage('downloadPage')"></sidebar-item>
    </div>
    <div onclick="$('#sidebar').addClass('sidebar-close');">
        <sidebar-item title="设置" icon="nav-5" @click="changePage('settings')"></sidebar-item>
        <sidebar-item title="更多" icon="cube" @click="change_page('#more');"></sidebar-item>
    </div>
        `,
    methods: {
        changePage(pageName) {
            if (pageName === 'downloadPage' && page.activeComponent != 'downloadPage') {
                version_list('vanilla')
            }
            if (pageName === 'settings') {
                page.transitionName = 'zoom-out'
                if ($("#sidebar").hasClass("sidebar-close")) {
                    $("#sidebar").addClass("sidebar-close");
                }
                $("#sidebar").attr("style", "width: 0px !important");
            } else {
                if (page.activeComponent === 'settings') {
                    page.transitionName = 'zoom-in'
                } else {
                    page.transitionName = 'page-winui'
                }
                $("#sidebar").attr("style", "");
            }
            console.log(page.transitionName)
            page.activeComponent = pageName
            
        }
    },
    components: { sidebarItem },
};
