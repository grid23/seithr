"use strict"

import "core-js/stable"
import "regenerator-runtime/runtime"
import "proxy-polyfill"

import "./nodes"
import "./views"

// import "./events"
// import "./models"
// import "./serializers"
// import "./cookies"
// import "./routing"
// import "./utils"
// import "./css"
// import "./animationFrames"

//import "./graphs"

export const run = () => {
    mocha.run()
}
