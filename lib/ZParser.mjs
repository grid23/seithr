"use strict"

import Model from "./Model.mjs"
import ZExpression from "./ZExpression.mjs"
import ZTemplate from "./ZTemplate.mjs"

const CLASS_LIST_COMPAT = (Element.prototype.hasOwnProperty("classList") || HTMLElement.prototype.hasOwnProperty("classList")) && function(){
    // to be compatible, browser must be able to use classlist on a svg element
    try {
        document.createElementNS("http://www.w3.org/2000/svg", "svg").classList.add("x")
        return true
    } catch(e){}
    return false
}()

const namespaces = {
    html: "http://www.w3.org/1999/xhtml"
  , svg: "http://www.w3.org/2000/svg"
  , xml: "http://www.w3.org/XML/1998/namespace"
  , xmlns: "http://www.w3.org/2000/xmlns/"
  , xlink: "http://www.w3.org/1999/xlink"
}

const auto_vars = Object.seal(["A", "INPUT", "SUBMIT", "BUTTON"])
const operators = new Map
const traversals = new Map

const rtemplatevars = /(\$|£)([^$£\s]*)/g
const templateVarGlyph = "\\$"
const unsafetemplateVarGlyph = "£"

const escape_dummy = document.createTextNode("")
const escapeHTML = string => {
    escape_dummy.nodeValue = string
    return escape_dummy.nodeValue
}

const evaluate = value => {
    try {
        return eval(value)
    } catch(e){
        return value
    }
}

const setAttributeExceptions = ["muted"]

operators.set("[", {
    name: "attribute"
  , endAt: "]"
  , set: (node, key, value) => {
        let split = escapeHTML(key).split(":")
        let ns = split.length > 1 && !!namespaces[split[0].toLowerCase()] ? namespaces[split.shift().toLowerCase()] : null
        key = split.join(":")

        if ( setAttributeExceptions.indexOf(key) != -1 )
          node[key] = evaluate(escapeHTML(value))
        else if ( ns )
          node.setAttributeNS(ns, key, escapeHTML(value))
        else
          node.setAttribute(key, escapeHTML(value))

    }
  , handler: (stream, input, output) => {
        if ( !input.buffer || input.buffer.nodeType !== Node.ELEMENT_NODE )
          return

        let node = input.buffer
        let vars = []

        let pair = input.pile
        let idx = pair.search("=")

        let attr = idx == -1 ? pair : pair.split("=")[0]
        let value = idx == -1 ? true : pair.slice(idx+1)

        let hit
        while ( hit = (rtemplatevars.exec(value)||[])[2], hit )
          if ( vars.indexOf(hit) == -1 )
            vars.push(hit)

        if ( vars.length ) {
            vars.forEach(key => {
                input.vars.add(key)
                input.updates.add(keys => {
                    if ( !keys.hasOwnProperty(key) )
                      return

                    operators.get("[").set(node, attr, keys[key])
                })
            })
        } else {
            operators.get("[").set(node, attr, value)
        }
    }
})

operators.set(".", {
    name: "classname"
  , set: (node, className, replaced) => {
        if ( CLASS_LIST_COMPAT ) {
            let classNames = className.split(" ")

            if ( replaced ) {
                let replacedClasses = replaced.split(" ")
                replacedClasses.forEach(className =>
                    node.classList.remove(escapeHTML(className)))
            }

            classNames.forEach(className =>
                node.classList.add(escapeHTML(className)))
        } else {
            if ( !!replaced )
              node.setAttribute("class", node.getAttribute("class").replaced(" "+escapeHTML(replaced), function(){ return " "+escapeHTML(className) }))
            else
              node.setAttribute("class", (node.getAttribute("class")||"")+ " "+escapeHTML(className))
        }
    }
  , handler: (stream, input, output) => {
        if ( !input.buffer || input.buffer.nodeType !== Node.ELEMENT_NODE )
          return

        let node = input.buffer
        let className = input.pile
        let vars = []

        let hit
        while ( hit = (rtemplatevars.exec(className)||[])[2], hit )
          if ( vars.indexOf(hit) == -1 )
            vars.push(hit)

        if ( vars.length ) {
            vars.forEach(key => {
                let curr

                input.vars.add(key)
                input.updates.add(keys => {
                    if ( !keys.hasOwnProperty(key) )
                      return

                    operators.get(".").set(node, keys[key], curr)
                    curr = keys[key]
                })
            })
        } else {
            operators.get(".").set(node, className)
        }
    }
})

