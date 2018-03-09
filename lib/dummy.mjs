"use strict"

import { client, server } from "./environment.mjs"

// import EventEmitter from "events"
// import store from "./store"
//
// class Dummy extends EventEmitter {
//     constructor(...args){
//         super(args)
//     }
//
//     /* EventTarget-like properties from node.js EventEmitter */
//     addEventListener(...args){ return Reflect.apply(EventEmitter.prototype.addListener, this, args) }
//     dispatchEvent(...args){ return Reflect.apply(EventEmitter.prototype.emit, this, args)}
//     removeEventListener(...args){ return Reflect.apply(EventEmitter.prototype.removeListener, this, args) }
//
//     /* disable node.js props */
//     get addListener(){ return null }
//     get emit(){ return null }
//     get off(){ return null }
//     get on(){ return null }
//     get once(){ return null }
//     get removeListener(){ return null }
//
//     /* Node-like properties */
//     appendChild(){}
//     get childNodes(){}
//     cloneNode(){}
//     compareDocumentPosition(){}
//     contains(){}
//     get firstChild(){}
//     getRootNode(){}
//     hasChildNodes(){}
//     insertBefore(){}
//     isConnected(){}
//     isEqualNode(){}
//     isSameNode(){}
//     lastChild(){}
//     nextSibling(){}
//     get nodeName(){}
//     get nodeType(){}
//     get nodeValue(){}
//     set nodeValue(v){}
//     normalize(){}
//     get parentNode(){}
//     get previousSibling(){}
//     removeChild(){}
//     replaceChild(){}
//     get textContent(){}
//     set textContent(v){}
// }

export default () => {
    if ( client )
      return document.createElement("div")
    // return new Dummy
}
