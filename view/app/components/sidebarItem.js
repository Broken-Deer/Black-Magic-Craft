export default {
    template: /* html */ `
        <li class="sidebar-item">
          <span class="sidebar" :onclick="click">
            <i class="fa-regular nav-icon" :id="icon"></i>
            <p>{{title}}</p>
          </span>
        </li>`,
    props: {
        title: String,
        icon: String,
        click: String,
    },
};
