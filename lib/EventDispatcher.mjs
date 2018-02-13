"use strict"

import { ERR_EVENT_NOT_IMPLEMENTED, ERR_EVENT_TARGET_IS_NOT_VALID } from "./error.mjs"
import Event from "./Event.mjs"
import { Node as nNode, Event as nEvent } from "./window.mjs"
import store from "./store.mjs"
import { sbroadcastChannel } from "./EventTarget.mjs"
import { sondom, sphase, soriginaltarget } from './Event.mjs'
import { sdummy } from "./Node.mjs"

export default class EventDispatcher {
    static get [Symbol.species]() { return EventDispatcher }

    constructor(){
        store.set(this, new WeakMap)
    }

    broadcast(event, targets){
        return this.dispatch(event, targets, true)
    }

    dispatch(event, {target, relatedTarget, originalTarget}={}, broadcast=false){
        if ( (!(event instanceof Event) && !(event instanceof nEvent)) || !store.has(event) )
          throw new Error(ERR_EVENT_NOT_IMPLEMENTED)

        relatedTarget && store.get(event).set(srelatedtarget, relatedTarget)
        originalTarget && store.get(event).set(soriginaltarget, originalTarget || target)

        if ( target instanceof nNode ) {
            store.get(event).set(sondom, false)
            return target.dispatchEvent(event)
        }

        if ( !store.has(target) )
          throw new Error(ERR_EVENT_TARGET_IS_NOT_VALID)

        store.get(event).set(sondom, true)

        const r_value = store.get(target).get(sdummy).dispatchEvent(event)

        if ( broadcast )
            store.get(event).set(sphase, Event.BROADCAST_PHASE),
            store.get(sbroadcastChannel).port1.dispatchEvent(event)

        return r_value
    }
}
