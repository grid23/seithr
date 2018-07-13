"use strict"

import store from "./store.mjs"

export default Class => {
    const Singleton = class extends Class {
        constructor(...args){
          if ( store.has(Singleton) )
            return store.get(Singleton)
          super(...args)
          store.set(Singleton, this)
        }
    }

    void [
        ...Object.getOwnPropertyNames(Class)
      , ...Object.getOwnPropertySymbols(Class)
    ].forEach(staticProperty => {
      if (  (Object.getOwnPropertyDescriptor(Singleton, staticProperty)||{configurable:true}).configurable )
        Object.defineProperty(Singleton, staticProperty, Object.getOwnPropertyDescriptor(Class, staticProperty))
    })

    return Singleton
}
