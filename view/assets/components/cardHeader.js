export default {
    template: /* html */ `
        <div class="card-header">
          <div class="card-title">
            <div class="card-icon"><i :class="icon"></i></div>
            <div>
                <h4 id="text">{{ title }}</h4>
                <p id="text">{{ description }}</p>
            </div>
          </div>
          <div class="card-button" onclick="expanded_card(this)"><i></i></div>
        </div>`,
    props: {
        title: String,
        description: String,
        icon: String,
    },
};
