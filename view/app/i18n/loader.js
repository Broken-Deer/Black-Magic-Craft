const lang = 'zh_cn'


export default function loadlanguage(lang) {
    import(`./${lang}.js`)
}