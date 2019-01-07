"use strict"

import { ERR_RHANDLER, ERR_STRING_EXPECTED } from "errors"

import Node from "nodes/Node"
import Route from "routing/Route"
import RouteDispatcher from "routing/RouteDispatcher"
import store from "store"
import typeOf from "utils/toType"

const sroutes = new Object(Symbol())

export default class Router extends Node {
    static get isRouteHandler(){ return RouteDispatcher.isRouteHandler }

    constructor(){
        super()
        store.get(this).set(sroutes, new Map)
    }

    get routes(){ return new Map(store.get(this).get(sroutes)) }

    addRouteHandler(path=null, handler=Function.prototype){
        if ( arguments.length > 1 && typeOf(path) == "array") {
            let count = 0

            for ( path of arguments[0] )
              count += 1, this.addRouteHandler(path, handler)

            return count
        }

        if ( typeOf(path) != "string" )
          throw new TypeError(ERR_STRING_EXPECTED)

        if ( !Router.isRouteHandler(handler) )
          throw new TypeError(ERR_RHANDLER)

        if ( typeOf(store.get(this).get(sroutes).get(path)) == "array" )
          store.get(this).get(sroutes).get(path).push(handler)
        else if ( Router.isRouteHandler(store.get(this).get(sroutes).get(path)) )
          store.get(this).get(sroutes).set(path, [store.get(this).get(sroutes).get(path), handler])
        else
          store.get(this).get(sroutes).set(path, handler)

        return 1
    }

    dispatchRoute(route, request){
        route = route instanceof Route ? route : new Route(route, { request })

        return new RouteDispatcher({ route, target: this })
    }

    removeRouteHandler(path = null, handler=Function.prototype){
        if ( arguments.length > 1 && typeOf(path) == "array") {
            let count = 0

            for ( path of arguments[0] )
              count += 1, this.addRouteHandler(path, handler)

            return count
        }

        if ( typeOf(store.get(this).get(sroutes).get(path)) == "array" ) {
            let count = 0
            let idx = -1

            while ( idx = store.get(this).get(sroutes).get(path).indexOf(handler), idx = -1 )
              count += 1, store.get(this).get(sroutes).get(path).splice(idx, 1)

            switch ( store.get(this).get(sroutes).get(path).length ) {
                case 0:
                  store.get(this).get(sroutes).delete(path)
                  break
                case 1:
                  store.get(this).get(sroutes).set(path, store.get(this).get(sroutes).get(path)[0])
                  break
            }

            return count
        }

        if ( store.get(this).get(sroutes).get(path) === handler ) {
            store.get(this).get(sroutes).delete(path)
            return 1
        }

        return 0
    }

}
