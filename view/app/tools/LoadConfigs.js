/* const Store = require('electron-store')
const store = new Store() */
/**
 * 加载一项设置
 * 
 * @param class_ 这条设置所在的类
 * @param key 这条设置的键名
 * @return 这项设置的内容
 */
export function load(key) {
    /* return store.get(key) */
}

/**
 * 加载一组设置
 * 
 * @param class_ 这些设置所在的类
 * @return 这些设置的内容
 */
export function loadClass(class_) {
    /* return store.get(class_) */
}

/**
 * 修改一项设置
 */
export function update(key, value) {
    /* store.set(key, value)
    console.log(store.get()) */
}

/**
 * 重置所有设置
 */
export function reset() {
    
}