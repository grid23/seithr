"use strict"

import { ERR_NODE_NOT_CHILD, ERR_NODE_NOT_IMPLEMENTED, ERR_READ_ONLY, ERR_SAME_OBJ } from "./error.mjs"
import EventTarget from "./EventTarget.mjs"
import { sdummy } from "./EventTarget.mjs"
import store from "./store.mjs"

export const snodename = new Object(Symbol())
export const snodetype = new Object(Symbol())
export const snodevalue = new Object(Symbol())
export const sreadonly = new Object(Symbol())

export default class Node extends EventTarget {
    static get [Symbol.species]() { return Node }

    //   const unsigned short ELEMENT_NODE = 1;
    //   const unsigned short ATTRIBUTE_NODE = 2;
    //   const unsigned short TEXT_NODE = 3;
    //   const unsigned short CDATA_SECTION_NODE = 4;
    //   const unsigned short ENTITY_REFERENCE_NODE = 5; // historical
    //   const unsigned short ENTITY_NODE = 6; // historical
    //   const unsigned short PROCESSING_INSTRUCTION_NODE = 7;
    //   const unsigned short COMMENT_NODE = 8;
    //   const unsigned short DOCUMENT_NODE = 9;
    //   const unsigned short DOCUMENT_TYPE_NODE = 10;
    //   const unsigned short DOCUMENT_FRAGMENT_NODE = 11;
    //   const unsigned short NOTATION_NODE = 12; // historical
    static get OBJECT_NODE() { return 13 }


    constructor({ name="", type="OBJECT_NODE", value=null, readonly=false } = {}){
        super()
        store.set(store.get(this).get(sdummy), this) //cross-reference

        store.get(this).set(snodename, name && name.toString())
        store.get(this).set(snodetype, ( typeof Node[type] == "number" ? Node[type]
                                       : typeof this.constructor[type] == "number") ? this.constructor[type]
                                       : Node.OBJECT_NODE )
        store.get(this).set(snodevalue, value)
        store.get(this).set(sreadonly, !!readonly)
    }

    get childNodes(){
        const domchildren = [...store.get(this).get(sdummy).childNodes]
        return domchildren && domchildren.map(dummy => store.get(dummy))
    }
    get children(){ return this.childNodes }
    get firstChild(){
        const domnode = store.get(this).get(sdummy).firstChild
        return domnode && store.get(domnode)
    }
    get lastChild(){
        const domnode = store.get(this).get(sdummy).lastChild
        return domnode && store.get(domnode)
    }
    get nextSibling(){
        const domnode = store.get(this).get(sdummy).nextSibling
        return domnode && store.get(domnode)
    }
    get nodeName(){
        return store.get(this).get(snodename)
    }
    get nodeType(){
        return store.get(this).get(snodetype)
    }
    get nodeValue(){
        return store.get(this).get(snodevalue)
    }
    set nodeValue(v){
        if ( store.get(this).get(sreadonly)  )
          throw new Error(ERR_READ_ONLY)
        store.get(this).set(snodevalue, v)
    }
    get parentNode(){
        const domnode = store.get(this).get(sdummy).parentNode
        return domnode && store.get(domnode)
    }
    get previousSibling(){
        const domnode = store.get(this).get(sdummy).previousSibling
        return domnode && store.get(domnode)
    }
    get readonly(){
        return store.get(this).get(sreadonly)
    }
    get rootNode(){ return this.getRootNode() }
    get siblings(){
        const domsiblings = store.get(this).get(sdummy).siblings
        return domsiblings && domsiblings.map(dummy => store.get(dummy))
    }

    appendChild(node){
        const parent = store.get(this).get(sdummy)
        const child = store.get(node).get(sdummy)
        return store.get(parent.appendChild(child))
    }

    comparePosition(node){
        const a = store.get(this).get(sdummy)
        const b = store.get(node).get(sdummy)
        return a.comparePosition(b)
    }

    contains(node){
        const a = store.get(this).get(sdummy)
        const b = store.get(node).get(sdummy)
        return a.contains(b)
    }

    getRootNode(){
        const domnode =  store.get(this).get(sdummy).getRootNode()
        return domnode && store.get(domnode)
    }

    hasChildNodes(){
        return store.get(this).get(sdummy)
    }

    insertBefore(node, referenceNode){
        const parent = store.get(this).get(sdummy)
        const child = store.get(node).get(sdummy)
        const referenceChild = store.get(referenceNode).get(sdummy)

        return store.get(parent.insertBefore(child, referenceChild))
    }

    isEqualNode(node){ //check if node is an instance of the same class as this
        return node instanceof this.constructor
    }

    isSameNode(node){ return this === node }

    removeChild(node){
        const parent = store.get(this).get(sdummy)
        const child = store.get(node).get(sdummy)
        return store.get(parent.removeChild(child))
    }

    replaceChild(node, referenceNode){
        const parent = store.get(this).get(sdummy)
        const child = store.get(node).get(sdummy)
        const referenceChild = store.get(referenceNode).get(sdummy)

        return store.get(parent.replaceChild(child, referenceChild))
    }

    valueOf(){ return this.nodeValue }
}
