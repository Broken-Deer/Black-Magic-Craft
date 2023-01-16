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

const transitionStyle = 'all 300ms cubic-bezier(0.75, -0.01, 0.2, 1)';
export default {
    components: { cardHeader, /* collapseTransition */ },
    data() {
        let margin;
        typeof this.margin == "string" ? (margin = this.margin.split(",")) : (margin = "");
        return {
            cardStyle: `margin: ${margin[0]}px ${margin[1]}px ${margin[2]}px ${margin[3]}px;flex: ${this.flex}`,
            bodyClass: this.flexStart ? 'card-body flex-start' : 'card-body',
            bodyStyle: `width: ${this.width}px;height: ${this.height}px;${this.isSwaped ? "height: 0;overflow: hidden;" : ""};`,
            content: this.padding ? `margin: ${this.padding[0]}px ${this.padding[1]}px ${this.padding[2]}px ${this.padding[3]}px;` : '',
            contentClass: this.isSwaped ? "dont_display" : "",
            /**
             * 表示卡片现在是否折叠
             */
            isSwapping: !!this.isSwaped,
        };/* :style="bodyStyle" */
    },
    template: /* html */ `
    <div :class="cardClass" :style="cardStyle">
    <card-header @click="card($event)" v-if="this.cardHeader" :title="title" :description="description" :icon="icon" :canSwap="canSwap" :logoPixelated="logoPixelated"></card-header>
    <Transition
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter"
        @before-leave="beforeLeave"
        @leave="leave"
        @after-leave="afterLeave"
        >
    <div :class="bodyClass" v-show="!isSwapping" :style="bodyStyle" >
        <div :style="content" :class="contentClass">
        <slot></slot>
        </div>
    </div>
    </Transition>
    </div>
    `,
    computed: {
        cardClass() {
            return this.isSwapping ? "card not-expanded" : "card"
        }
    },
    methods: {
        test() {
            alert(1)
        },
        beforeEnter(el) {
            $(el.firstElementChild).removeClass('dont_display')
            el.style.transition = transitionStyle;
            el.style.height = 0;
        },
        enter(el) {
            const height = $(el.firstElementChild).outerHeight(true);
            el.style.height = `${height}px`;
            console.log(el.style.height)
            el.style.overflow = 'hidden';
        },
        afterEnter(el) {
            el.style.transition = '';
            el.style.height = '';
            el.style.overflow = ''
        },
        beforeLeave(el) {
            el.style.transition = transitionStyle;
            const height = $(el.firstElementChild).outerHeight(true);
            el.style.height = `${height}px`;
            el.style.overflow = 'hidden';
        },
        leave(el) {
            el.style.height = 0;
            el.parentNode.firstElementChild.style['border-bottom'] = '1px solid #00000017'
        },
        afterLeave(el) {
            el.style.transition = '';
            el.style.height = '';
            el.parentNode.firstElementChild.style['border-bottom'] = ''
        },
        card() {
            this.isSwapping = !this.isSwapping
        },
    },
    props: {
        title: String,
        description: String,
        canSwap: Boolean,
        isSwaped: {
            type: Boolean,
            default: false,
        },// 表示卡片一开始是否折叠
        width: String,
        height: String,
        margin: String,
        flex: String,
        icon: String,
        logoPixelated: Boolean,
        flexStart: Boolean,
        cardHeader: {
            type: Boolean,
            default: true,
        },
        padding: Array,
    },
};
