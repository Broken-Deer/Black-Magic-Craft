let time = new Date().getTime()
import('./main.mjs')
console.log('导入模块用时', new Date().getTime() - time, 'ms')
