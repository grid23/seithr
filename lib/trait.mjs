"use strict"

//TODO strenghten

export const sparents = Symbol("parents")

export default (...classes) => {
    const Class = class extends classes.pop() {}

    const prototypes = classes.reduce((accumulator, Class) => {
        const prototypes = [Class.prototype]

        while ( Class = Object.getPrototypeOf(Class), Class != Function.prototype )
          prototypes.unshift(Class.prototype)

        prototypes.forEach(prototype => accumulator.add(prototype))
        return accumulator
    }, new Set)

    prototypes.forEach(prototype =>
      [...Object.getOwnPropertyNames(prototype), ...Object.getOwnPropertySymbols(prototype)]
        .forEach(property =>
            Object.defineProperty(Class.prototype, property, Object.getOwnPropertyDescriptor(prototype, property))))

    Object.defineProperty(Class.prototype, "constructor", { configurable:true, value: Class })

    return Class
}
