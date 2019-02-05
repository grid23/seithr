"use strict"

import Model from "models/Model"
import Node from "nodes/Node"
import Parser from "views/ZParser"
import store from "store"
import typeOf from "utils/toType"
import UID from "uids/UID"

export const sargs = new Object(Symbol("args"))
export const sconstructor = new Object(Symbol("constructor"))
const sexpression = new Object(Symbol("expression"))
const sfragment = new Object(Symbol("fragment"))
const sprops = new Object(Symbol("props"))
export const ssubviewAsChild = new Object(Symbol("subview_as_child"))
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

    // TODO make the following compatible with proxy-polyfill
    // traps.defineProperty = traps.deleteProperty =
    // traps.preventExtensions = traps.set =
    // noop(true)

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

    // TODO make the following compatible with proxy-polyfill
    // traps.defineProperty = traps.deleteProperty =
    // traps.preventExtensions = traps.set =
    // noop(true)

    const { revoke, proxy } = Proxy.revocable(target, traps)

    if ( revocable )
      revocable()
    revocable = () => setTimeout(revoke, 4)

    return proxy
}

const transformPath = path =>
  path.reduce((acc, step) => {
      if ( isNaN(parseFloat(step)) )
        return acc += `.${step}`
      else
        return acc += `["${step}"]`
  }, "")

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
      // case: describes a view and a set of args
          else if ( Reflect.apply(Object.prototype.hasOwnProperty, values[i], ["View"])
                    && Reflect.apply(Object.prototype.hasOwnProperty, values[i], ["args"]) )
            return acc += `|${Reflect.apply(View.toString, values[i].View, [])}:${values[i].args}|`
      // case: describes a model and a value path
          else if ( Reflect.apply(Object.prototype.hasOwnProperty, values[i], ["model"])
                    && Reflect.apply(Object.prototype.hasOwnProperty, values[i], ["path"]) )
            return acc += `⌊${transformPath(values[i].path)}∈${values[i].model}⌉`
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

        const uid = UID.uid()
        store.get(this).get(sargs).set(uid, args)
        return { View:this, args:uid}
    }

    static toString(){
      if ( !store.has(this) )
        store.set(this, new WeakMap),
        store.get(this).set(suid, Symbol.for(UID.uid())),
        store.get(this).set(sconstructor, this),
        store.get(this).set(sargs, new Map)
        xmap.set(store.get(this).get(suid), store.get(this))

      return Symbol.keyFor(store.get(this).get(suid))
    }

    static get x(){ return expression }
    static get xw(){  return this.expressWith }

    constructor(...args){
        super()

        const conf = args[0] instanceof Object ? args[0] : {}
        const {expression, props, subviewAsChild=true} = conf

        store.get(this).set(sprops, {})
        if ( props )
          Object.keys(props).forEach(prop =>
            store.get(this).get(sprops)[prop] = props[prop])
        store.get(this).set(ssubviewAsChild, !!subviewAsChild)

        store.get(this).set(sexpression,
          Parser.parse(expression||this.template, this))

        store.get(this).set(supdates, store.get(this).get(sexpression).updates
          .reduce((acc, {updaters, handler}) => (updaters.forEach(updater => {
              if ( !acc.has(updater) )
                acc.set(updater, new Set)
              acc.get(updater).add(handler)
          }), acc), new Map))

        store.get(this).get(supdates).forEach((handlers, updater) =>
          updater.addEventListener(Model.events.modelchange, () =>
              handlers.forEach(handler => handler()), true))
    }

    get fragment(){ return store.get(this).get(sexpression).fragment }
    get node(){ return revocableNodeProxy(this, store.get(this).get(sexpression).refs, [], { all: false }) }
    get nodes(){ return revocableNodeProxy(this, store.get(this).get(sexpression).refs, [], { all: true }) }
    get props(){ return revocablePropProxy(this, store.get(this).get(sprops), []) }

}
