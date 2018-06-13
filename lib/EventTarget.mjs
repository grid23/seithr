"use strict"

import dummy from "./dummy.mjs"
import Event from "./Event.mjs"
import EventDispatcher from "./EventDispatcher.mjs"
import store from "./store.mjs"

export const sbroadcastChannel = new Object(Symbol())
export const sdummy = new Object(Symbol())

store.set(sbroadcastChannel, dummy())

export default class EventTarget {
    static get [Symbol.species]() { return EventTarget }

    constructor(){
        store.set(this, new WeakMap)
        store.get(this).set(sdummy, dummy())
        store.set(store.get(this).get(sdummy), this) //cross-reference
    }

    addBroadcastListener(...args){ return Reflect.apply(store.get(sbroadcastChannel).addEventListener, store.get(sbroadcastChannel), args) }
    addEventListener(...args){
        const nhandler = args[1]
        const handler = function(e){
            if ( store.has(e) )
              e = store.get(e)
            nhandler(e)
        }

        store.set(args[1], handler)
        return Reflect.apply(store.get(this).get(sdummy).addEventListener, store.get(this).get(sdummy), [args[0], handler, ...args.slice(2)])
    }

    broadcastEvent(event, { relatedTarget, originalTarget }={}){
        return this.dispatchEvent(event, { target: store.get(sbroadcastChannel), relatedTarget, originalTarget:this }, true)
    }
    dispatchEvent(event, { relatedTarget, originalTarget } = {}, broadcast=false){
        if ( (event && event.eventPhase > Event.NONE) || (event instanceof window.Event && !(event instanceof Event)) )
          event = Event.from(event)

        return new EventDispatcher().dispatch(event, {
            target: this, relatedTarget, originalTarget
        }, broadcast)
    }

    removeBroadcastListener(...args){ return Reflect.apply(store.get(sbroadcastChannel).removeEventListener, store.get(sbroadcastChannel), args) }
    removeEventListener(...args){
        const nhandler = args[1]
        const handler = store.get(nhandler)

        return Reflect.apply(store.get(this).get(sdummy).removeEventListener, store.get(this).get(sdummy), [args[0], handler, ...args.slice(2)])
    }
}
