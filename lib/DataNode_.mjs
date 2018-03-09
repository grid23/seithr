"use strict"

import { ERR_ILLEGAL_CONSTRUCTOR, ERR_INVALID_DATA, ERR_READ_ONLY } from "./error.mjs"
import Node from "./Node.mjs"
import { snodename, snodetype, snodevalue, sreadonly } from "./Node.mjs"
import store from "./store.mjs"

export default class DataNode extends Node {
    static get BRANCH_NODE() { return 14 }
    static get FOREST_NODE() { return 15 }
    static get LEAF_NODE() { return 16 }

    static from(seed, { readonly=false } = {}, parent){

        const node = this instanceof DataNode
                   ? this : Object.setPrototypeOf(new Node({readonly}), DataNode.prototype)

        const ifArray = seed => {
            store.get(node).set(snodetype, DataNode.FOREST_NODE)
            seed.forEach(child => node.appendChild( DataNode.from(child, {readonly}, node) ))
        }

        const ifObject = seed => {
            const keys = Object.keys(seed)

            if ( keys.length == 1 ) {
                store.get(node).set(snodename, keys.pop())
                const nodeValue = seed[ node.nodeName ]

                switch ( Reflect.apply(Object.prototype.toString, nodeValue, []) ) {
                    case "[object Array]":
                        ifArray(nodeValue)
                        break
                    case "[object Object]":
                        store.get(node).set(snodetype, DataNode.BRANCH_NODE)
                        Object.keys(nodeValue)
                          .forEach(key => nodeValue[key] !== undefined
                                          && node.appendChild( DataNode.from({[key]:nodeValue[key]} , {readonly}, node) ))
                        //ifObject(nodeValue)
                        break
                    default:
                        ifOther(nodeValue)
                        break
                }
            }
            else {
                store.get(node).set(snodetype, DataNode.BRANCH_NODE)
                keys.forEach(key => seed[key] !== undefined && node.appendChild( DataNode.from({[key]:seed[key]} , {readonly}, node) ))
            }
        }

        const ifOther = seed => {
            store.get(node).set(snodetype, DataNode.LEAF_NODE)

            try {
                seed = JSON.parse(JSON.stringify(
                       seed !== undefined
                    || (seed === undefined && !parent )
                    || (seed === undefined && parent && parent.nodeType !== DataNode.FOREST_NODE)
                     ? seed : null))
            } catch(error){
                throw new TypeError(ERR_INVALID_DATA)
            }


            store.get(node).set(snodevalue, seed)
        }

        switch ( Reflect.apply(Object.prototype.toString, seed, []) ) {
            case "[object Array]":
                ifArray(seed)
                break
            case "[object Object]":
                ifObject(seed)
                break
            default:
                ifOther(seed)
                break
        }

        return node
    }

    constructor() { throw new Error(ERR_ILLEGAL_CONSTRUCTOR) }

    get nodeValue(){
        switch ( this.nodeType ) {
            case DataNode.BRANCH_NODE:
                let i = 0
                const branch = {}
                this.childNodes.forEach(({nodeName, nodeValue}) => branch[nodeName || i++] = nodeValue)
                if ( i ) branch.length = ++i
                return branch
            case DataNode.FOREST_NODE:
                return this.childNodes.map(node => node.toJSON())
            case DataNode.LEAF_NODE:
                return super.nodeValue
            default:
              throw new Error(ERR_TYPE_UNKNOWN)
        }
    }
    set nodeValue(v){
        if ( this.readonly )
          throw new Error(ERR_READ_ONLY)
        if ( this.nodeType !== DataNode.LEAF_NODE )
          throw new Error(ERR_NOT_A_LEAF)
        Reflect.apply(DataNode.from, this, [v])
    }

    toJSON() {
        return this.nodeName
               ? { [this.nodeName]: this.nodeValue }
               : this.nodeValue
    }
}
