import f from 'fs-extra'
import util from "util"
import exe from 'child_process'

const copydir = util.promisify(f.copy)
const exec = util.promisify(exe.exec)

export {
    copydir,
    exec
}