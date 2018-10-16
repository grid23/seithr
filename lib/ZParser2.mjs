"use strict"

import Model from "./Model2.mjs"
import store from "./store.mjs"
import View, { sargs, sconstructor, ssubviewAsChild, xmap } from "./View2.mjs"

const auto_vars = Object.seal(["A", "INPUT", "SUBMIT", "BUTTON"])

const CLASS_LIST_COMPAT = (Element.prototype.hasOwnProperty("classList") || HTMLElement.prototype.hasOwnProperty("classList")) && function(){
    // to be compatible, browser must be able to use classlist on a svg element
    try {
        document.createElementNS("http://www.w3.org/2000/svg", "svg").classList.add("x")
        return true
    } catch(e){}
    return false
}()

// const escapeDummy = document.createTextNode("")
// const escapeHTML = string => (escapeDummy.nodeValue = string, escapeDummy.nodeValue)

const evaluate = value => {
    if ( typeof value !== "string" || value instanceof String )
      return value
    else if ( value === "true" )
      return true
    else if ( value === "false" )
      return false
    else if ( value.indexOf(".") == -1 ) {
        const candidate = parseInt(value)
        if ( !isNaN )
          return candidate
        return value
    }
    else if ( value.indexOf(".") != -1 ) {
        const candidate = parseFloat(value)
        if ( !isNaN )
          return candidate
        return value
    }
    else return value
}
const setAttributeExceptions = ["muted", "value"]

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
const sowner = new Object(Symbol("owner"))
const spile = new Object(Symbol("pile"))
const spointer = new Object(Symbol("pointer"))
const srefs = new Object(Symbol("refs"))
const supdates = new Object(Symbol("updates"))
const svars = new Object(Symbol("svars"))

const rextractsvars = /(⌊([^∈]*∈[^∈]*)⌉)/
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
                try { return new Function("model", "path", `"use strict"; return model.io${path}`)(model, path) }
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

        return [capture]
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
          : extractVars(captured.slice(idx+1))

        const update = {
            updaters
          , handler: function(node, ns, attr, handler){
                return function(){
                    const value = evaluate(handler())

                    if ( setAttributeExceptions.indexOf(attr) != -1 )
                      node[attr] = value
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
        let bracket = false
        do {
            const { done, value } = this.lookAhead()

            if ( done )
              break

            if ( !bracket && value === "]" ) {
                this.next()
                break
            }

            if ( value === "⌊" )
              bracket = true
            if ( value === "⌉" )
              bracket = false

            this.pile += this.next().value
        } while ( true )

        const capture = this.pile.trim()
        return [capture]
    }
})

operators.set("#", {
    name: "#"
  , handler(captured){
        if ( this.buffer.nodeType != Node.ELEMENT_NODE )
          return

        const { updaters, handler } = extractVars(captured)

        const update = {
            updaters
          , handler: function(node, handler){
                return function(){
                    node.setAttribute("id", handler())
                }
            }(this.buffer, handler)
        }

        if ( updaters )
          this.updates.push(update)
        update.handler()
    }
  , capture(){
        let bracket = false
        do {
            const { done, value } = this.lookAhead()
            if ( done )
              break

            if ( !bracket &&
                 (Parser.traversals.has(value) || Parser.operators.has(value)) )
              break

            if ( value === "⌊" )
              bracket = true
            if ( value === "⌉" )
              bracket = false

            this.pile += this.next().value
        } while ( true )

        const capture = this.pile.trim()
        this.pile = ""
        return [capture]
    }
})

operators.set(".", {
    name: "."
  , handler(captured){
        if ( this.buffer.nodeType != Node.ELEMENT_NODE )
          return

        const { updaters, handler } = extractVars(captured)

        const update = {
            updaters
          , handler: function(node, handler){
                const was = []

                return function(){
                    const requested = handler().split(" ")
                    const remove = !was.length ? []
                      : was.reduce((acc, classname) =>
                        (requested.indexOf(classname) == -1 && acc.push(classname), acc),[])
                    const add = !was.length ? requested
                      : requested.reduce((acc, classname) =>
                        (was.indexOf(classname) == -1 && acc.push(classname), acc), [])

                    if ( CLASS_LIST_COMPAT ) {
                        remove.forEach(classname => node.classList.remove(classname))
                        add.forEach(classname => node.classList.add(classname))
                    } else {
                        node.className = node.className.split(" ")
                          .filter(classname => remove.indexOf(classname) !== -1)
                          .concat(add)
                          .join(" ")
                    }
                    was.splice(0, was.length, ...requested)
                }
            }(this.buffer, handler)
        }

        if ( updaters )
          this.updates.push(update)
        update.handler()
    }
  , capture(){
        let bracket = false
        do {
            const { done, value } = this.lookAhead()

            if ( done )
              break

            if ( !bracket )
              if ( Parser.traversals.has(value) || Parser.operators.has(value) )
                break

            if ( value === "⌊" )
              bracket = true
            if ( value === "⌉" )
              bracket = false

            this.pile += this.next().value
        } while ( true )

        const capture = this.pile.trim()
        this.pile = ""
        return [capture]
    }
})

