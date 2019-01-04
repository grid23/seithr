"use strict"
import { ERR_SS_NOT_WRITABLE } from "errors"
import CSSConditionalRule from "css/CSSConditionalRule"
import CSSRule, { TextUpdate } from "css/CSSRule"
import domready from "utils/domready"
import Event from "events/Event"
import isSameDomain from "utils/isSameDomain"
import Node from "nodes/Node"
import store from "store"
import typeOf from "utils/toType"
import UID from "uids/UID"
import ZParser from "views/ZParser"

import { sadd, sremove } from "css/CSSConditionalRule"
const suid = new Object(Symbol())
const snode = new Object(Symbol())
const sready = new Object(Symbol())
const srules = new Object(Symbol())
const ssheet = new Object(Symbol())
const swritable = new Object(Symbol())

const updaters_text = new WeakMap

export class Ready extends Event {
    static get TYPE(){ return "ready" }

    constructor(sheet){
        super(Ready.TYPE)
        store.get(this).set(ssheet, sheet)
    }

    get sheet(){ return store.get(this).get(ssheet) }
}

export default class Stylesheet extends Node {
    static get isLocalFile(){ return isSameDomain }

    constructor(...args){
        super()

        const rules = typeOf(args[args.length-1]) == "array" ? [].concat(args.pop()) : []
        const dict = typeOf(args[args.length-1]) == "object" ? args.pop() : { node: args.pop() }
        args =  null

        store.get(this).set(suid, typeOf(dict.id) == "string" ? dict.id : UID.uid())
        store.get(this).set(swritable, true)
        store.get(this).set(srules, [])

        store.get(this).set(snode, function(node){
            if ( node && node.nodeType === window.Node.ELEMENT_NODE && ["STYLE", "LINK"].includes(node.nodeName) )
              return node

            if ( typeOf(node) == "string" ) {
                if ( !Stylesheet.isLocalFile(node) )
                  store.get(this).set(swritable, false)
                const href = node
                node = ZParser.parse(`link#${store.get(this).get("uid")}[rel=stylesheet][href=${href}]`).tree.childNodes[0]
            }
            else {
                node = ZParser.parse(`style#${store.get(this).get("uid")}`).tree.childNodes[0]
                node.appendChild( document.createTextNode( rules.splice(0).join("\n") ) )
            }

            if ( dict.media )
              node.setAttribute("media", dict.media)

            domready().then(({nodes}) => {
                nodes.head.appendChild(node)

                requestAnimationFrame(hrt=>{
                    if ( !!dict.disabled )
                      node.disabled = true
                })
            })

            return node
        }.call(this, dict.node||dict.href||void 0))

        store.get(this).set(sready, new Promise((resolve, reject) => {
            const onload = e => {
                if ( store.get(this).get(swritable) && rules && !!rules.length )
                  this.insertRule(rules)

                resolve(store.get(this).get(swritable))
                store.get(this).set(ssheet, store.get(this).get(snode).sheet)
                this.dispatchEvent(new Ready(store.get(this).get("sheet")))
            }

            if ( "msSetImmediate" in window ) // no events for <style> on ie
              msSetImmediate(onload) //TODO test on edge
            else
              store.get(this).get(snode).addEventListener("load", onload),
              store.get(this).get(snode).addEventListener("error", function(e){
                  console.error(e)
                  reject(e)
              })
        }))
    }

    get media(){ return store.get(this).get(snode).getAttribute("media") }
    set media(v){ store.get(this).get(snode).setAttribute("media", v) }
    get node(){ return store.get(this).get(snode) }
    get sheet(){ return store.get(this).get(snode).sheet }

    async deleteRule(...args){
        const rules = typeOf(args[0]) == "array" ? args.shift()
                    : args.length ? args
                    : []

        const writable = await store.get(this).get(sready)

        rules.forEach(rule => {
            let is_rule = false
            let is_conditional = false

            rule = rule instanceof CSSRule ? (is_rule = true, rule)
                 : rule instanceof CSSConditionalRule ? (is_conditional = true, rule)
                 : null

            if ( !rule )
              return

            if ( is_rule ) {
                if ( updaters_text.has(rule) )
                  rule.removeEventListener(TextUpdate.Type, updaters_text.get(rule)),
                  updaters_text.delete(rule)

                  let idx = -1
                  while ( idx = store.get(this).get(srules).indexOf(rule), idx != -1 )
                    store.get(this).get(ssheet).deleteRule(idx),
                    store.get(this).get(srules).splice(idx, 1)


            }
            else if ( is_conditional ){
                let idx = -1
                while ( idx = store.get(this).get(srules).indexOf(rule), idx != -1 ) {
                    store.get(rule).get(sremove)( store.get(this).get(ssheet).cssRules[idx] )
                    store.get(this).get(ssheet).deleteRule(idx)
                    store.get(this).get(srules).splice(idx, 1)
                }

            }
        })
    }

    async insertRule(...args){
        const rules = typeOf(args[0]) == "array" ? args.shift()
                    : args.length ? args
                    : []

        const writable = await store.get(this).get(sready)

        if ( !writable )
          throw new Error(ERR_SS_NOT_WRITABLE)

        rules.forEach(rule => {
            let is_rule = false
            let is_conditional = false

            rule = rule instanceof CSSRule ? (is_rule = true, rule)
                 : rule instanceof CSSConditionalRule ? (is_conditional = true, rule)
                 : (is_rule = true, new CSSRule(rule))

            const idx = store.get(this).get(ssheet).cssRules.length
            store.get(this).get(srules)[idx] = rule

            if ( is_rule ) {
               store.get(this).get(ssheet).insertRule(rule.toString(), idx)

               if ( !updaters_text.has(rule) )
                 updaters_text.set(rule, ({cssRule}) => {
                     let idxs = []
                     store.get(this).get(srules).forEach((rule, idx) => {
                         if ( rule === cssRule ) idxs.push(idx)
                     })
                     idxs.forEach(idx => store.get(this).get(ssheet).cssRules[idx].style.cssText = cssRule.cssText)
                 })

               rule.addEventListener(TextUpdate.TYPE, updaters_text.get(rule))
            }
            else if ( is_conditional ){
               store.get(this).get(ssheet).insertRule(rule.toString(), idx)
               store.get(rule).get(sadd)( store.get(this).get(ssheet).cssRules[idx] )
            }
        })
    }
}
