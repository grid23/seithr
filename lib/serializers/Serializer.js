"use strict"

import store from "store"

const  def_delimiter = "="
const def_separator = "&"
const def_key_separator = "."
const rspacetoplus = /%20/g
const rplustospace = /\+/g

const sdelimiter = new Object(Symbol())
const sseparator = new Object(Symbol())

export default class Serializer {
    static objectify(string=""){
        const object = {}
        const del = this && this.delimiter  || def_delimiter
        const sep = this && this.separator  || def_separator

        void (string.search(sep) != -1 ? string.split(sep) : string.length ? [string] : [])
          .forEach(pair => {
                pair = pair.replace(rplustospace, "%20")
                const idx = pair.indexOf(del)
                const key = unescape(pair.split(del, 1)[0])
                const value = decodeURIComponent(pair.slice(idx+1))
                object[key.trim()] = idx != -1 ? value : true
          })

        return object
    }

    static serialize(object){
        const del = this && this.delimiter  || def_delimiter
        const sep = this && this.separator  || def_separator

        return [
          ...Object.keys(object)
              .map(key => `${escape(key)}${del}${encodeURIComponent(object[key])}`)
        ].join(sep).replace(rspacetoplus, "+")
    }

    static stringify(object){
        const del = this && this.delimiter  || def_delimiter
        const sep = this && this.separator  || def_separator

        return [
          ...Object.keys(object)
              .map(key => `${key}${del}${object[key]}`)
        ].join(sep)
    }

    constructor({ delimiter=def_delimiter, separator=def_separator } = {}){
        store.set(this, new WeakMap)
        store.get(this).set(sdelimiter, delimiter)
        store.get(this).set(sseparator, separator)
    }

    get delimiter(){ return store.get(this).get(sdelimiter) }
    get separator(){ return store.get(this).get(sseparator) }

    objectify(string){ return Reflect.apply(Serializer.objectify, this, [string]) }
    serialize(object){ return Reflect.apply(Serializer.serialize, this, [object]) }
    stringify(object){ return Reflect.apply(Serializer.stringify, this, [object]) }
}
