"use strict"

const frozen = (deep, { descriptor, key, kind, placement, initializer }) => {
    if ( kind !== "field" )
      return { descriptor, key, kind, placement, initializer }

    //TODO deep support :D
    return {
        key, kind, placement
      , descriptor:{ configurable: false, enumerable:descriptor.enumerable, writable: false }
      , initializer: function(){
            return () => Object.freeze(initializer())
        }()
    }
}

export default (...args) => {
    if ( typeof args[0] === "boolean" )
      return (...args) => frozen(true, ...args)
    else
      return frozen(false, ...args)
}
