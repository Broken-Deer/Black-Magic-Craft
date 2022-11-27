import sidebarItem from "./sidebarItem.js";

export default {
    template: /* html */ `
    <div onclick="$('#sidebar').addClass('sidebar-close');">        
    <sidebar-item title="仪表板" icon="nav-7" click="display_btn();$(document.querySelectorAll('#main>div');).attr('style', 'display:none');"></sidebar-item>
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
