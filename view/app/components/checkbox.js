export default {
    template: /* html */ `            
    <div class="input input-checkbox" :id="id2">
        <span class="name">{{name}}</span>
        <div class="input-box">
            <label>
                <input type="checkbox" :id="id" :onclick="click" :checked="chek"/>
                <span>
                    <div class="button"></div>
                </span>
            </label>
        </div>
    </div>
`,
    props: {
        name: String,
        id2: String,
        id: String,
        click: String,
        chek: String,
    },
};