operators.set("{", {
    name: "content"
  , endAt: "}"
  , set: (node, value, unsafe) => {
        if ( node.nodeType == Node.TEXT_NODE )
          node.nodeValue = value
        else if ( !unsafe || (node.namespaceURI && node.namespaceURI === namespaces.svg) )
          node.textContent = escapeHTML(value)
        else
          node.innerHTML = value
    }
  , handler: (stream, input, output) => {
        if ( !input.buffer )
          return

        let node = input.buffer
        let textContent = input.pile
        let vars = textContent.match(rtemplatevars)

        if ( vars && vars.length > 1) {
            let remainder = textContent

            while ( vars.length ) {
                let caught = vars.shift()
                let type = caught[0]
                let key = caught.slice(1)

                let idx = remainder.indexOf(caught)
                let before = remainder.slice(0, idx)
                remainder = remainder.slice(idx+caught.length)

                if ( before.length ) {
                    let text_node = document.createTextNode(before)
                    node.appendChild(text_node)
                }

                let text_node = document.createTextNode(caught)
                node.appendChild(text_node)

                input.vars.add(key)
                input.updates.add(keys=>{
                    if ( !keys.hasOwnProperty(key) )
                      return

                    operators.get("{").set(text_node, keys[key])
                })
            }
        } else if (vars && vars.length == 1 ){
              let caught = vars.shift()
              let type = caught[0]
              let key = caught.slice(1)

              input.vars.add(key)

              if ( type !== unsafetemplateVarGlyph ) {
                  let text_node = document.createTextNode(caught)
                  node.appendChild(text_node)

                  input.updates.add(keys=>{
                      if ( !keys.hasOwnProperty(key) )
                        return

                      operators.get("{").set(text_node, keys[key])
                  })
              } else {
                  operators.get("{").set(node, caught, true)
                  input.updates.add(keys => {
                      if ( !keys.hasOwnProperty(key) )
                        return

                      operators.get("{").set(node, keys[key], true)
                  })
              }
        } else {
            operators.get("{").set(node, textContent)
        }
    }
})

operators.set("(", {
    name: "group"
  , endAt: ")"
  , handler: (stream, input, output) => {
        let sub = ZParser.parse(input.pile, input.model)
        let tree = sub.tree

        Object.keys(sub.refs).forEach(key => {
            if ( key == "root" )
              return

            input.refs[key] = input.refs[key] || new Set
            sub.refs[key].forEach(node => input.refs[key].add(node))
        })

        sub.vars.forEach(key => input.vars.add(key))
        sub.updates.forEach(fn => input.updates.add(fn))

        input.buffer = tree
    }
})

operators.set("#", {
    name: "id"
  , set: (node, id) => {
        node.setAttribute("id", escapeHTML(id))
    }
  , handler: (stream, input, output) => {
        if ( !input.buffer || input.buffer.nodeType !== Node.ELEMENT_NODE )
          return

        let node = input.buffer
        let id = input.pile
        let vars = []

        let hit
        while ( hit = (rtemplatevars.exec(id)||[])[2], hit )
          if ( vars.indexOf(hit) == -1 )
            vars.push(hit)

        if ( vars.length ) {
            vars.forEach(key => {
                input.vars.add(key)
                input.updates.add(keys => {
                    if ( !keys.hasOwnProperty(key) )
                      return

                    operators.get("#").set(node, keys[key])
                })
            })
        } else {
            operators.get("#").set(node, id)
        }
    }
})

operators.set("@", {
    name: "reference"
  , handler: (stream, input, output) => {
        if ( !input.buffer || input.buffer.nodeType !== Node.ELEMENT_NODE )
          return

        let ref = input.pile || input.buffer.nodeName.toLowerCase()

        input.refs[ref] = input.refs[ref] || new Set
        input.refs[ref].add(input.buffer)
    }
})

