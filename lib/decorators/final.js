"use strict"

export default ({kind, key, placement, descriptor}) => {
    return {
        kind, key, placement, descriptor:{ ...descriptor, configurable:false }
    }
}
