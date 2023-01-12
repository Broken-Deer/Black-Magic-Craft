export default {
    data() {
        let margin;
        typeof this.margin == "string" ? (margin = this.margin.split(",")) : (margin = "");
        return {
            cardStyle: `margin: ${margin[0]}px ${margin[1]}px ${margin[2]}px ${margin[3]}px;flex: ${this.flex}`,
        }
    },
    template: /* template */`
    <div class="card not-expanded card-command-button" :style="cardStyle">
    <div class="card-header">
    <div class="card-title">
      <div class="card-icon"><i :class="icon"></i></div>
      <div>
          <h4 id="text">{{ title }}</h4>
          <p id="text">{{ description }}</p>
      </div>
      </div>
      <div style="width: 36px;height: 36px;display: flex;align-items: center;justify-content: center;"><i class="chevron-right"></i></div>
  </div></div>
    `,
    props: {
        title: String,
        description: String,
        icon: String,
        margin: String,
    },
}