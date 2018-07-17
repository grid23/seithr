"use strict"

import store from "./store.mjs"

const def_chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
const def_map = "Fxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx"
const def_radix = 16
const def_regexp = /[xy]/g

const schars = new Object(Symbol())
const smap = new Object(Symbol())
const sradix = new Object(Symbol())
const sregexp = new Object(Symbol())

export default class UID {
    static get CHARS(){ return def_chars }
    static get MAP(){ return def_map }
    static get RADIX(){ return def_radix }
    static get REGEXP(){ return def_regexp }
    static uid({ chars, map, radix, regexp } = {}){ return new UID({ chars, map, radix, regexp }).generate() }

    constructor({ chars=UID.CHARS, map=UID.MAP, radix=UID.RADIX, regexp=UID.REGEXP } = {}){
        store.set(this, new WeakMap)
        store.get(this).set(schars, chars)
        store.get(this).set(smap, map)
        store.get(this).set(sradix, radix)
        store.get(this).set(sregexp, regexp)
    }

    get chars(){ return store.get(this).get(schars) }
    get map(){ return store.get(this).get(smap) }
    get radix(){ return store.get(this).get(sradix) }
    get regexp(){ return store.get(this).get(sregexp) }

    generate(){
        return this.map.replace(this.regexp, (c, r) => {
            r = (Date.now() + Math.random()*this.radix)%this.radix |0
            if ( c === "y") r = (r & 0x3)|0x8
            return this.chars[r]
        })
    }
}
