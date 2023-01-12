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

import cardHeader from "./cardHeader.js";

export default {
    data() {
        let margin;
        typeof this.margin == "string" ? (margin = this.margin.split(",")) : (margin = "");
        return {
            cardStyle: `margin: ${margin[0]}px ${margin[1]}px ${margin[2]}px ${margin[3]}px;flex: ${this.flex}`,
            bodyStyle: `width: ${this.width}px;height: ${this.height}px;${this.isSwaped ? "height: 0;overflow: hidden;" : ""
                }`,
            content: this.padding ? `margin: ${this.padding[0]}px ${this.padding[1]}px ${this.padding[2]}px ${this.padding[3]}px;` : '',
            contentClass: this.isSwaped ? "dont_display" : "",
            cardClass: this.isSwaped ? "card not-expanded" : "card",
            headStyle: this.cardHeader ? "" : "display: none",
        };
    },
    template: /* html */ `
    <div :class="cardClass" :style="cardStyle">
    <card-header :title="title" :description="description" :icon="icon" :canSwap="canSwap" :style="headStyle"></card-header>
        <div class="card-body" :style="bodyStyle">
            <div :style="content" :class="contentClass">
            <slot></slot>
            </div>
        </div>
    </div>
    `,
    props: {
        title: String,
        description: String,
        canSwap: Boolean,
        isSwaped: Boolean,
        width: String,
        height: String,
        margin: String,
        flex: String,
        icon: String,
        cardHeader: {
            type: Boolean,
            default: true,
        },
        padding: Array,
    },
    components: { cardHeader },
};
