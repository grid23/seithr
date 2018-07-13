"use strict"

import Event from "./Event.mjs"
import Node from "./Node.mjs"
import Serializer from "./Serializer.mjs"
import store from "./store.mjs"
import typeOf from "./toType.mjs"

const sdata = new Object(Symbol())
const sexport = new Object(Symbol())
const sfrom = new Object(Symbol())
const shooks = new Object(Symbol())
const skey = new Object(Symbol())
const skeys = new Object(Symbol())
const smodel = new Object(Symbol())
const sserializer = new Object(Symbol())
const sto = new Object(Symbol())
const supdate = new Object(Symbol())

class ModelEvent extends Event {
    static get TYPE(){ return "modelevent" }

    constructor(type=ModelEvent.TYPE, {model, key, to=undefined, from}){
        super(type)
        store.get(this).set(sfrom, from)
        store.get(this).set(skey, key)
        store.get(this).set(smodel, model)
        store.get(this).set(sto, to)
    }

    get from(){ return store.get(this).get(sfrom) }
    get key(){ return store.get(this).get(skey) }
    get model(){ return store.get(this).get(smodel) }
    get to(){ return store.get(this).get(sto) }
}

export class Add extends ModelEvent {
    static get TYPE(){ return "add" }

    constructor({model, key, to, from}){
        super(Add.TYPE, {model, key, to, from})
    }
}

export class Change extends ModelEvent {
    static get TYPE(){ return "change" }

    constructor({model, key, to, from}){
        super(Change.TYPE, {model, key, to, from})
    }
}

export class Remove extends ModelEvent {
    static get TYPE(){ return "remove" }

    constructor({model, key, from}){
        super(Remove.TYPE, {model, key, from})
    }
}

export class Update extends ModelEvent {
    static get TYPE(){ return "update" }

    constructor({model, keys}){
        super(Update.TYPE, {model})
        store.get(this).set(skeys, keys)
    }

    get keys(){ return store.get(this).get(skeys) }
}

const update = function(key){
    if ( !store.has(this) )
      return

    if ( store.get(this).get(supdate).keys.indexOf(key) == -1 ) {
        store.get(this).get(supdate).keys.push(key)
        clearTimeout(store.get(this).get(supdate).timer)
        store.get(this).get(supdate).timer = setTimeout(() => this.dispatchEvent( new Update({model:this, keys:store.get(this).get(supdate).keys.splice(0)}) ), 4)
    }
}

const setRaw = function(key, value, fpath, path, obj, nkey){
    obj = store.get(this).get(sexport)
    path = key.split(".")
    key = path.pop()
    fpath = path.join(".")

    while ( path.length )
      void function(key){
          obj = ( obj[key] = obj[key] || {} )
      }( path.shift() )

    if ( nkey = +key, nkey === nkey && Reflect.apply(Object.prototype.hasOwnProperty, this, ["length"]) ) {
        if ( obj.length <= nkey )
          this.setItem(fpath+".length", nkey+1)
    }

    if ( value == null )
      delete obj[key]
    else obj[key] = value
}

const setRawArray = function(key, obj, path){
    obj = store.get(this).get(sexport)
    path = key.split(".")
    key = path.pop()

    while ( path.length )
      void function(key){
          obj = ( obj[key] = obj[key] || {} )
      }( path.shift() )

    obj[key] = Reflect.apply(Array.prototype.slice, obj[key], [])
}

const def_serializer = new Serializer
export default class Model extends Node {
    static get events (){ return { Add, Change, Remove, Update } }
    static get serializer(){ return def_serializer }

    constructor(...datasets){
        super()
        store.get(this).set(sdata, Object.create(null))
        store.get(this).set(sexport, Object.create(null))
        store.get(this).set(shooks, Object.create(null))
        store.get(this).set(supdate, { keys: [], timer: null })

        if ( datasets.length )
          Reflect.apply(this.set, this, datasets)
    }

