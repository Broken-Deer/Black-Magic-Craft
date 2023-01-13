export default {
    template: /* template */ `
    <div class="progress" :style="widthStyle">
    <div class="progress-bar" :style="loadingStyle"></div>
    <div class="progress-loading" :style="loadingStyle"></div>
    <progress max="100" :value="value" :style="progresStyle"></progress>
</div>
    `,
    props: {
        loading: Boolean,
        value: String,
        width: {
            type: String,
            default: '100'
        },
    },
    computed: {
        widthStyle() {
            return `width: ${this.width}px`
        },
        progresStyle() {
            return this.loading ? `display: none` : ''
        },
        loadingStyle() {
            return this.loading ? `` : `display: none`
        }
    }
} 

console.log(114514)