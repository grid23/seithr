"use strict"

import { Update as MUpdate } from "./Model.mjs"
import Event from "./Event.mjs"
import Node from "./Node.mjs"
import store from "./store.mjs"
import typeOf from "./toType.mjs"

const smodel = new Object(Symbol())
const srefs = new Object(Symbol())
const stimer = new Object(Symbol())
const stree = new Object(Symbol())
const supdates = new Object(Symbol())
const svars = new Object(Symbol())

export class Update extends Event {
    static get TYPE(){ return "update" }
    constructor(){ super(Update.TYPE) }
}

export default class ZTemplate extends Node {
    constructor({ model, tree, refs, updates, vars }){
        super()
        store.get(this).set(smodel, model)
        store.get(this).set(srefs, refs)
        store.get(this).set(stimer, null)
        store.get(this).set(stree, tree)
        store.get(this).set(supdates, updates)
        store.get(this).set(svars, vars)

        this.model.addEventListener(MUpdate.TYPE, ({target, keys}) => {
          if ( target !== this.model )
            return

          keys = keys.filter(key => this.vars.has(key) )

          if ( keys.length )
            this.update(keys)
        })
    }

    get model(){ return store.get(this).get(smodel) }
    get references(){ return this.refs }
    get refs(){ return store.get(this).get(srefs) }
    get tree(){ return store.get(this).get(stree) }
    get updates(){ return store.get(this).get(supdates) }
    get vars(){ return store.get(this).get(svars) }

    update(...args){
        const cb = typeOf(args[args.length-1]) == "function" ? args.pop() : null
        const keys = typeOf(args[0]) == "array" ? args.shift()
                   : typeOf(args[0]) === "set" ? [...args.shift()]
                   : this.vars

        let values = this.model.get(keys)
        values = typeOf(values) == "array" ? values : [values]

        const data = keys.length ? values.reduce((acc, value, idx) => (acc[keys[idx]] = value, acc), {}) : {}

        if ( keys.length )
          this.updates.forEach(fn => fn(data))

        this.dispatchEvent(new Update)
    }

}
