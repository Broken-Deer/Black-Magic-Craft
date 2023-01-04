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
