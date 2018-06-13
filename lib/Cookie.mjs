"use strict"

import { ERR_STRING_EXPECTED } from "./error.mjs"
import { Change } from "./Model.mjs"
import Event from "./Event.mjs"
import Model from "./Model.mjs"
import store from "./store.mjs"
import typeOf from "./toType.mjs"

const sdomain = new Object(Symbol())
const sexpires = new Object(Symbol())
const sfrombrowser = new Object(Symbol())
const spath = new Object(Symbol())
const sname = new Object(Symbol())
const ssession = new Object(Symbol())

const LIFESPAN = 15552000000
const TOP_DOMAIN = (() => {
    const cookiestr = "__itestcookie=testcookie"
    const cookie = domain => {
        document.cookie = cookiestr+"; domain="+domain

        if ( document.cookie.indexOf(cookiestr) != -1 ) {
            document.cookie = cookiestr+"; domain="+domain+"; expires=" + new Date( +(new Date) - 1000 ).toUTCString()
            return true
        }

        return false
    }

    const split = location.hostname.split(".")

    let curr = ""
    let i = split.length
    let hit = false

    while (i--)
      if ( curr == split.slice(i).join("."), hit = cookie(curr), hit )
        return curr
})()

export class Sync extends Event {
    static get TYPE(){ return "sync" }

    constructor(from_browser=false){
        super(Sync.Type)
        store.get(this).set(sfrombrowser, from_browser)
    }

    get source(){ return store.get(this).get(sfrombrowser) ? "browser" : "model" }
}

export default class Cookie extends Model {

    static get COOKIE_ENABLED(){ return navigator.cookieEnabled }
    static get TOP_DOMAIN(){ return TOP_DOMAIN }

    constructor({ name=null, path="/", domain=Cookie.TOP_DOMAIN, expires, maxAge, session=false } = {}){
        super()
        if ( typeOf(name) != "string" )
          throw new Error(ERR_STRING_EXPECTED)

        store.get(this).set(sdomain, typeOf(domain) == "string" ? domain : Cookie.TOP_DOMAIN)
        store.get(this).set(sexpires, !!session ? ""
                                    : !isNaN( +(new Date(expires)) ) ? new Date(expires).toUTCString()
                                    : new Date( +(new Date) + (+maxAge||LIFESPAN) ).toUTCString())
        store.get(this).set(sname, name)
        store.get(this).set(spath, typeOf(path) == "string" ? path : "/")
        store.get(this).set(ssession, !!session)

        this.sync(true)

        window.addEventListener("focus", e => this.sync(true))
        this.addEventListener(Change.TYPE, () => this.sync(false))
    }

    get COOKIE_ENABLED(){ return Cookie.COOKIE_ENABLED }
    get TOP_DOMAIN(){ return Cookie.TOP_DOMAIN }

    get domain(){ return store.get(this).get(sdomain) }
    get expires(){ return store.get(this).get(sexpires) }
    get path(){ return store.get(this).get(spath) }
    get name(){ return store.get(this).get(sname) }
    get session(){ return store.get(this).set(ssession) }

    clear(){
        Object.keys(this.data).forEach(property => this.remove(property))
    }

    sync(from_browser=false){
        if ( from_browser ) {
            const exists = document.cookie.match(store.get(this).get(sname)+"=([^;]*)")
            let data

            if ( exists ) {
                try {
                    data = JSON.parse(unescape(exists[1]))
                } catch(e) {
                    console.error(e)
                    data = {}
                }
            }

            this.set(data)
            this.dispatchEvent(new Sync(true))
            return
        }

        const string = escape(JSON.stringify(this.raw))

        if ( string.length )
          document.cookie = [this.name, "=", string, "; domain=", this.domain, "; path=", this.path, ";", this.session?"":"expires="+this.expires+";"].join("")
        else
          document.cookie = [this.name, "=0; domain=", this.domain, "; path=", this.path, "; expires=", new Date( +(new Date) - 1000 ).toUTCString(), ";"].join("")

        this.dispatchEvent(new Sync(true))
        return
    }


}
