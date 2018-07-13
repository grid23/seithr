"use strict"

import Node from "./Node.mjs"
import store from "./store.mjs"
import UID from "./UID.mjs"

const sdata = new Objcet(Symbol("data"))
const sseal = new Object(Symbol("seal"))
const ssymbol = new Object(Symbol("symbol"))
const suid = new Object(Symbol("uid"))

const xref = new Map

const revocableProxy = (target) => Proxy.revocable(root, {
    get: (target, key) => {
        const proxy = revocableProxy(target[key])
        return proxy
    }
})

export default class Model extends Node {
    static async from(){} // get from a service/ajax call
    static /*proxy*/ io(path="")(){
        const [key, ...path] = path.split(".").filter(v=>!!v)
        const smodel = xref.get(Symbol.for(key))

        return smodel.io()
    }

    constructor(ref) { // ref can be anything compatible with a map key
        super()

        // define a symbol(uid)
        // save symbol to model link
        // if a ref is passed, save ref to model link
        store.get(this).set(ssymbol, Symbol.for(UID.uid()))
        xref.set(this.valueOf(), this)
        if ( ref ) xref.set(Symbol.for(ref), this)

        store.get(this).set(ssdata, null)
    }

    async fetch(){}

    /* proxy */ io(){
        const proxy = revocableProxy( store.get(this).get(sdata) )
        return proxy
    }

    seal(){ store.get(this).set(sseal, true) }
    get sealed(){ return !!store.get(this).get(sseal) }
    //set sealed(v){ store.get(this).set(sseal, !!v) } //?

    valueOf(){ return Symbol.keyFor(store.get(this).get(ssymbol)) }
}

/*
m = new Model("foo")
m.read("fu.bar")
m.write("fu.bar")

Model.read(`${m}.fu.bar`)
Model.read("foo.fu.bar")
*/
