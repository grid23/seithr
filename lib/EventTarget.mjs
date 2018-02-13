"use strict"

import { Event as nEvent, MessageChannel } from "./window.mjs"
import Event from "./Event.mjs"
import EventDispatcher from "./EventDispatcher.mjs"
import Node from "./Node.mjs"
import store from "./store.mjs"
import { sdummy } from "./Node.mjs"

export const sbroadcastChannel = new Object(Symbol())

store.set(sbroadcastChannel, new MessageChannel)

export default class EventTarget extends Node {
    static get [Symbol.species]() { return EventTarget }

    constructor(){ super() }

    addBroadcastListener(...args){
        return Reflect(EventTarget.addBroadcastListener, null, args)
    }

    addBroadcastListener(...args){ return Reflect.apply(store.get(sbroadcastChannel).port1.addEventListener, store.get(sbroadcastChannel).port1, args) }
    addEventListener(...args){ return Reflect.apply(store.get(this).get(sdummy).addEventListener, store.get(this).get(sdummy), args) }


    broadcastEvent(event, { relatedTarget, originalTarget }={}){
        return this.dispatchEvent(event, { target: store.get(sbroadcastChannel).port1, relatedTarget, originalTarget:this }, true)
    }
    dispatchEvent(event, { relatedTarget, originalTarget } = {}, broadcast=false){
        if ( (event && event.eventPhase > Event.NONE) || event instanceof nEvent )
          event = Event.from(event)

        return new EventDispatcher().dispatch(event, {
            target: this, relatedTarget, originalTarget
        }, broadcast)
    }

    removeBroadcastListener(...args){ return Reflect.apply(store.get(sbroadcastChannel).port1.removeEventListener, store.get(sbroadcastChannel).port1, args) }
    removeEventListener(...args){ return Reflect.apply(store.get(this).get(sdummy).removeEventListener, store.get(this).get(sdummy), args) }
}
