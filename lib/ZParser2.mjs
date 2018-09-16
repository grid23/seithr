"use strict"

import Model from "./Model2.mjs"
import store from "./store.mjs"
import Vies from "./View2.mjs"

const auto_vars = Object.seal(["A", "INPUT", "SUBMIT", "BUTTON"])

const CLASS_LIST_COMPAT = (Element.prototype.hasOwnProperty("classList") || HTMLElement.prototype.hasOwnProperty("classList")) && function(){
    // to be compatible, browser must be able to use classlist on a svg element
    try {
        document.createElementNS("http://www.w3.org/2000/svg", "svg").classList.add("x")
        return true
    } catch(e){}
    return false
}()

const escapeDummy = document.createTextNode("")
const escapeHTML = string => (escapeDummy.nodeValue = string, escapeDummy.nodeValue)

const evaluate = value => {
    try { return eval(value) }
    catch(e){ return value }
}
const setAttributeExceptions = ["muted"]

export const namespaces = Object.seal({
    html: "http://www.w3.org/1999/xhtml"
  , svg: "http://www.w3.org/2000/svg"
  , xml: "http://www.w3.org/XML/1998/namespace"
  , xmlns: "http://www.w3.org/2000/xmlns/"
  , xlink: "http://www.w3.org/1999/xlink"
})

const sbuffer = new Object(Symbol("buffer"))
const scontext = new Object(Symbol("context"))
const sexpression = new Object(Symbol("expression"))
const sfragment = new Object(Symbol("fragment"))
const slength = new Object(Symbol("length"))
const spile = new Object(Symbol("pile"))
const spointer = new Object(Symbol("pointer"))
const srefs = new Object(Symbol("refs"))
const ssafe = new Object(Symbol("safe"))
const supdates = new Object(Symbol("updates"))
const svars = new Object(Symbol("svars"))

const rextractsvars = /({([^∈]*∈[^∈]*)})/
const rpathmodel = /(.*)∈(.*)/
const extractVars = input => {
    const output  = []
    const updaters = new Set

    let hit
    while ( hit = rextractsvars.exec(input) ) {
        const [,match, data] = hit
        const idx = input.indexOf(match)

        if ( idx ) output.push(input.slice(0, idx))
        input = input.slice(idx + match.length)

        const [, path, ref] = rpathmodel.exec(data)
        const model = Model.ref(ref)

        if ( !model ) {
            output.push(match)
            continue
        }

        updaters.add(model)
        output.push(function(path, model, match){
            return function(){
                try { return eval(`model.io.${path}`) }
                catch(e){ return match }
            }
        }(path, model, match))
    }

    output.push(input)

    const handler = function(input){
        return function(){
            return input.reduce((acc, curr) =>
              acc += typeof curr == "function" ? curr() : curr
              , "")
        }
    }(output)

    return { updaters:updaters.size?[...updaters]:null, handler }
}

const operators = new Map

operators.set("@", {
    name: "@"
  , handler(captured){
        this.refs[captured] = this.refs[captured] || []
        this.refs[captured].push(this.buffer)
    }
  , capture(){
        do {
            const { done, value } = this.lookAhead()

            if ( done || Parser.traversals.has(value) || Parser.operators.has(value) )
              break

            this.pile += this.next().value
        } while ( true )

        const capture = this.pile.trim()
        this.pile = ""

        return capture
    }
})

operators.set("[", {
    name: "["
  , handler(captured){
        if ( this.buffer.nodeType != Node.ELEMENT_NODE )
          return

        const idx = captured.search("=")
        let attr = idx == -1 ? captured : captured.split("=")[0]
        let ns

        if ( attr.indexOf(":") != -1 ) {
            const split = attr.split(":")
            attr = split(1)
            ns = Parser.namespaces[split[0].toLowerCase()] || null
        }

        const { updaters, handler } = idx == -1
          ? { handler(){ return true } }
          : extractVars(captured.slice(idx+1), this.buffer)

        const update = {
            updaters
          , handler: function(node, ns, attr, handler){
                return function(){
                    const value = evaluate(escapeHTML(handler()))

                    if ( setAttributeExceptions.indexOf(attr) != -1 )
                      node[key] = value
                    else if ( ns )
                      node.setAttributeNS(ns, attr, value)
                    else
                      node.setAttribute(attr, value)
                }
            }(this.buffer, ns, attr, handler)
        }

        if ( updaters )
          this.updates.push(update)
        update.handler()
    }
  , capture(){
        do {
            const { done, value } = this.lookAhead()

            if ( done )
              break

            if ( value === "]" ) {
                this.next()
                break
            }

            this.pile += this.next().value
        } while ( true )

        const capture = this.pile.trim()
        return capture
    }
})

