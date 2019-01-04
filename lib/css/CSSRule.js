"use strict"

import { ERR_STRING_EXPECTED, ERR_FN_EXPECTED } from "errors"
import CSSHook from "css/CSSHook"
import Event from "events/Event"
import Node from "nodes/Node"
import Serializer from "serializers/Serializer"
import store from "store"
import typeOf from "utils/toType"

import { sdummy } from "events/EventTarget"
const scssrule = new Object(Symbol())
const sproperty = new Object(Symbol())
const sprophandler = new Object(Symbol())
const sselectortext = new Object(Symbol())

class CSSRuleEvent extends Event {
    static get TYPE(){ return "cssruleevent" }

    constructor(type, {cssRule, from, to}){
        super(type||CSSRuleEvent.TYPE)
        store.get(this).set(scssrule, cssRule)
    }

    get cssRule(){ return store.get(this).get(scssrule) }
}

export class Reset extends CSSRuleEvent {
    static get TYPE(){ return "reset" }
    constructor({ cssRule, from, to }){
        super(Reset.TYPE, { cssRule, from, to })
    }
}

export class TextUpdate extends CSSRuleEvent {
    static get TYPE(){ return "textupdate" }
    constructor({ cssRule, from, to }){
        super(TextUpdate.TYPE, { cssRule, from, to })
    }
}

export class SelectorUpdate extends CSSRuleEvent {
    static get TYPE(){ return "selectorupdate" }
    constructor({ cssRule, from, to }){
        super(SelectorUpdate.TYPE, { cssRule, from, to })
    }
}

const rcssparse = /(?:\s|$)*([^{]*)(?:\s|$)*{(.*)}(?:\s|$)*/
const serializer = new Serializer({ delimiter: ":", separator: ";" })

export default class CSSRule extends Node {
    static get events(){ return { Reset, TextUpdate, SelectorUpdate} }

    static objectifyCssText(string){ return serializer.objectify(string) }
    static serializeCssText(object){ return serializer.stringify(object)  }
    static hook(property, propertyHandler){ return new CSSHook(property, propertyHandler) }

    constructor(...args){
        super()

        let fromstr = false

        store.get(this).set(sselectortext, args.length > 1 && typeOf(args[0]) == "string" && isNaN(+args[0]) ? args.shift()
                      : args.length == 1 && typeOf(args[0]) == "string" ? (fromstr = true, (rcssparse.exec(args[0])||[])[1]||"")
                      : (fromstr = true, args.shift(), (rcssparse.exec(args[0])||[])[1]||""))

        this.cssText = fromstr ? (rcssparse.exec(args.pop())||[])[2]||""
                     : typeOf(args[args.length-1]) == "string" ? args.pop()
                     : typeOf(args[args.length-1]) == "object" ? CSSRule.serializeCssText(args.pop())
                     : ""
    }

    get cssText(){ return store.get(this).get(sdummy).style.cssText }
    set cssText(v){
        const from = store.get(this).get(sdummy).style.cssText
        store.get(this).get(sdummy).style.cssText = ""

        const props = CSSRule.objectifyCssText(v)
        Object.keys(props).forEach(k => this.setProperty(k, props[k]))
        const to = store.get(this).get(sdummy).style.cssText

        if ( from !== to )
          this.dispatchEvent(new Reset({ cssRule:this, from, to }))
    }
    get selectorText(){ return store.get(this).get(sselectortext) }
    set selectorText(to){
        const from = this.selectorText
        store.get(this).set(sselectortext, to)

        if ( from && from !== "null" && from !== to )
          this.dispatchEvent(new SelectorUpdate({ cssRule: this, from, to }))
    }

    getProperty(...args){
        return Reflect.apply(CSSStyleDeclaration.prototype.getPropertyValue, store.get(this).get(sdummy).style, args)
    }

    setProperty(prop, value){
        const from = this.getProperty(prop)

        CSSHook.getHook(prop)
          .forEach(({transform}) => {
              transform(value)
                .forEach(({property, value})=>{
                    store.get(this).get(sdummy).style.setProperty(property, value)

                    const to = this.getProperty(prop)

                    if ( from !== to )
                      this.dispatchEvent(new TextUpdate({ cssRule:this, from, to }))
                })
          })
    }

    toString(){
        return `${this.selectorText}{${this.cssText}}`
    }

}
