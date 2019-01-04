"use strict"

import { BUBBLES } from "env"
import dummy from "utils/dummy"
import Event from "events/Event"
import EventDispatcher from "events/EventDispatcher"
import { final, frozen } from "decorators"
import store from "store"

export const sbroadcastChannel = new Object(Symbol("broadcastchannel"))
export const sdummy = new Object(Symbol("dummy"))

store.set(sbroadcastChannel, dummy())

export default class EventTarget {
    constructor(){
        store.set(this, new WeakMap)
        store.get(this).set(sdummy, dummy())
        store.set(store.get(this).get(sdummy), this) //cross-reference
    }

    addBroadcastListener(...args){
        const nhandler = args[1]
        const handler = function(e){
            if ( store.has(e) )
              e = store.get(e)
            return nhandler(e)
        }

        store.set(args[1], handler)
        return store.get(sbroadcastChannel).addEventListener(args[0], handler, ...args.slice(2))
    }
    addEventListener(...args){
        const nhandler = args[1]
        const handler = function(e){
            if ( store.has(e) )
              e = store.get(e)
            return nhandler(e)
        }

        store.set(args[1], handler)
        return store.get(this).get(sdummy).addEventListener(args[0], handler, ...args.slice(2))
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

    removeBroadcastListener(...args){
        const nhandler = args[1]
        const handler = store.get(nhandler)

        return store.get(sbroadcastChannel).removeEventListener(args[0], handler, ...args.slice(2))
    }
    removeEventListener(...args){
        const nhandler = args[1]
        const handler = store.get(nhandler)

        return store.get(this).get(sdummy).removeEventListener(args[0], handler, ...args.slice(2))
    }
}
