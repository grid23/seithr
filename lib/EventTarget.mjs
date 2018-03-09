"use strict"

import dummy from "./dummy.mjs"
import { Event as nEvent, MessageChannel } from "./window.mjs"
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
    }

    addBroadcastListener(...args){ return Reflect.apply(store.get(sbroadcastChannel).addEventListener, store.get(sbroadcastChannel), args) }
    addEventListener(...args){ return Reflect.apply(store.get(this).get(sdummy).addEventListener, store.get(this).get(sdummy), args) }

    broadcastEvent(event, { relatedTarget, originalTarget }={}){
        return this.dispatchEvent(event, { target: store.get(sbroadcastChannel), relatedTarget, originalTarget:this }, true)
    }
    dispatchEvent(event, { relatedTarget, originalTarget } = {}, broadcast=false){
        if ( (event && event.eventPhase > Event.NONE) || event instanceof nEvent )
          event = Event.from(event)

        return new EventDispatcher().dispatch(event, {
            target: this, relatedTarget, originalTarget
        }, broadcast)
    }

    removeBroadcastListener(...args){ return Reflect.apply(store.get(sbroadcastChannel).removeEventListener, store.get(sbroadcastChannel), args) }
    removeEventListener(...args){ return Reflect.apply(store.get(this).get(sdummy).removeEventListener, store.get(this).get(sdummy), args) }
}
