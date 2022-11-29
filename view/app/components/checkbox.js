import { load, update } from "../tools/LoadConfigs.js";

export default {
    data() {
        return {
            "check": load(this.config)
        }
    },
    template: /* html */ `            
    <div class="input input-checkbox">
        <span class="name">{{name}}</span>
        <div class="input-box">
            <label>
                <input type="checkbox" :onclick="click" @input="updateData" v-model="check"/>
                <span>
                    <div class="button"></div>
                </span>
            </label>
        </div>
    </div>
`,
    props: {
        name: String,
        click: String,
        config: String
    },
    methods: {
        updateData() {
            update(this.config, !this.check)
            console.log(load(this.config))
        },
    },
};
