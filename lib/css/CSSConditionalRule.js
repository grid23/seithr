"use strict"

import { ERR_CSSTEXT } from "errors"
import Event from "events/Event"
import CSSRule, { TextUpdate } from "css/CSSRule"
import Node from "nodes/Node"
import store from "store"

const rconditional = /^\@(document|supports|media)([^\{]*)\{(.*)\}/i
const updaters_text = new WeakMap

const sactive = new Object(Symbol())
export const sadd = new Object(Symbol())
const satsheet = new Object(Symbol())
const sbasecsstext = new Object(Symbol())
const sbufferrules = new Object(Symbol())
const sconditiontext = new Object(Symbol())
export const sremove = new Object(Symbol())
const srules = new Object(Symbol())
const ssync = new Object(Symbol())
const stype = new Object(Symbol())

export default class CSSConditionalRule extends Node {
    constructor(condition = ""){
        super()

        const atrule = rconditional.exec(condition)
        const type = atrule[1]
        const conditionText = atrule[2]
        const cssText = atrule[3]

        if ( !type || !conditionText )
          throw new TypeError(ERR_CSSTEXT)

        store.set(this, new WeakMap)
        store.get(this).set(stype, type)
        store.get(this).set(sconditiontext, conditionText)
        store.get(this).set(sbasecsstext, cssText.trim())

        store.get(this).set(ssync, false)
        store.get(this).set(srules, [])
        store.get(this).set(sbufferrules, [])
        store.get(this).set(satsheet, [])
        store.get(this).set(sadd, rule => {
            store.get(this).get(satsheet).push(rule)
            store.get(this).set(sactive, true)
            this.insertRule(store.get(this).get(sbufferrules))
        })
        store.get(this).set(sremove, rule => {
            let idx = store.get(this).get(satsheet)

            if ( idx !== -1 )
              store.get(this).get(satsheet).splice(idx, 1)

            if ( !store.get(this).get(satsheet).length )
              store.get(this).set(sactive, false)
        })
    }

    get condition(){ return store.get(this).get(stype) }
    get conditionText(){ return store.get(this).get(sconditiontext) }
    get cssText(){
        if ( store.get(this).get(sactive) )
          return store.get(this).get(satsheet)[0].cssText
        return store.get(this).get(sbasecsstext)
    }

    deleteRule(...args){
        const rules = args && args[0][Symbol.iterator] ? args.shift()
                    : args.length ? args
                    : []

        rules.forEach(rule => {
            let is_rule = false
            let is_conditional = false

            rule = rule instanceof CSSRule ? (is_rule = true, rule)
                 : rule instanceof CSSConditionalRule ? (is_conditional = true, rule)
                 : null

            if ( !rule )
              return

            if ( !store.get(this).get(sactive) ) {
                let idx

                while ( idx = store.get(this).get(sbufferrules).indexOf(rule), idx !== -1 )
                  store.get(this).get(sbufferrules).splice(idx, 1)
            }

            else {
                if ( is_rule ) {
                    store.get(this).get(satsheet).forEach(cond_rule => {
                        let idx = -1

                        while ( idx = store.get(this).get(srules).indexOf(rule), idx != -1 )
                          cond_rule.deleteRule(idx),
                          store.get(this).get(srules).splice(idx, 1)

                        while ( idx = store.get(this).buffer_rules.indexOf(rule), idx != -1 )
                          store.get(this).get(sbufferrules).splice(idx, 1)
                    })

                    if ( updaters_text.has(rule) )
                        rule.removeEventListener(TextUpdate.TYPE, updaters_text.get(rule)),
                        updaters_text.delete(rule)
                } else if ( is_conditional ){
                    store.get(this).get(satsheet).forEach(cond_rule => {
                        let idx = -1
                        while ( idx = store.get(this).get(srules).indexOf(rule), idx != -1 ) {
                            store.get(rule).get(sremove)( cond_rule.cssRules[idx] )
                            cond_rule.deleteRule(idx)
                            store.get(this).get(srules).splice(idx, 1)
                        }

                        while ( idx = store.get(this).get(sbufferrules).indexOf(rule), idx != -1 )
                          store.get(this).get(sbufferrules).splice(idx, 1)
                    })
                }
            }
        })
    }

    insertRule(...args){
        const rules = args && args[0][Symbol.iterator] ? args.shift()
                    : args.length ? args
                    : []

        rules.forEach(rule => {
            let is_rule = false
            let is_conditional = false

            rule = rule instanceof CSSRule ? (is_rule = true, rule)
                 : rule instanceof CSSConditionalRule ? (is_conditional = true, rule)
                 : (is_rule = true, new CSSRule(rule))

            store.get(this).get(sbufferrules).push(rule)

            if ( store.get(this).get(sactive) ) {
                if ( is_rule ) {
                    let idx = -1

                    store.get(this).get(satsheet).forEach(cond_rule => {
                        if ( idx == -1 )
                          idx = cond_rule.cssRules.length,
                          store.get(this).get(srules)[idx] = rule

                        cond_rule.insertRule(rule.toString(), idx)
                    })

                    if ( !updaters_text.has(rule) )
                      updaters_text.set(rule, ({cssRule}) => {
                          store.get(this).get(satsheet).forEach(cond_rule => {
                              let idxs = []
                              store.get(this).get(srules).forEach((rule, idx) => {
                                  if ( rule === cssRule ) idxs.push(idx)
                              })
                              idxs.forEach(idx => cond_rule.cssRules[idx].style.cssText = cssRule.cssText)
                          })
                      })

                    rule.addEventListener(TextUpdate.TYPE, updaters_text.get(rule))
                }
                else if ( is_conditional ){
                    let idx = -1
                    store.get(this).get(satsheet).forEach(cond_rule => {
                        if ( idx == -1 )
                            idx = cond_rule.cssRules.length,
                            store.get(this).get(srules)[idx] = rule

                        cond_rule.insertRule(rule.toString(), idx)
                        store.get(rule).get(sadd)( cond_rule.cssRules[idx] )
                    })
                }

            }
        })
    }

    toString(){ return `@${this.condition}${this.conditionText}{${this.cssText}}` }
}
