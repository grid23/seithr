"use strict"

import store from "store"

export default (generatorFn) => {
    if ( store.has(generatorFn) )
      store.set(generatorFn, false)
}
