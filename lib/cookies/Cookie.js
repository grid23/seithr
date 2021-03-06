"use strict"

import { bound, final, frozen } from "decorators"
import { ERR_STRING_EXPECTED } from "errors"
import Model from "models/Model"
import Event from "events/Event"
import store from "store"
import typeOf from "utils/toType"

const sdomain = new Object(Symbol("domain"))
const sexpires = new Object(Symbol("expires"))
const sfrombrowser = new Object(Symbol("frombrowser"))
const spath = new Object(Symbol("path"))
const sname = new Object(Symbol("name"))
const ssession = new Object(Symbol("session"))

const LIFESPAN = 15552000000
export const TOP_DOMAIN = (() => {
    const cookiestr = "__seithrtest=testcookie"
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
    static get TYPE(){ return "cookiesync" }

    constructor(from_browser=false){
        super(Sync.TYPE)
        store.get(this).set(sfrombrowser, from_browser)
    }

    get source(){ return store.get(this).get(sfrombrowser) ? "browser" : "model" }
}

export default class Cookie extends Model {
    @frozen
    static events = {
        sync: Sync.TYPE
    }
    //static get events(){ return { Sync } }
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
        this.addEventListener(Model.events.change, () => this.sync(false))
    }

    get COOKIE_ENABLED(){ return Cookie.COOKIE_ENABLED }
    get TOP_DOMAIN(){ return Cookie.TOP_DOMAIN }

    get domain(){ return store.get(this).get(sdomain) }
    get expires(){ return store.get(this).get(sexpires) }
    get path(){ return store.get(this).get(spath) }
    get name(){ return store.get(this).get(sname) }
    get session(){ return store.get(this).set(ssession) }

    @final
    clear(){
        this.io = null
    }

    @final
    sync(from_browser=false){
        if ( from_browser ) {
            const exists = document.cookie.match(store.get(this).get(sname)+"=([^;]*)")
            let data

            try {
                if ( exists )
                  data = JSON.parse(unescape(exists[1]))
                else
                  data = {}
            } catch(e) {
                console.error(e)
                data = {}
            }

            this.io = data
            this.dispatchEvent(new Sync(true))
            return
        }

        const string = escape(JSON.stringify(this))

        if ( string.length )
          document.cookie = [this.name, "=", string, "; domain=", this.domain, "; path=", this.path, ";", this.session?"":"expires="+this.expires+";"].join("")
        else
          document.cookie = [this.name, "=0; domain=", this.domain, "; path=", this.path, "; expires=", new Date( +(new Date) - 1000 ).toUTCString(), ";"].join("")

        this.dispatchEvent(new Sync(false))
        return
    }


}
