import { load, update } from "../tools/LoadConfigs.js";

export const checkbox = {
    data() {
        return {
            checked: load(this.config),
        };
    },
    template: /* html */ `            
    <div class="input input-checkbox">
        <span class="name">{{name}}</span>
        <div class="input-box">
            <label>
                <input type="checkbox" :onclick="click" @input="updateData" v-model="checked"/>
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
        config: String,
    },
    methods: {
        updateData() {
            update(this.config, !this.check);
        },
    },
};
export const checkboxMini = {
    data() {
        return {
            checked: load(this.config),
        };
    },
    template: /* html */ `            
        <div class="input-box">
            <label>
                <input type="checkbox" @input="execute" v-model="checked"/>
                <span>
                    <div class="button"></div>
                </span>
            </label>
        </div>
    `,
    props: {
        call: Function,
    },
    methods: {
        execute() {
            this.call()
        },
    },
};
