"use strict"

import Event from "./Event.mjs"
import Node from "./Node.mjs"
import store from "./store.mjs"
import UID from "./UID.mjs"

const sdata = new Object(Symbol("data"))
const sseal = new Object(Symbol("seal"))
const ssymbol = new Object(Symbol("symbol"))
const suid = new Object(Symbol("uid"))

class ModelChange extends Event {
    static get TYPE(){ return "modelchange" }
    constructor(){
        super(ModelChange.TYPE)
    }
}

class ModelUpdate extends Event {
    static get TYPE(){ return "modelupdate" }
    constructor(){
        super(ModelChange.TYPE)
    }
}

const dispatchUpdate = model =>
  model.dispatchEvent(new ModelChange) //sync event
    

const xref = new Map
let revocable = null

const noop = () => {}
const revocableProxy = (model, target) => {
    const handler = {
        get: (target, key) => revocableProxy(model, target[key])
      , defineProperty: (target, key, descriptor) => {
            Object.defineProperty(target, key, descriptor)
            dispatchUpdate(model)
        }
      , deleteProperty: (target, property) => {
            delete target[property]
            dispatchUpdate(model)
        }
      , set: (target, key, value) => {
            target[key] = value
            dispatchUpdate(model)
        }
    }

    if ( model.sealed )
      handler.defineProperty = handlers.deleteProperty =
      handler.preventExtensions = handlers.set =
      noop

    if ( target instanceof Object ) {
        const { revoke, proxy } = Proxy.revocable(  new Object(target), handler)

        if ( revocable )
          revocable()
        revocable = revoke
        return proxy
    } else return target
}

export default class Model extends Node {
    static get CHANGE(){ return ModelChange.TYPE }
    static get UPDATE(){ return ModelUpdate.TYPE }

    static async from(){} // get from a service/ajax call
    static /*proxy*/ get io(){
        const {proxy, revoke} = Proxy.revocable({}, {
            get: (target, key) => {
                const model = xref.get(Symbol.for(key))
                return model.io
            }
        })

        if ( revocable )
          revocable()
        revocable = revoke
        return proxy
    }

    constructor(ref) { // ref can be anything compatible with a map key
        super()
        // define a symbol(uid)
        // save symbol to model link
        // if a ref is passed, save ref to model link
        store.get(this).set(ssymbol, Symbol.for(UID.uid()))
        xref.set(this.valueOf(), this)
        xref.set(store.get(this).get(ssymbol), this)
        if ( ref ) xref.set(Symbol.for(ref), this)

        store.get(this).set(sdata, null)
    }

    async fetch(){} //fetch data from a XMLHttpRequest ( Service )

    /* proxy */ get io(){ return revocableProxy(this, store.get(this).get(sdata)) }
    set io(v){
        store.get(this).set(sdata, v)
        dispatchUpdate(this)
    }

    seal(){ store.get(this).set(sseal, true) }
    //unseal(){ store.get(this).set(sseal, false) } //?
    get sealed(){ return !!store.get(this).get(sseal) }
    //set sealed(v){ store.get(this).set(sseal, !!v) } //?

    valueOf(){ return Symbol.keyFor(store.get(this).get(ssymbol)) }
}
