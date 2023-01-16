import colorChooser from "./dialog/colorChooser.js";
import msLogin from "./dialog/msLogin.js";

export const dialogs = Vue.createApp({
    data() {
        return {
            activeComponent: 'a'
        }
    },
    template: /* html */ `
    <color-chooser></color-chooser>
    <ms-login></ms-login>
    `,
    components: {
        colorChooser,
        msLogin,
    },
    props: {
        name: String,
        text: String,
    },
    methods: {
        openDialog(name) {
            $('#dialog > *').attr('style', 'display: none')
            $(".dialog").addClass("dialog_display");
            setTimeout(() => {
                $(`#${name}`).attr('style', '')
            }, 100);
        },
        closeDialog() {
            $(".dialog").removeClass("dialog_display");
        }
    },
}).mount("#dialog");