traversals.set(">", {
    name: "child"
  , handler: (stream, input, output) => {
        input.context.appendChild(input.buffer)

        input.buffer = input.context.childNodes[input.context.childNodes.length-1]
    }
})

traversals.set("^", {
    name: "climb up"
  , handler: (stream, input, output) => {
        input.context = input.context.parentNode || input.context
        traversals.get("+").handler(stream, input, output)
    }
})

traversals.set("+", {
    name: "sibling"
  , handler: (stream, input, output) => {
        input.context.parentNode.appendChild(input.buffer)

        input.buffer = input.context.parentNode.childNodes[input.context.parentNode.childNodes.length-1]
    }
})


const operate = (stream, input, output) => {
    input.pile = input.pile.trim()

    if ( !input.operator ) {
        let split

        input.buffer = !input.pile.length && input.glyph === "{" ? document.createTextNode("")
                     : !input.pile.length && input.glyph !== "{" ? document.createElement("div")
                     : input.pile === "§" ? document.createTextNode("")
                     : input.pile.indexOf(":") == -1 ? document.createElement(input.pile)
                     : (split = input.pile.split(":"), document.createElementNS(namespaces[split[0].toLowerCase()]||namespaces.hmtl, split[1]))

        if ( auto_vars.indexOf(input.buffer.nodeName) != -1 ) {
            input.pile = input.buffer.nodeName.toLowerCase()
            operators.get("@").handler(stream, input, output)
        }
    } else operators.get(input.operator).handler(stream, input, output)

    input.pile = ""
    input.operator = input.glyph
}

const parse = (stream, input, output) => {
    let capture = null

    let current
    while ( current = stream.next(), !current.done ) {
        input.glyph = current.value

        if ( !capture) {
            if ( traversals.has(input.glyph) )
                traverse(stream, input, output)
            else if ( operators.has(input.glyph) ) {
                operate(stream, input, output)

                if ( !!operators.get(input.glyph).endAt ) {
                    capture = { start: input.glyph, end: operators.get(input.glyph).endAt, ignore: 0  }
                }
            }
            else
                input.pile += input.glyph
        } else {
            if ( input.glyph == capture.end && !capture.ignore )
              capture = null
            else {
                if ( input.glyph == capture.end )
                  capture.ignore += -1
                else if ( input.glyph == capture.start )
                  capture.ignore += 1

                input.pile += input.glyph
            }
        }
    }

    traverse(stream, input, output)

    input.refs.root = input.refs.root || new Set
    Array.prototype.slice.call(output.tree.childNodes).forEach(node => input.refs.root.add(node))

    if ( input.updates.size )
      output.update(output.vars)
    return output
}

const traverse = (stream, input, output) => {
    operate(stream, input, output)

    if ( !input.traversal )
        input.context = (input.tree.appendChild(input.buffer), input.tree.childNodes[input.tree.childNodes.length-1])
    else
        traversals.get(input.traversal).handler(stream, input, output)
    input.traversal = input.glyph

    input.pile = ""
    input.glyph = ""
    input.operator = null

    if ( input.buffer && input.buffer.nodeType === Node.ELEMENT_NODE )
      input.context = input.buffer
    input.buffer = null
}

export default class ZParser {
    static parse(...args){
        const parser = new ZParser

        return Reflect.apply(parser.parse, parser, args)
    }

    parse(expression=new ZExpression, model=new Model){
        if ( !(expression instanceof ZExpression) )
          expression = new ZExpression(expression)
        if ( !(model instanceof Model) )
          model = new Model(model)

        const stream = expression[Symbol.iterator]()
        const refs = {}
        const tree = document.createDocumentFragment()
        const updates = new Set
        const vars = new Set

        const input = { context: null, glyph: "", model, operator: "", parser: this, pile: "", refs, traversal: "", tree, updates,  vars }
        const output = new ZTemplate({model, tree, refs, updates, vars})

        return parse(stream, input, output)
    }
}
