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

export default {
    template: /* html */ `
    <div onclick="$('#sidebar').addClass('sidebar-close');">        
    <sidebar-item title="库" icon="nav-7" click="change_page('#home_pg');"></sidebar-item>
    <sidebar-item title="新闻" icon="newspaper" click=""></sidebar-item>
    <sidebar-item title="下载" icon="nav-4" click="change_page('#download_pg');version_list('vanilla');"></sidebar-item>
    </div>
    <div onclick="$('#sidebar').addClass('sidebar-close');">
        <sidebar-item title="设置" icon="nav-5" click="sidebar_hidden();change_page('#setting_pg');"></sidebar-item>
        <sidebar-item title="更多" icon="cube" click="sidebar_hidden();change_page('#more_pg');"></sidebar-item>
    </div>
        `,
    components: { sidebarItem },
};
