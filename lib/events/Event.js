"use strict"

import { final } from "decorators"
import { ERR_EVENT_NOT_IMPLEMENTED } from "errors"
import store from "store"

export const sdetail = new Object(Symbol("detail"))
export const sevent = new Object(Symbol(""))
export const sondom = new Object(Symbol())
export const soriginaltarget = new Object(Symbol())
export const sphase = new Object(Symbol())

export default class Event {
    // static from(event){
    //     if ( !(event instanceof Event) && !(event instanceof window.Event) )
    //       throw new Error(ERR_EVENT_NOT_IMPLEMENTED)
    //
    //     const From = event.constructor
    //     const to = new From(event.type, event)
    //     Object.setPrototypeOf(to, Event.prototype)
    //     Object.keys(From.prototype)
    //     .forEach(property => {
    //         if ( Event.prototype.hasOwnProperty(property) )
    //           return
    //         Object.defineProperty(to, property, Object.getOwnPropertyDescriptor(From.prototype, property))
    //     })
    //
    //     store.set(to, new WeakMap)
    //     store.get(to).set(sdetail, Object.seal(event.detail||null))
    //
    //     if ( event.target ) store.get(to).set(soriginaltarget, event.target)
    //     return to
    // }

    @final
    static get NONE(){ return window.Event.NONE }
    @final
    static get CAPTURING_PHASE(){ return window.Event.CAPTURING_PHASE }
    @final
    static get AT_TARGET(){ return window.Event.AT_TARGET  }
    @final
    static get BUBBLING_PHASE(){ return window.Event.BUBBLING_PHASE }
    @final
    static get BROADCAST_PHASE(){ return window.Event.BUBBLING_PHASE + 1 }

    constructor(type, { bubbles=true, cancelable=true, composed=false, detail=null }={}){
        const event = document.createEvent("Event")
        event.initEvent(type, bubbles, cancelable)

        store.set(this, new WeakMap)
        store.get(this).set(sdetail, Object.seal(detail))
        store.get(this).set(sevent, event)
        store.set(event, this) // x-reference
    }

    @final
    get originalEvent(){ return store.get(this).get(sevent) }

    @final
    get bubbles(){ return this.originalEvent.bubbles }

    @final
    get cancelable(){ return this.originalEvent.cancelable }

    @final
    get currentTarget(){
        const domnode = this.originalEvent.currentTarget
        return store.get(this).get(sondom) ? store.get(domnode) : domnode
    }

    @final
    get deepPath(){
        const dompath = this.originalEvent.deepPath
        return !dompath ? dompath
               : store.get(this).get(sondom) ? dompath.map(node => store.get(node))
               : dompath
    }

    @final
    get defaultPrevented(){  return this.originalEvent.defaultPrevented }

    @final
    get detail(){ return store.get(this).get(sdetail) || (this.originalEvent.detail?this.originalEvent.detail:null) }

    @final
    get eventPhase(){ return store.get(this).get(sphase) || this.originalEvent.eventPhase }

    @final
    get explicitOriginalTarget(){ return this.originalTarget }

    @final
    get originalTarget(){
        const domnode = this.originalEvent.originalTarget
        return store.get(this).has(soriginaltarget) ? store.get(this).get(soriginaltarget)
               : store.get(this).get(sondom) ? store.get(domnode)
               : domnode
    }

    @final
    get relatedTarget(){
      const domnode = this.originalEvent.relatedTarget
      return store.get(this).get(sondom) ? store.get(domnode) : domnode
    }

    @final
    get target(){
        const domnode = this.originalEvent.target
        return store.get(this).get(sondom) ? store.get(domnode) : domnode
    }

    @final
    get type(){ return this.originalEvent.type }

    @final
    preventDefault() { return this.originalEvent.preventDefault() }

    @final
    stop() { return this.originalEvent.stopPropagation() }

    @final
    stopImmediate() { return this.originalEvent.stopImmediatePropagation() }
}
