"use strict"

import store from "./store.mjs"
import ZExpression from "ZExpression2.mjs"


const operators = new Map
const traversals = new Map



const scapture = new Object(Symbol())
const scurrent = new Object(Symbol())
const spile = new Object(Symbol())
const soperator = new Object(Symbol())
const ssource = new Object(Symbol())
const straversal = new Object(Symbol())
class Stream {
    constructor(expression/*, parser*/) {
        store.set(this, new WeakMap)
    }

    get capture(){ return store.get(this).get(scapture) }
    set capture(v){ store.get(this).set(scapture, !!v) }
    get current(){ return store.get(this).get(scurrent) }
    get done(){ return this.current.done }
    get glyph(){ return this.current.value }
    get operator(){ return store.get(this).get(soperator) }
    set operator(v){ store.get(this).set(soperator, v) }
    get pile(){ return store.get(this).get(spile)  }
    set pile(v){ store.get(this).set(spile, v)  }
    get source(){ return store.get(this).get(ssource) }
    get traversal(){ return store.get(this).get(straversal) }
    set traversal(v){ store.get(this).set(straversal, v) }

    next(){
        store.get(this).set(scurrent, this.source.next())
        return this.done
    }
}

const stree = new Object(Symbol())
class Template {
    constructor(){
        store.set(this, new WeakMap)
        store.get(this).set(stree, document.createDocumentFragment)
    }

    get refs(){}
    get tree(){ return store.get(this).get(stree) }
    // get updates(){}
    // get vars(){}
}

export default class ZParser {

    parse(expression = new ZExpression){
        const stream = new Stream(expression/*, this*/)
        const template = new Template

        while ( stream.next(), !stream.done ) {

        }
    }
}


/*
    div > ul > li > view
*/
