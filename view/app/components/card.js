/**
 * 卡片
 */
export default {
    data() {
        let margin;
        if (typeof this.margin == "string") {
            margin = this.margin.split(",");
        } else {
            margin = ""
        }
        return {
            cardStyle: `margin: ${margin[0]}px ${margin[1]}px ${margin[2]}px ${margin[3]}px;flex: ${this.flex}`,
            bodyStyle: `width: ${this.width}px;height: ${this.height}px;`,
        };
    },
    template: /* html */ `
    <div class="card" :style="cardStyle">
    <div class="card-header"><p>{{title}}</p><div><i></i></div></div>
    <div class="card-body" :style="bodyStyle"><slot></slot> </div>
  </div>
    `,
    props: {
        title: String,
        canSwap: Boolean,
        isSwaped: Boolean,
        width: String,
        height: String,
        margin: String,
        flex: String,
    },
};
