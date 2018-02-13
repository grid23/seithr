"use strict"

import Event from "./Event.mjs"
import store from "./store.mjs"

export const sfrom = new Object(Symbol())
export const sto = new Object(Symbol())

export default class ReadyStateChange extends Event {
    constructor({ from, to }) {
        super("readystatechange", { bubbles: true, cancelable: false })
        store.get(this).set(sfrom, from)
        store.get(this).set(sto, to)
    }

    get from() { return store.get(this).get(sfrom) }
    get to() { return store.get(this).get(sto) }
}
