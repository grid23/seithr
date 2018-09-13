"use strict"

import store from "./store.mjs"

const sstring = new Object(Symbol())

export default class ZExpression {

    constructor(expression="div"){
        store.set(this, new WeakMap)
        store.get(this).set(sstring, expression.toString())
    }

    get string(){ return store.get(this).get(sstring) }

    toStream(){ return this.string[Symbol.iterator]() }

    valueOf(){ return store.get(this).get(sstring) }
}
