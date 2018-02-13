"use strict"

import ReadyStateFul from "./ReadyStateFul.mjs"
import store from "./store.mjs"

export const sdataproxyhandler = new Object(Symbol())
export const sdataset = new Object(Symbol())

const dataProxyHandler = model => {
    return Proxy.revocable(store.get(model).get(sdataset), {
        get: (target, property) => {
            if ( Reflect.apply(Object.prototype.hasOwnProperty, target, [property]) )
              return valueProxyHandler(model, [], property)
        }
      , set: (target, property, value) => {
            target[property] = target[property] || null
            valueProxyHandler(model, [], property)
        }
    })
}

const valueProxyHandler = (model, chain, property) => {
    return Proxy.revocable({}, {
        get: (target, property) => {

        }
      , set: (target, property, value) => {

        }
    })
}

const dummy = {
    foo: {
        bar: ["a", "b"]
      , biz: { a: "a", b: "b" }
      , fu: { 0: "a", 1: "b", length: 2 }
    }
  , bar: {
        a: "foobar"
      , b: "foobiz"
    }
}

export default class Model extends ReadyStateFul {
    static get [Symbol.species]() { return Model }

    static get UNINITIALIZED() { return 0b0 }
    static get [0b0]() { return "UNINITIALIZED" }
    static get INITIALIZED() { return 0b1 }
    static get [0b1]() { return "INITIALIZED" }

    constructor(set){
        super()
        //store.get(this).set(sdataset, Object.create(null))
        store.get(this).set(sdataset, dummy)
        store.get(this).set(sdataproxyhandler, dataProxyHandler(this))
        ReadyStateFul.readyStateChange(this, Model.INITIALIZED)
    }

    get data(){ return store.get(this).get(sdataproxyhandler) }
}


/*
    const m = new Model({ foo: "bar" })
    const n = m.appendChild(new Model({ bar: "foo" }))

    n.read("foo", "bar", (err, { foo, bar}) => {

    })

    n.data.foo //bar
    n.data.bar //foo

*/
