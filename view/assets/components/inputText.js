export default {
    template: /* html */ `
        <div class="input input-text">
            <span class="name">{{name}}</span>
            <div class="input-data">
                <input type="text" id="input_a" :title="name" :placeholder="placeholder" required />
                <div class="underline"></div>
            </div>
        </div>`,
    props: {
        name: String,
        placeholder: String,
    },
};
