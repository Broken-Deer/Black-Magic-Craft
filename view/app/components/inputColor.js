export default {
    template: /* html */ `
        <div class="input input-text">
            <span class="name">{{name}}</span>
            <div class="input-color">
                <input type="color" id="input_a" v-bind:title="name"
                    v-bind:placeholder="placeholder" required />
            </div>
        </div>`,
    props: {
        name: String,
    },
};
