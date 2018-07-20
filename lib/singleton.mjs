"use strict"

import store from "./store.mjs"

export default Class => {

    const Singleton = function(){
        return function(...args){
            if ( store.has(Class) )
              return store.get(Class)

            const singleton = new Class(...args)
            store.set(Class, singleton)
            return singleton
        }
    }(Class)

    void [
        ...Object.getOwnPropertyNames(Class)
      , ...Object.getOwnPropertySymbols(Class)
    ].forEach(staticProperty => {
      if (  (Object.getOwnPropertyDescriptor(Singleton, staticProperty)||{configurable:true}).configurable )
        Object.defineProperty(Singleton, staticProperty, Object.getOwnPropertyDescriptor(Class, staticProperty))
    })

    return Singleton
}
