"use strict"

import ReadyStateFul from "./ReadyStateFul.mjs"
import store from "./store.mjs"
import { Worker as nWorker, Blob } from "./window.mjs"

export const schildprocess = new Object(Symbol())
export const surl =  new Object(Symbol())

export default class Worker extends ReadyStateFul {
    static get UNINITIALIZED() { return 0b0 }
    static get [0b0]() { return "UNINITIALIZED" }
    static get INITIALIZED() { return 0b1 }
    static get [0b1]() { return "INITIALIZED" }
    static get DISCONNECTED() { return 0b10 }
    static get [0b10]() { return "DISCONNECTED" }

    static get RWORKERBODY(){
        return /^function worker([^\(]*)\(\)([^\(]*)\{([\s\S]*)\}$/im
    }
    static get MIMETYPE(){
        return "application/javascript"
    }

    constructor() { super() }

    get child_process() { return store.get(this).get(schildprocess) }
    get cp() { return this.child_process }
    get url() { return store.get(this).get(surl) }

    async spawn(worker){
        if ( this.readyState !== Worker.UNINITIALIZED )
          throw new Error(ERR_CANNOT_BE_REUSED)

        return (typeof worker === "function" ? new Promise(resolve => {
            const body = Worker.RWORKERBODY.exec(worker.toString())[3]
            const blob  = new Blob([body], { type: Worker.MIMETYPE })
            const url = URL.createObjectURL(blob)
            resolve(url)
        }) : new Promise(resolve => {
            const dummy = document.createElement("a")
            dummy.href = worker.toString()
            resolve(dummy.href)
        })).then((url) => {
            store.get(this).set(surl, url)
            store.get(this).set(schildprocess, new Worker(this.url))
            ReadyStateFul.readyStateChange(this, Worker.INITIALIZED)
            return this
        })
    }

    terminate() {
        if ( this.cp ) this.cp.terminate()
        store.get(this).delete(surl)
        store.get(this).delete(schildprocess)
        ReadyStateFul.readyStateChange(this, Worker.DISCONNECTED)
    }
}
