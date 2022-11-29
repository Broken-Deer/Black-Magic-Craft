import { load, update } from "../tools/LoadConfigs.js";

export default {
    data() {
        var conf = load(this.config);
        var value;
        if (typeof conf == "string") {
            value = conf;
        } else {
            value = "";
        }
        return {
            value: value,
        };
    },
    template: /* html */ `
        <div class="input input-text">
            <span class="name">{{name}}</span>
            <div class="input-data">
                <input type="text" id="input_a" :title="name" :placeholder="placeholder" @input="updateData" required v-model="value"/>
                <div class="underline"></div>
            </div>
        </div>`,
    props: {
        name: String,
        placeholder: String,
        config: String,
    },
    methods: {
        updateData() {
            console.log(this.value)
            update(this.config, this.value);
        },
    },
};
