"use strict"

import isSameDomain from "./isSameDomain.mjs"
import Model from "./Model.mjs"
import Node from "./Node.mjs"
import store from "./store.mjs"
import typeOf from "./toType.mjs"

const sasync = new Object(Symbol())
const scredentials = new Object(Symbol())
const shandler = new Object(Symbol())
const sheaders = new Object(Symbol())
const sjsonp = new Object(Symbol())
const slocal = new Object(Symbol())
const songoing = new Object(Symbol())
const soverridemimetype = new Object(Symbol())
const sresponsetype = new Object(Symbol())
const srequestheader = new Object(Symbol())
const stimeout = new Object(Symbol())
const stype = new Object(Symbol())
const surl = new Object(Symbol())
const swithcredentials = new Object(Symbol())
const sxdomain = new Object(Symbol())

const defaultHandler = request => [request.status, request]
export default class Service extends Node {
    static get isLocalFile(){ return isSameDomain }

    constructor(...args){
        super()

        const handler = typeOf(args[args.length-1]) == "function" ? args.pop() : defaultHandler
        const dict = typeOf(args[0]) == "object" ? args.shift()
                   : typeOf(args[0]) == "string" ? { url: args.shift() }
                   : {}

        store.set(this, new Map)
        store.get(this).set(surl, typeOf(dict.url) == "string"
                               ? dict.url
                               : void function(){ throw new TypeError(errors.TODO) }())
        store.get(this).set(sxdomain, !!dict.crossDomain || !!dict.xdomain)
        store.get(this).set(slocal, Service.isLocalFile(store.get(this).get(surl)))
        store.get(this).set(sjsonp, store.get(this).get(sxdomain) && !store.get(this).get(slocal))
        store.get(this).set(shandler, handler)
        store.get(this).set(stype, typeOf(dict.method) == "string" ? dict.method.toUpperCase() : "GET")
        store.get(this).set(sasync, !dict.sync)
        store.get(this).set(scredentials, dict.credentials && typeOf(dict.credentials.user) == "string"
                               && typeOf(dict.credentials.password) == "string"
                               ? dict.credentials
                               : null)
        store.get(this).set(swithcredentials, !!store.get(this).get(scredentials))
        store.get(this).set(stimeout, +dict.timeout || 0)
        store.get(this).set(srequestheader, typeOf(dict.headers) == "object" ? dict.headers : null)
        store.get(this).set(soverridemimetype, dict.overrideMimeType)
        store.get(this).set(sresponsetype, dict.responseType)
        store.get(this).set(songoing, null)
    }

    abort(){
        if ( store.get(this).get(songoing) )
          return store.get(this).get(songoing).abort()
    }

    async request(...args){
        const cb = typeOf(args[args.length-1]) == "function" ? args.pop() : null
        const onerr = e => { throw e }
        let request

        this.abort()

        const body = args[0] instanceof Model ? serialize(args.shift().raw)
                   : typeOf(args[0]) == "object" ? serialize(args.shift())
                   : typeOf(args[0]) == "string" ? args.shift()
                   : null

        return new Promise((resolve, reject) => {
            request = store.get(this).set(songoing, new XMLHttpRequest).get(songoing)

            request.open(store.get(this).get(stype),
                         store.get(this).get(surl),
                         store.get(this).get(sasync),
                         store.get(this).get(swithcredentials) ? store.get(this).get(scredentials).user : void 0,
                         store.get(this).get(swithcredentials) ? store.get(this).get(scredentials).password: void 0)
            request.timeout = store.get(this).get(stimeout)

            if ( store.get(this).get(sheaders) )
              Object.keys(store.get(this).get(sheaders))
                .forEach( header => request.setRequestHeader(header, store.get(this).get(sheaders)[header]) )

            if ( store.get(this).get(sxdomain) )
              request.setRequestHeader("Origin", location.protocol+"//"+location.host)

            if ( store.get(this).get(soverridemimetype) )
              request.overrideMimeType(store.get(this).get(soverridemimetype))

            request.onreadystatechange = () => {
                if ( request.readyState < 4 )
                  return

                if ( store.get(this).get(songoing) !== request )
                  return reject(new Error("todo")) //TODO

                if ( request.status >= 200 && request.status < 400 )
                  resolve()
                else
                  reject(new Error(request.status))
            }

            request.onerror = e => reject(e)
            request.ontimeout = e => reject(new Error("timeout"))
            request.send(body)
        })
        .catch(e => e)
        .then(e => {
            if ( cb )
              cb.apply(e||null, [].concat(e||null, store.get(this).get(shandler).call(this, request)))

            if ( store.get(this).get(songoing) === request)
              store.get(this).set(songoing, null)
            return request
        })
    }
}
