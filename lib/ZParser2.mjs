"use strict"

import store from "./store.mjs"
import ZExpression from "./ZExpression2.mjs"

const escapeDummy = document.create

const namespaces = Object.seal({
    html: "http://www.w3.org/1999/xhtml"
  , svg: "http://www.w3.org/2000/svg"
  , xml: "http://www.w3.org/XML/1998/namespace"
  , xmlns: "http://www.w3.org/2000/xmlns/"
  , xlink: "http://www.w3.org/1999/xlink"
})

const operators = new Map

operators.set(">", {
    name: "child"
  , handler(stream, input, output) {

    }
})

operators.set("+", {
    name: "sibling"
  , handler(stream, input, output) {

    }
})

export default class ZParser {
    static escapeHTML(string){
        escapeDummy.nodeValue = string
        return escapeDummy.nodeValue
    }

    static get namespaces(){ return namespaces }

    static parse(expression = new ZExpression){
        if ( !(expression instanceof ZExpression) )
          expression = new ZExpression(expression)

            
    }

    parse(...args){
        return ZParser.parse(...args)
    }
}
