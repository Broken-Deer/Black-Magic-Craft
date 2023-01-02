import cardHeader from "./cardHeader.js";

export default {
    data() {
        let margin;
        typeof this.margin == "string" ? (margin = this.margin.split(",")) : (margin = "");
        return {
            cardStyle: `margin: ${margin[0]}px ${margin[1]}px ${margin[2]}px ${margin[3]}px;flex: ${this.flex}`,
            bodyStyle: `width: ${this.width}px;height: ${this.height}px;${
                this.isSwaped ? "height: 0;overflow: hidden;" : ""
            }`,
            cardClass: this.isSwaped ? "card not-expanded" : "card",
            headStyle: this.cardHeader ? "" : "display: none",
        };
    },
    template: /* html */ `
    <div :class="cardClass" :style="cardStyle">
    <card-header :title="title" :description="description" :icon="icon" :canSwap="canSwap" :style="headStyle"></card-header>
        <div class="card-body" :style="bodyStyle">
            <div>
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
    },
    components: { cardHeader },
};
