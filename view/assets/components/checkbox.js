export default {
    template: /* html */ `            
    <div class="input input-checkbox">
        <span class="name">{{name}}</span>
        <div class="input-box">
            <label>
                <input type="checkbox" :onclick="click"/>
                <span>
                    <div class="button"></div>
                </span>
            </label>
        </div>
    </div>
`,
    props: {
        name: String,
        id: String,
        click: String
    },
};
