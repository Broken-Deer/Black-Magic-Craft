import { load, update } from "../LoadConfigs.js";

export var inputText = {
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
                <input type="text" :title="name" :placeholder="placeholder" @input="updateData" required v-model="value"/>
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
            console.log(this.value);
            update(this.config, this.value);
        },
    },
};
export var inputTextMini = {
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
    <div class="input-data mini">
    <input type="text" :title="name" :placeholder="placeholder"
    @input="updateData" required v-model="value" />
    <div class="underline"></div>
  </div>`,
    props: {
        name: String,
        placeholder: String,
        config: String,
    },
    methods: {
        updateData() {
            console.log(this.value);
            update(this.config, this.value);
        },
    },
};