operators.set("#", {
    name: "#"
  , handler(captured){
        if ( this.buffer.nodeType != Node.ELEMENT_NODE )
          return

        const { updaters, handler } = extractVars(captured, this.buffer)

        const update = {
            updaters
          , handler: function(node, handler){
                return function(){
                    node.setAttribute("id", escapeHTML(handler()))
                }
            }(this.buffer, handler)
        }

        if ( updaters )
          this.updates.push(update)
        update.handler()
    }
  , capture(){
        do {
            const { done, value } = this.lookAhead()

            if ( done )
              break

            if ( Parser.traversals.has(value) || Parser.operators.has(value) )
              break

            this.pile += this.next().value
        } while ( true )

        const capture = this.pile.trim()
        return capture
    }
})

const traversals = new Map

traversals.set(">", {
    name: "child"
  , handler(){
        this.context.appendChild(this.buffer)
        this.context = this.buffer

        this.buffer = null
    }
})

traversals.set("+", {
    name: "siblings"
  , handler(){
        this.context.appendChild(this.buffer)

        this.buffer = null
    }
})

export default class Parser {
    static get auto_vars(){ return auto_vars }
    static get namespaces(){ return namespaces }
    static get operators(){ return operators }
    static get traversals(){ return traversals }

    static escapeHTML(string){
        escapeDummy.nodeValue = string
        return escapeDummy.nodeValue
    }



    static parse(expression){
        return new Parser().parse(expression)
    }

    constructor(){
        store.set(this, new WeakMap)
    }

    get buffer(){ return store.get(this).get(sbuffer) }
    set buffer(any){ store.get(this).set(sbuffer, any) }

    get context(){ return store.get(this).get(scontext) }
    set context(node){ store.get(this).set(scontext, node) }

    get done(){ return this.pointer >= this.length }

    get expression(){ return store.get(this).get(sexpression) }
    set expression(string){ store.get(this).set(sexpression, string) }

    get fragment(){ return store.get(this).get(sfragment) }
    set fragment(fragment){ store.get(this).set(sfragment, fragment)  }

    get glyph(){ return this.expression[this.pointer] }

    get length(){ return store.get(this).get(slength) }
    set length(int){ return store.get(this).set(slength, int|0) }

    get pile(){ return store.get(this).get(spile) }
    set pile(string){ store.get(this).set(spile, string) }

    get pointer(){ return store.get(this).get(spointer) }
    set pointer(uint){ store.get(this).set(spointer, uint|0) }

    get refs(){ return store.get(this).get(srefs) }
    set refs(object){ store.get(this).set(srefs, object) }

    get safe(){ return store.get(this).get(ssafe) }
    set safe(boolean){ store.get(this).set(ssafe, boolean) }

    get updates(){ return store.get(this).get(supdates) }
    set updates(set){ store.get(this).set(supdates, set) }

    get vars(){ return store.get(this).get(svars) }
    set vars(set){ store.get(this).set(svars, set) }

    lookAhead(){
        return {
            done: this.pointer+1 >= this.length
          , value: this.expression[this.pointer+1]
        }
    }

    next(){
        this.pointer += 1
        return { value: this.glyph, done: this.done }
    }

    operate(operator){
        Reflect.apply(Parser.operator.get(operator), this, [])
    }

    parse(expression="", { safe=false }={}){
        this.expression = [...expression]
        this.fragment = document.createDocumentFragment()
        this.context = this.fragment
        this.length = this.expression.length
        this.pile = ""
        this.pointer = 0
        this.refs = {}
        this.safe = safe
        this.updates = []
        this.vars = new Set

        do {
            if ( Parser.traversals.has(this.glyph) ) {
              const {handler} = Parser.traversals.get(this.glyph)
              this.unpile()
              Reflect.apply(handler, this, [])
            }
            else if ( Parser.operators.has(this.glyph) ) {
                const {capture, handler, name} = Parser.operators.get(this.glyph)
                this.unpile({handler, name})
                Reflect.apply(handler, this, [Reflect.apply(capture, this, [])])
            }
            else
              this.pile += this.glyph
        } while ( !this.next().done  )

    // empty pile
        if ( this.pile.length )
          this.unpile()
    // last traversal
        Reflect.apply(Parser.traversals.get(">").handler, this, [])

        return this
    }

    update(){

    }

    unpile({handler, name}={}){
        this.pile = this.pile.trim()

        if (!this.buffer) {
            if ( !this.pile.length )
              this.buffer = document.createElement("div")

            else if ( this.pile === "§" )
              this.buffer = document.createTextNode("div")

            else if ( this.pile.indexOf(":") != -1 ) {
                const split = this.pile.split(":")
                this.buffer = document.createElementNS( Parser.namespaces[split[0].toLowerCase()]||Parser.namespaces.html, split[1])
            }

            else
              this.buffer = document.createElement(this.pile)

            if ( Parser.auto_vars.indexOf(this.buffer.nodeName) != -1 )
              Reflect.apply(operators.get("@").handler, this, [this.buffer.nodeName])

        // node is root ( direct childNode of fragment )
            if ( this.context === this.fragment )
              Reflect.apply(operators.get("@").handler, this, ["root"])
        }

        this.pile = ""
    }
}
