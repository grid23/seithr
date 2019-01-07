"use strict"

import "@babel/polyfill"
import "proxy-polyfill"

import "./nodes"
import "./events"
import "./models"
import "./cookies"
import "./routing"
import "./utils"
import "./css"
import "./animationFrames"

export const run = () => {
    mocha.run()
}
