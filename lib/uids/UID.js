"use strict"

import { final } from "decorators"
import store from "store"

const def_chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
const def_map = "Fxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx"
const def_radix = 16
const def_regexp = /[xy]/g

const schars = new Object(Symbol())
const smap = new Object(Symbol())
const sradix = new Object(Symbol())
const sregexp = new Object(Symbol())

export default class UID {
    @final
    static get CHARS(){ return def_chars }

    @final
    static get MAP(){ return def_map }

    @final
    static get RADIX(){ return def_radix }

    @final
    static get REGEXP(){ return def_regexp }

    @final
    static uid({ chars=UID.CHARS, map=UID.MAP, radix=UID.RADIX, regexp=UID.REGEXP } = {}){ return new UID({ chars, map, radix, regexp }).generate() }

    constructor({ chars=UID.CHARS, map=UID.MAP, radix=UID.RADIX, regexp=UID.REGEXP } = {}){
        store.set(this, new WeakMap)
        store.get(this).set(schars, chars)
        store.get(this).set(smap, map)
        store.get(this).set(sradix, radix)
        store.get(this).set(sregexp, regexp)
    }

    @final
    get chars(){ return store.get(this).get(schars) }

    @final
    get map(){ return store.get(this).get(smap) }

    @final
    get radix(){ return store.get(this).get(sradix) }

    @final
    get regexp(){ return store.get(this).get(sregexp) }

    @final
    generate(){
        return this.map.replace(this.regexp, (c, r) => {
            r = (Date.now() + Math.random()*this.radix)%this.radix |0
            if ( c === "y") r = (r & 0x3)|0x8
            return this.chars[r]
        })
    }
}
