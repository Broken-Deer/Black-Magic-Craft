import { load, update } from "../LoadConfigs.js";

export default {
    data() {
        const config = load(this.config);
        var value;
        typeof config === "number" ? (value = config) : (value = this.min);
        return {
            value: value,
        };
    },
    template: /* template */ `
    <div class="input input-text input-slider">
    <span class="name">{{name}}</span>
    <div style="display: flex; line-height: 1.7;width: 100%;justify-content: flex-end;">
      <div class="slider">
          <div :style="orbit"></div>
          <input ref="element" type="range" :max="max" :min="min" :step="step" v-model="value" @input="updateData">
      </div>
      <div class="input-data mini">
        <input type="text" :title="name"
          required v-model="value" placeholder="默认" @blur="onBlur"/>
        <div class="underline"></div>
      </div>
      <span class="text">{{text}}</span>
    </div>
  </div>`,
    props: {
        name: String,
        placeholder: String,
        config: String,
        max: String,
        min: String,
        step: String,
        text: String,
        AllowExceeding: String,
    },
    methods: {
        onClick() {
            alert(1);
        },
        onBlur() {
            if (!/^\d+$/.test(this.value)) this.value = this.min;
            if (this.value - 1 - this.min < 0) this.value = this.min;
        },
        updateData() {
            update(this.config, Number(this.value));
        },
    },
    computed: {
        orbit() {
            if (this.value > this.max - this.min) {
                if (this.AllowExceeding != "allow") {
                    this.value = this.max;
                }
                return `width: 240px`;
            }
            if (this.value - 1 - this.min < 0) {
                return `width: 0px`;
            } else if (((this.value - 1 - this.min) / (this.max - this.min)) * 240 > 240) {
                return `width: 240px`;
            } else {
                return `width: ${((this.value - 1 - this.min) / (this.max - this.min)) * 230 + 10}px`;
            }
        },
    },
};
