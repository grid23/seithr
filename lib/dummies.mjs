"use strict"

import { client, server } from "./environment.mjs"
import EventEmitter from "events"

class Dummy extends EventEmitter {
    constructor(...args){
        super(args)
    }

    addEventListener(...args){ return Reflect.apply(EventEmitter.prototype.on, this, args) }
    get addListener(){ return null }
    dispatchEvent(...args){ return return Reflect.apply(EventEmitter.prototype.emit, this, args)}
    get emit(){ return null }
    get off(){ return null }
    get on(){ return null }
    get once(){ return null }
    removeEventListener(...args){ return Reflect.apply(EventEmitter.prototype.off, this, args) }
    get removeListener(){ return null }
}

export const getDummy(){
    if ( client )
      return document.createElement("div")
    return new Dummy
}
