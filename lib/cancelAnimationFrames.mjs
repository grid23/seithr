"use strict"

import store from "./store.mjs"

export default (generatorFn) => {
    if ( store.has(generatorFn) )
      store.set(generatorFn, false)
}
