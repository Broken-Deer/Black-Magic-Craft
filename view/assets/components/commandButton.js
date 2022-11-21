export default {
    template: /* html */ `
        <div class="input">
            <span class="name">{{name}}</span>
            <button class="command-button"
            :onclick="click">{{text}}</button>
        </div>`,
    props: {
        name: String,
        text: String,
        click: String,
    },
};
