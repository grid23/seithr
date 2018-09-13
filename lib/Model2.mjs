"use strict"

import Event from "./Event.mjs"
import Node from "./Node.mjs"
import store from "./store.mjs"

const sdata = new Object(Symbol("data"))
const soverflow = new Object(Symbol("overflow"))
const sseal = new Object(Symbol("seal"))
const sstrictseal = new Object(Symbol("strictseal"))
const ssymbol = new Object(Symbol("symbol"))

class ModelChange extends Event {
    static get TYPE(){ return "model:change" }
    constructor(){
        super(ModelChange.TYPE)
    }
}

const dispatchUpdate = model =>
  model.dispatchEvent(new ModelChange) //sync event


const xref = new Map
let revocable = null

const noop = strictlySealed => () => !strictlySealed
const revocableProxy = (model, target, path, opts) => {
    const traps = {
        get: (target, key) => {
        // if the requested property is object like, return a proxy to that object
            if ( target[key] instanceof Object )
              return revocableProxy(model, target[key], [...path, {key, model}], opts)
        // if the requested property is primitive value, return the primitive (no proxy)
            if ( Reflect.apply(Object.prototype.hasOwnProperty, target, [key]) )
              return target[key]
        // if the current value is object like, and the requested property doesn't exist and the node has a parent
        // push the request to the parent
            if ( target instanceof Object && model.overflow && model.parentNode  )
              try {
                  let candidate = model.parentNode.io

                  for ( const {key:curr} of [...path, {key, model}] )
                    candidate = candidate[curr]
                  return candidate
              } catch(e){} //TODO

            return undefined
        }
      , defineProperty: (target, key, descriptor) => {
            const rv  = Object.defineProperty(target, key, descriptor)
            !opts.silent && dispatchUpdate(model)
            return rv // must return true/false depending on success/failure
        }
      , deleteProperty: (target, property) => {
            if ( property in target)
              delete target[property]
            !opts.silent && dispatchUpdate(model)
        }
      , set: (target, key, value) => {
            target[key] = value
            !opts.silent && dispatchUpdate(model)

            return true // return true/false depending on success/failure
        }
    }

    if ( model.sealed )
      traps.defineProperty = traps.deleteProperty =
      traps.preventExtensions = traps.set =
      noop(model.strictlySealed)

    const { revoke, proxy } = Proxy.revocable(target, traps)

    if ( revocable )
      revocable()
    revocable = () => setTimeout(revoke, 4)

    return proxy
}

export default class Model extends Node {
    static get CHANGE(){ return ModelChange.TYPE }

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
        revocable = () => setTimeout(revoke, 4)
        return proxy
    }

    constructor({ref, overflow=true}={}) { // ref can be anything compatible with a map key
        super()
        // define a symbol(uid) ( uid comes from seithr.Node
        // save symbol to model link
        // if a ref is passed, save ref to model link
        store.get(this).set(ssymbol, Symbol.for(this.uid))
        store.get(this).set(soverflow, overflow)
        xref.set(this.valueOf(), this)
        xref.set(store.get(this).get(ssymbol), this)
        if ( ref ) xref.set(Symbol.for(ref), this)

        store.get(this).set(sdata, null)
    }

    async fetch(){} //fetch data from a XMLHttpRequest ( Service )

    /* proxy */ get io(){
      if ( store.get(this).get(sdata) instanceof Object )
        return revocableProxy(this, store.get(this).get(sdata), [], {silent:false})
      return store.get(this).get(sdata)
    }
    set io(v){
        store.get(this).set(sdata, v)
        dispatchUpdate(this)
    }
    /* proxy */ get silentio(){ return revocableProxy(this, store.get(this).get(sdata), [], {silent:true}) }
    set silentio(v){ store.get(this).set(sdata, v) }

    get overflow(){ return store.get(this).get(soverflow) }
    set overflow(bool){ store.get(this).set(soverflow, !!bool) }

    seal(strict){
        store.get(this).set(sseal, true)
        store.get(this).set(sstrictseal, !!strict)
    }
    get sealed(){ return !!store.get(this).get(sseal) }
    get strictlySealed(){ return this.sealed && !!store.get(this).get(sstrictseal) }

    toJSON(){ return JSON.parse(JSON.stringify(store.get(this).get(sdata))) } //prevent access to raw object via toJSON()
    valueOf(){ return Symbol.keyFor(store.get(this).get(ssymbol)) }
}
