"use strict"

import "@babel/polyfill"
import "proxy-polyfill"

import "./nodes"
import "./events"

export const run = () => {
    mocha.run()
}
