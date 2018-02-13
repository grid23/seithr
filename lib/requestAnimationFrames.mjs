"use strict"

import { ERR_GENERATOR_EXPECTED } from "./error.mjs"
import store from "./store.mjs"

export default async (generatorFn) => {
    const typeOf = Reflect.apply(Object.prototype.toString, generatorFn, []).slice(8, -1)

    const generator = typeOf === "GeneratorFunction" ? generatorFn()
              : typeOf === "Generator" ? generatorFn
              : new TypeError(ERR_GENERATOR_EXPECTED)

    return new Promise(resolve => {
        if ( generator instanceof Error )
          throw generator

        store.set(generatorFn, true)
        const onframe = () => {
            if ( store.get(generatorFn) === false ) {
                return resolve(null)
                store.delete(generatorFn)
            }

            const { value, done } = generator.next()

            if ( !done ) requestAnimationFrame(onframe)
            else {
              resolve(value)
              store.delete(generatorFn)
            }
        }
        requestAnimationFrame(onframe)
    })
}
