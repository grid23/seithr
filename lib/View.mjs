"use strict"

import Model from "./Model.mjs"
import Node from "./Node.mjs"
import store from "./store.mjs"
import typeOf from "./toType.mjs"
import UID from "./UID.mjs"
import ZExpression from "./ZExpression.mjs"
import ZParser from "./ZParser.mjs"

const sexpression = new Object(Symbol())
const sfragment = new Object(Symbol())
const smodel = new Object(Symbol())
const stemplate = new Object(Symbol())
const suid = new Object(Symbol())

export default class View extends Node {

    constructor(...args){
        super()
        const dict = typeOf(args[0]) == "string" ? { template: args.shift() }
             : args[0] instanceof ZExpression ? { template: args.shift() }
             : typeOf(args[0]) == "object" && (typeOf(args[0].template) == "string" || args[0].template instanceof ZExpression ) ? args.shift()
             : { template: null }
        const model = args[args.length-1] instanceof Model ? args.pop()
                    : "string, object".indexOf(typeOf(args[args.length-1])) != -1 ? new Model(args.pop())
                    : new Model
        const template = typeOf(dict.template) == "string" || dict.template instanceof ZExpression
                          ? dict.template
                       : typeOf(this.constructor.prototype._template) == "string"
                          ? this.constructor.prototype._template
                       : typeOf(this.constructor.prototype._expression) == "string"
                          ? this.constructor.prototype._expression
                       : ""

        store.get(this).set(sexpression, template instanceof ZExpression ? template : new ZExpression(template))
        console.log(template)
        store.get(this).set(smodel, model)
        store.get(this).set(stemplate, ZParser.parse(this.expression, this.model))
        this.appendChild(this.template)
        store.get(this).set(suid, UID.uid())

    }

    get expression(){ return store.get(this).get(sexpression) }
    get fragment(){ return this.template.tree }
    get model(){ return store.get(this).get(smodel) }
    get references(){ return this.refs }
    get refs(){ return this.template.references }
    get root(){
        const root = this.queryAll("root")
        return root.length == 1 ? root[0] : root
    }
    get template(){ return store.get(this).get(stemplate) }
    get uid(){ return store.get(this).get(suid) }
    get vars(){ return this.template.vars }


    query(query){
        if ( this.refs.hasOwnProperty(query) )
          return [...this.refs[query]][0]
    }

    queryAll(query){
        if ( this.refs.hasOwnProperty(query) )
          return [...this.refs[query]]
    }

    recover(){
        const nodes = this.queryAll("root")

        while ( nodes.length ) {
            const node = nodes.shift()

            if ( node.parentNode !== this.fragment )
              this.fragment.appendChild(node)
        }

    }
}
