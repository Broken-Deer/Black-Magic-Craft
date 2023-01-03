export const listItem = {
    data() {
        return {
            listItemStyle: this.click ? "" : "pointer-events: none;",
            logoStyle: this.logo ? `background-image:url(${this.logo})` : "display: none",
        };
    },
    template: /* template */ `
    <li class="list-item" style="listItemStyle">
        <div>
            <div class="logo" :style="logoStyle"></div>
            <div>
                <h4>{{title}}</h4>
                <p>{{description}}</p>
            </div>
        </div>
        <div>
            <slot></slot>
        </div>
    </li>
    `,
    props: {
        logo: String,
        title: String,
        description: String,
        click: Boolean,
    },
};
export const listItemButton = {
    data() {
        return {
            classes: `${this.icon} list-item-btn`,
        };
    },
    template: /* template */ `
    <i :class="classes"></i>
    `,
    props: {
        icon: String,
    },
};
