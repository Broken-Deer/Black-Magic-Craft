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
                    <div></div>
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
                    <div></div>
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
