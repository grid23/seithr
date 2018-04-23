"use strict"

import { ERR_READYSTATEFUL_NOT_IMPLEMENTED } from "./error.mjs"
import Node from "./Node.mjs"
import store from "./store.mjs"
import ReadyStateChange from "./ReadyStateChange.mjs"

export const sreadystate = new Object(Symbol())

export default class ReadyStateFul extends Node {
    static get [Symbol.species]() { return ReadyStateFul }
    static get UNINITIALIZED() { return 0b0 }
    static get [0b0]() { return "UNINITIALIZED" }
    static readyStateChange(rsf, to) {
        if ( !(rsf instanceof ReadyStateFul) )
          throw new TypeError(ERR_READYSTATEFUL_NOT_IMPLEMENTED)
        const from = rsf.readyState || ReadyStateFul.UNINITIALIZED
        store.get(rsf).set(sreadystate, to)
        rsf.dispatchEvent(new ReadyStateChange({ from, to }))
    }

    constructor() { super() }
    get readyState() { return store.get(this).get(sreadystate) || ReadyStateFul.UNINITIALIZED }
}
