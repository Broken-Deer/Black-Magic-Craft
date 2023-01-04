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

export const commandButton = {
    template: /* html */ `
        <div class="input">
            <span class="name">{{name}}</span>
            <button class="command-button"
            :onclick="click">{{text}}</button>
        </div>`,
    props: {
        name: String,
        text: String,
        click: String,
    },
};
export const commandButtonMini = {
    template: /* html */ `
            <button class="command-button"
            :onclick="click">{{text}}</button>
        `,
    props: {
        text: String,
    },
};
