"use strict"

import Model from "./Model2.mjs"
import Node from "./Node.mjs"
import Parser from "./ZParser2.mjs"
import store from "./store.mjs"
import typeOf from "./toType.mjs"
import UID from "./UID.mjs"

const suid = new Object(Symbol())
const sexpression = new Object(Symbol())
const sfragment = new Object(Symbol())
const stemplate = new Object(Symbol())

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

    static toString(){
        if ( !store.has(this) )
          store.set(this, new WeakMap),
          store.get(this).set(suid, Symbol.for(UID.uid()))
        return Symbol.keyFor(store.get(this).get(suid))
    }

    constructor({expression} = {}){
        super()

        store.get(this).set(sexpression,
          Parser.parse(expression||this.template))
    }

    get expression(){ return store.get(this).get(sexpression) }

    get fragment(){ return store.get(this).get(sfragment) }
}