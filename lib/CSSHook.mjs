"use strict"

import store from "./store.mjs"

const hookedprops = new WeakMap
const defaulthandler = function(v){
    return [{ property: this.property, value: v }]
}

export default class CSSHook {
    static getHook(property){
        if ( hookedprops.has(property) )
          return [...hookedprops.get(property)]
        else return [{transform: defaulthandler.bind({property})}]
    }

    constructor(property, propertyHandler=defaulthandler){
        if ( typeOf(property) !== "string" )
          throw new TypeError(ERR_STRING_EXPECTED)
        if ( typeOf(prophandler) !== "function" )
          throw new TypeError(ERR_FN_EXPECTED)

        store.set(this, new WeakMap)
        store.get(this).set(sproperty, property)
        store.get(this).set(sprophandler, propertyHandler)
    }

    get property(){ return store.get(this).get(sproperty) }

    transform(v){
        return Reflect.apply(store.get(this).get(sprophandler), this, v)
    }
}
