"use strict"

const dummy = document.createElement("a")
export default path => {
    dummy.href = path

    return dummy.hostname === location.hostname
         ? true
         : !dummy.hostname ? true // ie/edge doesn't set the hostname if not "necessary"
         : false
}
