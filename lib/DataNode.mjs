"use strict"

import { ERR_ILLEGAL_CONSTRUCTOR, ERR_INVALID_DATA } from "./error.mjs"

import Node from "./Node.mjs"
import { snodename, snodetype, snodevalue } from "./Node.mjs"
import store from "./store.mjs"
import typeOf from "./toType.mjs"

export default class DataNode extends Node {
    static get DATA_NODE(){ return 14 }

    static from(seed, { name="" } = {}){
        try { seed = typeOf(seed) == "string" ? JSON.parse(seed) : seed } catch(e){}

        const type = typeOf(seed)
        let node

        switch(type) {
            case "array":
            case "set":
                node = Object.setPrototypeOf(new Node({ name, dummyName: "ol", type:"DATA_NODE" }), DataNode.prototype)
                seed.forEach(seed => node.appendChild(DataNode.from(seed == undefined ? null : seed )))
                break
            case "map":
                node = Object.setPrototypeOf(new Node({ name, dummyName: "ul", type:"DATA_NODE" }), DataNode.prototype)
                seed.forEach((seed, name) => seed !== undefined && node.appendChild(DataNode.from(seed, { name })))
                break
            case "object":
                node = Object.setPrototypeOf(new Node({ name, dummyName: "ul", type:"DATA_NODE" }), DataNode.prototype)
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

    }
    get outerContent(){

    }

    toJSON(){}
    toXML(){}
}