operators.set("{", {
    name: "{"
  , handler(captured, { safe=true } = {}){
        const node = !safe || this.buffer.nodeType === Node.TEXT_NODE
                   ? this.buffer
                   : this.buffer.appendChild(document.createTextNode(""))
        const { updaters, handler } = extractVars(captured)
        const update = {
            updaters
          , handler: safe
              ? function(node, handler){
                    return function(){ node.nodeValue = handler() }
                }(node, handler)
              : function(node, handler){
                    let was = ""
                    return function(){
                        const textNodes = Reflect.apply(Array.prototype.slice, node.childNodes, [])
                          .filter(node => node.nodeType === Node.TEXT_NODE)

                        if ( textNodes.length )
                          console.warn("unsafe variable will provoke a node.normalize()")

                        const onnode = node.textContent
                        const position = !onnode.length ? 0
                                       : was.length ? onnode.length
                                       : onnode.indexOf(was)

                        const change = handler()
                        const to = [...onnode]
                        to.splice(position, was.length, ...change)

                        node.innerHTML = to.join("")
                    }
                }(node, handler)
        }

        if ( updaters )
          this.updates.push(update)
        update.handler()
    }
  , capture(){
        const safe = this.lookAhead().value === "{" ? (this.next(), false) : true

        let remains = safe ? 1 : 2
        let ignore = 0

        do {
            const { done, value } = this.lookAhead()

            if ( done )
              break

            if ( value !== "}" ) {
                const { done, value } = this.next()

                if ( value == "{" )
                  ignore +1

                if ( !done )
                  this.pile += value
            }
            else if ( ignore ) {
                ignore -= 1

                if ( ignore) {
                    const { done, value } = this.next()

                    if ( !done )
                      this.pile += value
                }

                if ( remains ) {
                    remains -= 1

                    if ( remains )
                      this.next()
                    else
                      break
                }
            }
            else {
                remains -= 1
                this.next()

                if ( !remains )
                  break
            }
        } while (true)

        const capture = this.pile //don't trim
        this.pile = ""
        return [capture, {safe}]
    }
})

operators.set("(", {
    name: "("
  , handler(capture){
        if ( Parser.debug )
          console.log(`OP ( => captured: ${capture}`)
        const { fragment, refs, updates } = Parser.parse(capture)

        Object.keys(refs)
        .filter(ref => ref !== "root")
        .forEach(ref => this.refs[ref] = this.refs[ref]
                      ? [...this.refs[ref], ...refs[ref]]
                      : [...refs[ref]])

        this.updates = [...this.updates, ...updates]
        this.buffer = fragment

    }
  , capture(){
        let ignore = 0

        do {
            const { done, value } = this.lookAhead()

            if ( done )
              break

            if ( value !== ")") {
                const { done, value } = this.next()

                if ( value == "(" )
                  ignore += 1

                if (!done )
                  this.pile += value
            } else {
                if ( ignore ) {
                    ignore -= 1

                    const { done, value } = this.next()

                    if (!done )
                      this.pile += value
                }
                else {
                    this.next()
                    break
                }
            }

        } while (true)

        const capture = this.pile
        this.pile = ""
        return [capture]
    }
})

operators.set("|", {
    name: "|"
  , handler(capture){
        if ( Parser.debug )
          console.log(`OP |, capture: ${capture} => ${xmap.get(Symbol.for(capture))}`)

        const idx = capture.search(":")
        const symbol = Symbol.for(idx == -1 ? capture : capture.split(":")[0])
        const Constructor = xmap.get(symbol).get(sconstructor)
        const args = idx == -1 ? [] : xmap.get(symbol).get(sargs).get(capture.slice(idx+1))
        const instance = new Constructor(...args)

        instance.nodes.root.forEach(node => this.context.appendChild(node))
        this.buffer = instance.nodes.root[instance.nodes.root.length-1]

        if ( this.owner instanceof View &&
          store.get(this.owner).get(ssubviewAsChild) )
            this.owner.appendChild(instance)
    }
  , capture(){
        do {
            const { done, value } = this.lookAhead()

            if ( done )
              break

            if ( value !== "|") {
                const { done, value } = this.next()

                if (!done )
                  this.pile += value
            } else {
                this.next()
                break
            }

        } while (true)

        const capture = this.pile
        this.pile = ""
        return [capture]
    }
})

const traversals = new Map

traversals.set(">", {
    name: "child"
  , handler(){
        if ( Parser.debug )
          console.log("OP >, buffer", this.buffer, "context", this.context)
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

let debug = false
export default class Parser {
    static get auto_vars(){ return auto_vars }
    static get debug(){ return debug }
    static set debug(bool){ debug = !!bool }
    static get namespaces(){ return namespaces }
    static get operators(){ return operators }
    static get traversals(){ return traversals }

    // static escapeHTML(string){
    //     escapeDummy.nodeValue = string
    //     return escapeDummy.nodeValue
    // }

    static parse(expression, owner){
        return new Parser().parse(expression, owner)
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

    get glyph(){
        if ( Parser.debug )
          console.log(`glyph => ${this.expression[this.pointer]} (pointer:${this.pointer}/length:${this.length} done:${this.done})`)
        return this.expression[this.pointer]
    }

    get length(){ return store.get(this).get(slength) }
    set length(int){ return store.get(this).set(slength, int|0) }

    get owner(){ return store.get(this).get(sowner) }
    set owner(any){ store.get(this).set(sowner, any) }

    get pile(){ return store.get(this).get(spile) }
    set pile(string){ store.get(this).set(spile, string) }

    get pointer(){ return store.get(this).get(spointer) }
    set pointer(uint){ store.get(this).set(spointer, uint|0) }

    get refs(){ return store.get(this).get(srefs) }
    set refs(object){ store.get(this).set(srefs, object) }

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

    parse(expression="", owner){
        if ( Parser.debug )
          console.log(`parse(${expression})`)
        this.expression = [...expression]
        this.fragment = document.createDocumentFragment()
        this.context = this.fragment
        this.length = this.expression.length
        this.owner = owner
        this.pile = ""
        this.pointer = 0
        this.refs = {}
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
                Reflect.apply(handler, this, Reflect.apply(capture, this, []))
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
