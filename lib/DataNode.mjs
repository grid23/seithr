"use strict"

import { ERR_ILLEGAL_CONSTRUCTOR, ERR_INVALID_DATA } from "./error.mjs"
import { sdummy, snodename, snodetype, snodevalue } from "./Node.mjs"
import Node from "./Node.mjs"
import store from "./store.mjs"
import typeOf from "./toType.mjs"

const nodeType = Node.registerType("DATA_NODE")
export default class DataNode extends Node {
    static get DATA_NODE(){ return nodeType }

    static from(seed, { name="" } = {}){
        try { seed = typeOf(seed) == "string" ? JSON.parse(seed) : seed } catch(e){}

        const type = typeOf(seed)
        let node

        switch(type) {
            case "array":
            case "set":
                node = Object.setPrototypeOf(new Node({ name, type:"DATA_NODE" }), DataNode.prototype)
                seed.forEach(seed => node.appendChild(DataNode.from(seed == undefined ? null : seed )))
                break
            case "map":
                node = Object.setPrototypeOf(new Node({ name, type:"DATA_NODE" }), DataNode.prototype)
                seed.forEach((seed, name) => seed !== undefined && node.appendChild(DataNode.from(seed, { name })))
                break
            case "object":
                node = Object.setPrototypeOf(new Node({ name, type:"DATA_NODE" }), DataNode.prototype)
                Object.keys(seed).forEach(name => seed[name] !== undefined && node.appendChild(DataNode.from(seed[name], { name })))
                break
            case "boolean":
            case "number":
            case "null":
            case "string":
                node = Object.setPrototypeOf(new Node({ name, type:"DATA_NODE", value: seed }), DataNode.prototype)
                break
            default:
                throw new TypeError(ERR_INVALID_DATA)
                break
        }

        return node
    }

    constructor(){
        throw new Error(ERR_ILLEGAL_CONSTRUCTOR)
    }

    get innerContent(){
        const outer = this.outerContent
        return outer[this.nodeName] || outer
    }
    get innerXML(){
        return this.toXML().innerHTML
    }
    get outerContent() {
        return this.toJSON()
    }
    get outerXML(){
      return this.toXML().outerHTML
    }

    toJSON(){
        // if node has a proper value, return a array
        if ( this.nodeValue !== null ) {
            if ( !this.hasChildNodes() )
              return this.nodeValue

            const inner = [this.nodeValue]
            this.childNodes.forEach(child => {
                if ( child.nodeName )
                  inner.push({ [child.nodeName]: child.toJSON() })
                else inner.push( child.toJSON() )
            })

            return inner
        }

        const inner = { length: 0 }
        let hasNamedProp = null

        this.childNodes.forEach(child => {
            if ( child.nodeName )
              hasNamedProp = true
            inner[child.nodeName||inner.length++] = child.toJSON()
        })

        if ( !inner.length )
          delete inner.length
        return hasNamedProp
            ? inner
            : Reflect.apply(Array.prototype.slice, inner, [])
    }
    toXML(){
        const tree = store.get(this).get(sdummy).cloneNode(true)

        void [...tree.querySelectorAll("[value]")].forEach(node => {
            const value = node.getAttribute("value")
            node.removeAttribute("value")
            node.insertBefore(document.createTextNode(value), node.childNodes[0])
        })

        return tree
    }
}
