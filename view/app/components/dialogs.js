import colorChooser from "./dialog/colorChooser.js";
import gameInstall from "./dialog/gameInstall.js";
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
    <game-install></game-install>
    `,
    components: {
        colorChooser,
        gameInstall,
        msLogin,
    },
    props: {
        name: String,
        text: String,
    },
    methods: {
        openDialog(name) {
            $('#dialog > *').attr('style', 'display: none')
            $(`#${name}`).attr('style', '')
            $(".dialog").addClass("dialog_display");
        },
        closeDialog() {
            $(".dialog").removeClass("dialog_display");
        }
    },
}).mount("#dialog");
