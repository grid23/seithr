"use strict"

import { ERR_NOTROUTE, ERR_ROUTE_BUSY, WARN_LATE_NEXT } from "./error.mjs"
import Event from "./Event.mjs"
import EventTarget from "./EventTarget.mjs"
import Route from "./Route.mjs"
import store from "./store.mjs"
import typeOf from "./toType.mjs"

import { shrt, smatches, sstate, starget, stimestamp } from "./Route.mjs"

const shits = new Object(Symbol())

const bundleHandlers = ({routes}) => {
    const wildcards = []
    const handlers = []

    for ( let [path, handler] of routes ) {
        if ( RouteDispatcher.isRouteHandler(handler) )
          if ( path === "*" )
            wildcards.push([path, handler])
          else
            handlers.push([path, handler])

        if ( typeOf(handler) == "array" )
          handler.forEach(function(handler){
              if ( RouteDispatcher.isRouteHandler(handler) )
                if ( path === "*" )
                  wildcards.push([path, handler])
                else
                  handlers.push([path, handler])
          })
    }

    return [...wildcards, ...handlers]
}

const cache = Object.create(null)

const getRule = str => {
    if ( !cache[str] )
      if ( str.indexOf(":") == -1 )
        cache[str] = new RegExp("^"+str+"$", "i")
      else {
        const assignments = []
        const regexp = []
        const split = []
        const join = []
        let pile = ""

        for ( let i = 0, l = str.length; i <= l; i++ )
          void function(char){
              if ( i === l ) {
                  if ( pile.length )
                    split.push(pile)
              }
              else if ( char === "/")
                split.push(pile),
                join.push(char),
                pile = ""
              else if ( char === "." && str[i+1] === ":" )
                split.push(pile),
                join.push(char),
                pile = ""
              else
                pile += char
          }( str[i] )

        while ( split.length )
          void function(){
              const part = split.shift()
              const joiner = join.shift()
              let match

              if ( part[0] === ":" ) {

                if ( match = part.match(/^:(\w+)(\(.*\))$/), match ) {
                  assignments.push(match[1])
                  regexp.push(match[2])
                } else {
                  assignments.push(part.slice(1))
                  regexp.push("([^\\"+(joiner||"\/")+"]*)")
                }

              } else {
                regexp.push(part)
              }

              joiner && regexp.push("(?:\\"+joiner+")")
          }()

        cache[str] = new RegExp("^"+regexp.join("")+"$", "i")
        cache[str].assignments = assignments
      }

    return cache[str]
}

const dispatcher = function(route, path){
    const rule = getRule(path)
    const match = route.path.match(rule)

    if ( !match )
      return false

    if ( match.length == 1 || !rule.assignments )
      return true

    return function(){
        for ( let i = 0, l = rule.assignments.length ; i < l; i++ )
          route.matches[rule.assignments[i]] = match[i+1]

        return route
    }()
}

const nexts = new WeakMap

export class Routing extends Event {
    static get TYPE(){ return "routing" }

    constructor(hit){
        super(Routing.TYPE)
        store.get(this).set(shits, hit)
    }

    get count(){ return store.get(this).get(shits) }
}

export default class RouteDispatcher extends EventTarget {
    static isRouteHandler(o){ return !!o && (typeOf(o) == "function" || typeOf(o.handleRoute) == "function" ) }

    constructor({ route, target }){
        super()

        if ( !(route instanceof Route) )
          throw new TypeError(ERR_NOTROUTE)

        if ( route.state !== Route.states.INITIALIZED )
          throw new Error(ERR_ROUTE_BUSY)

        store.get(this).set(shits, 0)

        store.get(route).set(sstate, Route.states.RUNNING)
        store.get(route).set(starget, target)
        store.get(route).set(smatches, {})
        store.get(route).set(stimestamp, Date.now())
        store.get(route).set(shrt, performance.now())

        const handlers = bundleHandlers(target)

        const onstop = () => {
            store.get(route).set(sstate, Route.states.INITIALIZED)
            this.dispatchEvent(new Routing(store.get(this).get(shits)) )
        }

        const dispatchLoop = function*(){
            while ( !!handlers.length ) {
                if ( route.state === Route.states.STOPPED )
                  return
                store.get(route).set(sstate, Route.states.RUNNING)

                const [path, handler] = handlers.shift()

                yield new Promise((resolve, reject) => {
                    const match = path === "*" || dispatcher(route, path)

                    if ( !match )
                      return resolve(0)

                    let hit = path === "*" ? 0 :  1
                    let stop = path === "*" ? false : true

                    let next = is_hit => {
                        nexts.set(route, () => console.warn(WARN_LATE_NEXT)) //can only be invoked once and during the turn of the exec time of the handler

                        stop = false
                        if ( typeOf(is_hit) == "boolean" )
                          hit = !!is_hit ? 1 : 0
                    }

                    nexts.set(route, next)
                    const nextProxy = (...args) => Reflect.apply(nexts.get(route), null, args)

                    if ( handler.handleRoute )
                      handler.handleEvent.call(handler, route, nextProxy)
                    else
                      handler.call(null, route, nextProxy)

                    const onend =  () => {
                        nexts.set(route, () => console.warn(WARN_LATE_NEXT)) //can only be invoked once and during the turn of the exec time of the handler

                        if ( stop )
                          store.get(route).set(sstate, Route.states.STOPPED)

                        resolve(hit)
                    }

                    if ( route.state === Route.states.PAUSED )
                      route.wait().then(onend)
                    else onend()
                })
            }
        }.call(this)

        const next = () => {
            const iteration = dispatchLoop.next()

            if ( iteration.done )
              return onstop()
            else
              iteration.value
              .then(hit => {
                  store.get(this).set(shits,  store.get(this).get(shits) + hit)
                  next()
              })
        }

        next()
    }

}
