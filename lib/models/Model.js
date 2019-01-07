"use strict"

import ModelChange from "models/ModelChange"
import Node from "nodes/Node"
import store from "store"

export const sdata = new Object(Symbol("data"))
export const soverflow = new Object(Symbol("overflow"))
export const spath = new Object(Symbol("path"))
export const sseal = new Object(Symbol("seal"))
export const sstrictseal = new Object(Symbol("strictseal"))
export const ssymbol = new Object(Symbol("symbol"))

const dispatchUpdate = (model, path) =>
  model.dispatchEvent(new ModelChange(path)) //sync event

const xref = new Map
let revocable = null

const noop = strictlySealed => () => !strictlySealed

const revocableMeta = (model, target, path, opts={}) => {
    const traps = {
        get: (target, key) => {
            if ( Reflect.apply(Object.prototype.hasOwnProperty, target, [key]) )
              return target[key]
            return revocableMeta(model, target, [...path, key], opts)
        }
      // TODO make the following compatible with proxy-polyfill
      // , defineProperty:noop(true), deleteProperty:noop(true)
      // , preventExtensions:noop(true)
      , set:noop(true)
    }

    const { revoke, proxy } = Proxy.revocable(Object.create({}, {
        model: { enumerable: true, configurable:true, value: model }
      , path: { enumerable: true, configurable:true, value: path}
    }), traps)

    if ( revocable )
      revocable()
    revocable = () => setTimeout(revoke, 4)

    return proxy
}

const revocableProxy = (model, target, path, opts={}) => {
    const traps = {
        get: (target, key) => {
        // if the requested property is object like, return a proxy to that object
            if ( target[key] instanceof Object && !target[key].hook )
              return revocableProxy(model, target[key], [...path, key], opts)
        // if requested property is a function, return the result of that function
            else if ( typeof target[key] == "function" )
              return Reflect.apply(target[key], model, [])
        // if the requested property is primitive value, return the primitive (no proxy)
            else if ( Reflect.apply(Object.prototype.hasOwnProperty, target, [key]) )
              return target[key]
        // if the current value is object like, and the requested property doesn't exist and the node has a parent
        // push the request to the parent
            else if ( target instanceof Object && model.overflow && model.parentNode  )
              try {
                  let candidate = model.parentNode.io

                  for ( const curr of [...path, key] )
                    candidate = candidate[curr]
                  return candidate
              } catch(e){} //TODO

            return undefined
        }
      // TODO make the following compatible with proxy-polyfill
      // , defineProperty: (target, key, descriptor) => {
      //       const rv  = Object.defineProperty(target, key, descriptor)
      //       !opts.silent && dispatchUpdate(model, [...path, key])
      //       return rv // must return true/false depending on success/failure
      //   }
      // , deleteProperty: (target, property) => {
      //       if ( property in target)
      //         delete target[property]
      //       !opts.silent && dispatchUpdate(model, [...path])
      //       return true
      //
      //   }
      , set: (target, key, value) => {
            if ( opts.hook ) {
                if ( typeof value !== "function" )
                  return false

                Object.defineProperties(value, {
                    toJSON: { value: () => undefined }
                  , hook: { value: true }
                })
            }

            target[key] = value
            !opts.silent && dispatchUpdate(model, [...path, key])

            return true // return true/false depending on success/failure
        }
    }

    if ( model.sealed )
      // TODO make the following compatible with proxy-polyfill
      // traps.defineProperty = traps.deleteProperty =
      // traps.preventExtensions =
      traps.set =
      noop(model.strictlySealed)

    const { revoke, proxy } = Proxy.revocable(target, traps)

    if ( revocable )
      revocable()
    revocable = () => setTimeout(revoke, 4)

    return proxy
}

// export const events = {
//     modelchange: ModelChange.TYPE
// }

export default class Model extends Node {
    static events = {
        change: ModelChange.TYPE
      , modelchange: ModelChange.TYPE
    }
    // static get events(){ return events }

    static async from(){} // get from a service/ajax call

    static ref(ref){  return xref.get(Symbol.for(ref)) }

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

    constructor({ref, overflow=true, seal=false, strictseal=false}={}) { // ref can be anything compatible with a map key
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

        if ( seal || strictseal )
          this.seal(strictseal)
    }

    async fetch(){} //fetch data from a XMLHttpRequest ( Service )

    get hook(){
        if ( store.get(this).get(sdata) instanceof Object )
          return revocableProxy(this, store.get(this).get(sdata), [], {hook:true})
        return store.get(this).get(sdata)
    }

    /* proxy */ get io(){
      if ( store.get(this).get(sdata) instanceof Object )
        return revocableProxy(this, store.get(this).get(sdata), [])
      return store.get(this).get(sdata)
    }
    set io(v){
        store.get(this).set(sdata, v)
        dispatchUpdate(this, [])
    }

    /* proxy */ get m(){
        return revocableMeta(this, store.get(this).get(sdata), [], {})
    }
    /* proxy */ get meta(){ return this.m }

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
    toString(){ return this.valueOf() }
    valueOf(){ return Symbol.keyFor(store.get(this).get(ssymbol)) }
}
