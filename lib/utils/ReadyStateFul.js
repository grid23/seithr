"use strict"

import { ERR_READYSTATEFUL_NOT_IMPLEMENTED } from "errors"
import Event from "events/Event"
import store from "store"

export const sfrom = new Object(Symbol("from"))
export const sreadystate = new Object(Symbol("readystate"))
export const sto = new Object(Symbol("to"))

export class ReadyStateChange extends Event {
    static TYPE = "readystatechange"

    constructor({ from, to }) {
        super(ReadyStateChange.type, { bubbles: true, cancelable: false })
        store.get(this).set(sfrom, from)
        store.get(this).set(sto, to)
    }

    get from() { return store.get(this).get(sfrom) }
    get to() { return store.get(this).get(sto) }
}

export default class ReadyStateFul {
    static events = {
        readystatechange: ReadyStateChange.TYPE
    }

    static get UNINITIALIZED() { return 0b0 }
    static get [0b0]() { return "UNINITIALIZED" }
    static readyStateChange(rsf, to) {
        if ( !(rsf instanceof ReadyStateFul) )
          throw new TypeError(ERR_READYSTATEFUL_NOT_IMPLEMENTED)
        const from = rsf.readyState || ReadyStateFul.UNINITIALIZED
        store.get(rsf).set(sreadystate, to)
        rsf.dispatchEvent(new ReadyStateChange({ from, to }))
    }

    get readyState() { return store.get(this).get(sreadystate) || ReadyStateFul.UNINITIALIZED }
}
