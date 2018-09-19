"use strict"

import Model, { events as modelEvents } from "./Model2.mjs"
import Node from "./Node.mjs"
import Parser from "./ZParser2.mjs"
import store from "./store.mjs"
import typeOf from "./toType.mjs"
import UID from "./UID.mjs"

export const sargs = new Object(Symbol("args"))
export const sconstructor = new Object(Symbol("constructor"))
const sexpression = new Object(Symbol("expression"))
const sfragment = new Object(Symbol("fragment"))
const sprops = new Object(Symbol("props"))
const stemplate = new Object(Symbol("template"))
const suid = new Object(Symbol("uid"))
const supdates = new Object(Symbol("updates"))

export const xmap = new Map

let revocable = null
const noop = strictlySealed => () => !strictlySealed
const revocableNodeProxy = (view, target, path, opts = {}) => {
    const traps = {
        get: (target, key) => {
            if ( Array.isArray(target[key]) ) {
                if ( opts.all )
                  return [...target[key]]
                else
                  return target[key][0]
            }

            return undefined
        }
    }

    traps.defineProperty = traps.deleteProperty =
    traps.preventExtensions = traps.set =
    noop(true)

    const { revoke, proxy } = Proxy.revocable(target, traps)

    if ( revocable )
      revocable()
    revocable = () => setTimeout(revoke, 4)

    return proxy
}
const revocablePropProxy = (view, target, path, opts = {}) => {
    const traps = {
        get: (target, key) => target[key]
    }

    traps.defineProperty = traps.deleteProperty =
    traps.preventExtensions = traps.set =
    noop(true)

    const { revoke, proxy } = Proxy.revocable(target, traps)

    if ( revocable )
      revocable()
    revocable = () => setTimeout(revoke, 4)

    return proxy
}

export const expression = (parts=["div"], ...values) => {
    parts = typeOf(parts) == "array" ? parts : [parts]

    return parts.reduce((acc, current, i) => {
        const value = i < values.length && (() => {
            if ( !(values[i] instanceof Object) )
              return
        })()

        acc += current

        if ( i < values.length )
          if ( !(values[i] instanceof Object) )
            return acc += values[i]
      // case: inherits from View
          else if ( typeof values[i] == "function" &&
               View.isPrototypeOf(values[i]) )
            return acc += `|${Reflect.apply(View.toString, values[i], [])}|`
      // case: describes a model and a value path
          else if ( Reflect.apply(Object.prototype.hasOwnProperty, values[i], ["model"])
                    && Reflect.apply(Object.prototype.hasOwnProperty, values[i], ["path"]) )
            return acc += `⌊${values[i].path.join(".")}∈${values[i].model}⌉`
      // default
          else return acc += Reflect.apply(Object.prototype.toString, values[i], [])

        return acc
    }, "")
}

export default class View extends Node {
    static get expression(){ return expression }

    static expressWith(...args){
    // generate an entry
        if ( !store.has(this) )
          this.toString()

        store.get(this).set(sargs, args)
        return this
    }

    static toString(){
      if ( !store.has(this) )
        store.set(this, new WeakMap),
        store.get(this).set(suid, Symbol.for(UID.uid())),
        store.get(this).set(sconstructor, this),
        xmap.set(store.get(this).get(suid), store.get(this))

      return Symbol.keyFor(store.get(this).get(suid))
    }

    static get x(){ return expression }
    static get xWith(){  return this.expressWith }

    constructor({expression, props} = {}){
        super()

        store.get(this).set(sprops, {})
        if ( props ) {
            Object.keys(props)
              .forEach(prop => store.get(this).get(sprops)[prop] = props[prop])
        }

        store.get(this).set(sexpression,
          Parser.parse(expression||this.template))

        store.get(this).set(supdates, store.get(this).get(sexpression).updates
          .reduce((acc, {updaters, handler}) => (updaters.forEach(updater => {
              if ( !acc.has(updater) )
                acc.set(updater, new Set)

              acc.get(updater).add(handler)
          }), acc), new Map))

        store.get(this).get(supdates).forEach((handlers, updater) =>
          updater.addEventListener(modelEvents.modelchange, () =>
              handlers.forEach(handler => handler())))
    }

    get fragment(){ return store.get(this).get(sexpression).fragment }
    get node(){ return revocableNodeProxy(this, store.get(this).get(sexpression).refs, [], { all: false }) }
    get nodes(){ return revocableNodeProxy(this, store.get(this).get(sexpression).refs, [], { all: true }) }
    get props(){ return revocableNodeProxy(this, store.get(this).get(sprops), []) }

}
