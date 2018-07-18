"use strict"

import store from "./store.mjs"
import ZExpression from "ZExpression2.mjs"

class Input {
    constructor({expression}){
        store.set(this, new WeakMap)
    }
}

class output {
    constructor(){
        store.set(this, new WeakMap)
    }
}

export default class ZParser {
    static parse(...args){
        return new ZParser().parse(...args)
    }

    parse(expression=new ZExpression){
        if ( !(expression instanceof ZExpression) )
          expression = new ZExpression(expression)

        const stream = expression.toStream()
        const input = new Input
        const output = new Output

        while ( )
    }
}
