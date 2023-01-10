/*
 * Black Magic Launcher
 * Copyright (C) 2022-2023 Broken_Deer <old_driver__@outlook.com> and contributors
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import { load, update } from "../../LoadConfigs.js";

export default {
    data() {
        return {
            value: this.min
        }
    },
    template: /* template */ `
    <div class="input input-text input-slider">
    <span class="name">{{name}}</span>
    <div style="display: flex; line-height: 1.7;width: 100%;justify-content: flex-end;">
      <div class="slider">
          <div :style="orbit"></div>
          <input ref="element" type="range" :max="max" :min="min" :step="step" v-model="value" @blur="onBlur">
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
        onBlur() {
            if (!/^\d+$/.test(this.value)) this.value = this.min;
            if (this.value - 1 - this.min < 0) this.value = this.min;
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
    mounted() {
        const this_ = this;
        (async function () {
            const config = await load(this_.config);
            var value;
            typeof config === "number" ? (value = config) : (value = this_.min);
            this_.value = value
        })()
    },
};
