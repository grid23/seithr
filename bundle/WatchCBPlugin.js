"use strict"

const plugins = new WeakMap
const scb = new Object(Symbol())

module.exports = class WatchCBPlugin {
    constructor(cb){
        plugins.set(this, new WeakMap)
        this.cb = cb
    }

    get cb(){ return plugins.get(this).get(scb) }
    set cb(cb){ plugins.get(this).set(scb, cb || Function.prototype) }

    apply(compiler){
        compiler.plugin("done", stats => {
            const errors = stats.compilation.errors

            if ( errors && errors.length ) this.cb(errors, stats)
            else this.cb(null, stats)
        })
        compiler.plugin("failed", err => this.cb(err))
        compiler.plugin("compilation", (compilation, params) => {
            compilation.plugin("succeed-module", ({userRequest:from}) => { })
            compilation.plugin("failed-module", ({userRequest:from}) => { })
        })
    }
}
