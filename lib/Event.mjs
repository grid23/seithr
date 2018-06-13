"use strict"

import { ERR_EVENT_NOT_IMPLEMENTED } from "./error.mjs"
import store from "./store.mjs"

export const sdetail = new Object(Symbol())
export const sevent = new Object(Symbol())
export const sondom = new Object(Symbol())
export const soriginaltarget = new Object(Symbol())
export const sphase = new Object(Symbol())

export default class Event {
    static from(event){
        if ( !(event instanceof Event) && !(event instanceof window.Event) )
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

    static get NONE(){ return window.Event.NONE }
    static get CAPTURING_PHASE(){ return window.Event.CAPTURING_PHASE }
    static get AT_TARGET(){ return window.Event.AT_TARGET  }
    static get BUBBLING_PHASE(){ return window.Event.BUBBLING_PHASE }
    static get BROADCAST_PHASE(){ return window.Event.BUBBLING_PHASE + 1 }

    constructor(type, { bubbles=true, cancelable=true, composed=false, detail=null }={}){
        const event = document.createEvent("Event")
        event.initEvent(type, bubbles, cancelable)

        store.set(this, new WeakMap)
        store.get(this).set(sdetail, Object.seal(detail))
        store.get(this).set(sevent, event)
        store.set(event, this) // x-reference
    }

    get originalEvent(){ return store.get(this).get(sevent) }

    get bubbles(){ return this.originalEvent.bubbles }
    get cancelable(){ return this.originalEvent.cancelable }

    get currentTarget(){
        const domnode = this.originalEvent.currentTarget
        return store.get(this).get(sondom) ? store.get(domnode) : domnode
    }
    get deepPath(){
        const dompath = this.originalEvent.deepPath
        return !dompath ? dompath
               : store.get(this).get(sondom) ? dompath.map(node => store.get(node))
               : dompath
    }
    get detail(){ return store.get(this).get(sdetail) || (this.originalEvent.detail?this.originalEvent.detail:null) }
    get eventPhase(){ return store.get(this).get(sphase) || this.originalEvent.eventPhase }
    get explicitOriginalTarget(){ return this.originalTarget }
    get originalTarget(){
        const domnode = this.originalEvent.originalTarget
        return store.get(this).has(soriginaltarget) ? store.get(this).get(soriginaltarget)
               : store.get(this).get(sondom) ? store.get(domnode)
               : domnode
    }
    get relatedTarget(){
      const domnode = this.originalEvent.relatedTarget
      return store.get(this).get(sondom) ? store.get(domnode) : domnode
    }
    get target(){
        const domnode = this.originalEvent.target
        return store.get(this).get(sondom) ? store.get(domnode) : domnode
    }

    stop() { return this.originalEvent.stopPropagation() }
    stopImmediate() { return this.originalEvent.stopImmediatePropagation() }
}


// "use strict"
//
// import { ERR_EVENT_NOT_IMPLEMENTED } from "./error.mjs"
// import store from "./store.mjs"
//
// export const sdetail = new Object(Symbol())
// export const sondom = new Object(Symbol())
// export const soriginaltarget = new Object(Symbol())
// export const sphase = new Object(Symbol())
//
// export default class Event extends window.Event {
//     static get [Symbol.species]() { return Event }
//
//     static from(event){
//         if ( !(event instanceof Event) && !(event instanceof window.Event) )
//           throw new Error(ERR_EVENT_NOT_IMPLEMENTED)
//
//         const From = event.constructor
//         const to = new From(event.type, event)
//         Object.setPrototypeOf(to, Event.prototype)
//         Object.keys(From.prototype)
//         .forEach(property => {
//             if ( Event.prototype.hasOwnProperty(property) )
//               return
//             Object.defineProperty(to, property, Object.getOwnPropertyDescriptor(From.prototype, property))
//         })
//
//         store.set(to, new WeakMap)
//         store.get(to).set(sdetail, Object.seal(event.detail||null))
//         if ( event.target ) store.get(to).set(soriginaltarget, event.target)
//         return to
//     }
//
//     static get NONE(){ return window.Event.NONE }
//     static get CAPTURING_PHASE(){ return window.Event.CAPTURING_PHASE }
//     static get AT_TARGET(){ return window.Event.AT_TARGET  }
//     static get BUBBLING_PHASE(){ return window.Event.BUBBLING_PHASE }
//     static get BROADCAST_PHASE(){ return window.Event.BUBBLING_PHASE + 1 }
//
//     constructor(type, { bubbles=true, cancelable=true, composed=false, detail=null }={}){
//         super(type, { bubbles, cancelable, composed })
//         store.set(this, new WeakMap)
//         store.get(this).set(sdetail, Object.seal(detail))
//     }
//
//     get currentTarget(){
//         const domnode = super.currentTarget
//         return store.get(this).get(sondom) ? store.get(domnode) : domnode
//     }
//     get deepPath(){
//         const dompath = super.deepPath
//         return !dompath ? dompath
//                : store.get(this).get(sondom) ? dompath.map(node => store.get(node))
//                : dompath
//     }
//     get detail(){ return store.get(this).get(sdetail) || (super.detail?super.detail:null) }
//     get eventPhase(){ return store.get(this).get(sphase) || super.eventPhase }
//     get explicitOriginalTarget(){ return this.originalTarget }
//     get originalTarget(){
//         const domnode = super.originalTarget
//         return store.get(this).has(soriginaltarget) ? store.get(this).get(soriginaltarget)
//                : store.get(this).get(sondom) ? store.get(domnode)
//                : domnode
//     }
//     get relatedTarget(){
//       const domnode = super.relatedTarget
//       return store.get(this).get(sondom) ? store.get(domnode) : domnode
//     }
//     get stop() { return this.stopPropagation }
//     get stopImmediate() { return this.stopImmediatePropagation }
//     get target(){
//         const domnode = super.target
//         return store.get(this).get(sondom) ? store.get(domnode) : domnode
//     }
// }