    get data(){ return store.get(this).get(sdata) }
    get getItem(){ return this.get }
    get hooks(){ return store.get(this).get(shooks) }
    get raw(){ return store.get(this).get(sexport) }
    get removeItem(){ return this.remove }
    get setHook(){ return hook }
    get setItem(){ return this.set }
    get serializer(){ return store.get(this).get(sserializer) || this.constructor.serializer || Serializer.serializer }
    set serializer(serializer){ serializer instanceof Serializer && store.get(this).set(sserializer, serializer) }

    get(keys){
        keys = (arguments.length == 1 && typeOf(arguments[0]) == "array" ? keys
             : arguments.length == 1 ? [keys]
             : arguments.length > 1 ? [...arguments]
             : []).filter(v => !!v)

        const hits = keys.map(key => this.data[key])

        return hits.length > 1 ? hits : hits[0]
    }

    hook(key, hookHandler){
        if ( arguments.length == 1 && typeOf(arguments[0]) == "object" ) {
            Object.keys(arguments[0]).forEach(key => this.hook(key, arguments[0][key]))
            return
        }

        if ( typeOf(key) == "string" && typeOf(hookHandler) == "function")
          this.hooks[key] = hookHandler
    }

    remove(key){
        return this.set(key, null)
    }


    set(key, nvalue){
        if ( arguments.length == 1 && typeOf(arguments[0]) == "object" ) {
            Object.keys(arguments[0]).forEach(key => this.set(key, arguments[0][key]))
            return
        }

        if ( arguments.length == 1 && typeOf(arguments[0]) == "string" )
          return this.set(this.serializer.objectify(arguments[0]))

        key = typeOf(key) == "string" ? key : Reflect.apply(Object.prototype.toString, key, [])
        nvalue = (value => {
            while ( typeOf(value) == "function" )
              value = value.call(this)
            return value
        })(nvalue)

        const hook = this.hooks[key] || null
        const pvalue = this.data[key] ? this.data[key]
                     : ["string", "number", "boolean"].includes( typeOf(this.data[key]) ) ? this.data[key]
                     : void 0

        if ( typeOf(hook) == "function" )
          nvalue = Reflect.apply(hook, this, [nvalue, pvalue])

        const tvalue = typeOf(nvalue)

        if ( tvalue == "object" && !Reflect.apply(Object.prototype.hasOwnProperty, nvalue, ["length"]) ) {
            Object.keys(nvalue).forEach(subkey => this.set(`${key}.${subkey}`, nvalue[subkey]))
        }

        if ( tvalue == "array" || tvalue == "object" && Reflect.apply(Object.prototype.hasOwnProperty, nvalue, ["length"]) ) {
            Object.keys(nvalue).forEach(subkey => this.set(`${key}.${subkey}`, nvalue[subkey]))
            this.set(`${key}.length`, nvalue.length)
            Reflect.apply(setRawArray, this, [key])
        }

        if ( tvalue == "string" && typeof nvalue == "object" )
            nvalue = nvalue.toString() // new String

        if ( tvalue == "number" && typeof nvalue == "object" )
            nvalue = +nvalue // new Number

        if ( tvalue == "boolean" && typeof nvalue == "object" )
            nvalue = !!nvalue // new Boolean

        let added, updated, removed
        if ( tvalue == "null" && Reflect.apply(Object.prototype.hasOwnProperty, this.data, [key]) ) {
            removed = true
            delete this.data[key]

            Reflect.apply(setRaw, this, [key, nvalue])
        } else {
            if ( !this.data[key] )
              added = true

            Reflect.apply(setRaw, this, [key, nvalue])
            this.data[key] = nvalue
        }

        if ( nvalue !== pvalue )
          updated = true

        if ( removed )
          this.dispatchEvent(new Remove({model:this, key, from:pvalue}))
        if ( added )
          this.dispatchEvent(new Add({model:this, key, to:nvalue, from:pvalue}))
        if ( updated )
          this.dispatchEvent(new Change({ model:this, key, to:nvalue, from:pvalue })),
          Reflect.apply(update, this, [key])
    }

    serialize(){
        return this.serializer.serialize(this.data)
    }
}
