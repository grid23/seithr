"use strict"

import { BUBBLES } from "env"
import { final } from "decorators"

import { ERR_EVENT_NOT_IMPLEMENTED, ERR_EVENT_TARGET_IS_NOT_VALID } from "errors"
import Event from "events/Event"
import store from "store"
import { sbroadcastChannel, sdummy } from "events/EventTarget"
import { sevent, sondom, sphase, soriginaltarget } from 'events/Event'

export default class EventDispatcher {
    @final
    static get BUBBLES(){ return BUBBLES }

    constructor(){
        store.set(this, new WeakMap)
    }

    @final
    broadcast(event, targets){
        return this.dispatch(event, targets, true)
    }

    @final
    dispatch(event, {target, relatedTarget, originalTarget}={}, broadcast=false){
        if ( (!(event instanceof Event) && !(event instanceof window.Event)) || !store.has(event) )
          throw new Error(ERR_EVENT_NOT_IMPLEMENTED)

        relatedTarget && store.get(event).set(srelatedtarget, relatedTarget)
        originalTarget && store.get(event).set(soriginaltarget, originalTarget || target)

        if ( target instanceof window.Node ) {
            store.get(event).set(sondom, false)
            return target.dispatchEvent(store.get(event).get(event.originalEvent))
        }

        if ( !store.has(target) )
          throw new Error(ERR_EVENT_TARGET_IS_NOT_VALID)

        store.get(event).set(sondom, true)

        if ( !BUBBLES ) {
            const root = store.get(store.get(target).rootNode).get(sdummy)

            if ( !document.head.contains(root) )
              document.head.appendChild(root)
        }
        const r_value = store.get(target).get(sdummy).dispatchEvent(event.originalEvent)

        if ( r_value && broadcast ) {
            store.get(event).set(sphase, Event.BROADCAST_PHASE)
            store.get(sbroadcastChannel).dispatchEvent(event.originalEvent)
        }
        console.log(r_value)
        return r_value
    }
}
