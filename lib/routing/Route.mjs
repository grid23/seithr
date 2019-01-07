"use strict"

import { ERR_FN_EXPECTED, ERR_STRING_EXPECTED } from "errors"
import store from "store"
import typeOf from "utils/toType"

const scancelable = new Object(Symbol())
const scancelled = new Object(Symbol())
const sdetail = new Object(Symbol())
export const shrt = new Object(Symbol())
export const smatches = new Object(Symbol())
const spath = new Object(Symbol())
const sresponse = new Object(Symbol())
const srequest = new Object(Symbol())
export const sstate = new Object(Symbol("state"))
export const starget = new Object(Symbol())
export const stimestamp = new Object(Symbol())
const swait = new Object(Symbol())

export default class Route {
    static get states(){
        return Object.seal({
            UNINITIALIZED: 0
          , INITIALIZED: 1
          , PAUSED: 2
          , STOPPED: 3
          , RUNNING: 4
        })
    }

    constructor(path, {cancelable=true, request=null, response=null, detail=null} = {}){
        store.set(this, new WeakMap)

        if ( typeOf(path) != "string" )
          throw new TypeError(ERR_STRING_EXPECTED)
        store.get(this).set(spath, path)
        store.get(this).set(sdetail, detail)
        store.get(this).set(sresponse, response)
        store.get(this).set(srequest, request)

        store.get(this).set(scancelable, !!cancelable)
        store.get(this).set(sstate, Route.states.INITIALIZED)
        store.get(this).set(stimestamp, null)

    }

    get cancelable(){ return store.get(this).get(scancelable) }
    get cancelled(){ return store.get(this).get(scancelled) || false }
    set cancelled(v){ store.get(this).set(scancelled, !!v) }
    get detail(){ return store.get(this).get(sdetail) }
    get hirestimestamp(){ return store.get(this).get(shrt) }
    get hrt(){ return this.hirestimestamp }
    get matches(){ return store.get(this).get(smatches) }
    get path(){ return store.get(this).get(spath) }
    get response(){ return store.get(this).get(sresponse) }
    get request(){ return store.get(this).get(srequest) }
    get state(){ return store.get(this).get(sstate) || Route.states.UNINITIALIZED }
    get target(){ return store.get(this).get(starget) }
    get timestamp(){ return store.get(this).get(stimestamp) }


    preventDefault(){ return this.cancelled = true }

    async wait(fn){
        if ( typeOf(fn) == "function" ) {
          store.get(this).set(sstate, Route.states.PAUSED)
          store.get(this).set(swait, new Promise(resolve => fn(resolve))
          .then(() => {
              store.get(this).set(sstate, Route.states.INITIALIZED)
              store.get(this).delete(swait)
          }))
        }

        return await (store.get(this).get(swait) || Promise.resolve() )
    }

}
