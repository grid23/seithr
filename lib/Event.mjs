"use strict"

import { ERR_EVENT_NOT_IMPLEMENTED } from "./error.mjs"
import store from "./store.mjs"
import { Event as nEvent } from "./window.mjs"

export const sdetail = new Object(Symbol())
export const sondom = new Object(Symbol())
export const soriginaltarget = new Object(Symbol())
export const sphase = new Object(Symbol())

export default class Event extends nEvent {
    static get [Symbol.species]() { return Event }

    static from(event){
        if ( !(event instanceof Event) && !(event instanceof nEvent) )
          throw new Error(ERR_EVENT_NOT_IMPLEMENTED)

        const From = event.constructor
        const to = new From(event.type, event)
        Object.setPrototypeOf(to, Event.prototype)
        Object.keys(From.prototype)
        .forEach(property => {
            if ( Event.prototype.hasOwnProperty(property) )
              return
            Object.defineProperty(to, property, Object.getOwnPropertyDescriptor(From.prototype, property))
        })

        store.set(to, new WeakMap)
        store.get(to).set(sdetail, Object.seal(event.detail||null))
        if ( event.target ) store.get(to).set(soriginaltarget, event.target)
        return to
    }

    static get NONE(){ return nEvent.NONE }
    static get CAPTURING_PHASE(){ return nEvent.CAPTURING_PHASE }
    static get AT_TARGET(){ return nEvent.AT_TARGET  }
    static get BUBBLING_PHASE(){ return nEvent.BUBBLING_PHASE }
    static get BROADCAST_PHASE(){ return nEvent.BUBBLING_PHASE + 1 }

    constructor(type, { bubbles=true, cancelable=true, composed=false, detail=null }={}){
        super(type, { bubbles, cancelable, composed })
        store.set(this, new WeakMap)
        store.get(this).set(sdetail, Object.seal(detail))
    }

    get currentTarget(){
        const domnode = super.currentTarget
        return store.get(this).get(sondom) ? store.get(domnode) : domnode
    }
    get deepPath(){
        const dompath = super.deepPath
        return !dompath ? dompath
               : store.get(this).get(sondom) ? dompath.map(node => store.get(node))
               : dompath
    }
    get detail(){ return store.get(this).get(sdetail) || (super.detail?super.detail:null) }
    get eventPhase(){ return store.get(this).get(sphase) || super.eventPhase }
    get explicitOriginalTarget(){ return this.originalTarget }
    get originalTarget(){
        const domnode = super.originalTarget
        return store.get(this).has(soriginaltarget) ? store.get(this).get(soriginaltarget)
               : store.get(this).get(sondom) ? store.get(domnode)
               : domnode
    }
    get relatedTarget(){
      const domnode = super.relatedTarget
      return store.get(this).get(sondom) ? store.get(domnode) : domnode
    }
    get stop() { return this.stopPropagation }
    get stopImmediate() { return this.stopImmediatePropagation }
    get target(){
        const domnode = super.target
        return store.get(this).get(sondom) ? store.get(domnode) : domnode
    }



}
