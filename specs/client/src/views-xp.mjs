"use strict"

import ZExpression from "/mjs/ZExpression2.mjs"
import ZParser from "/mjs/ZParser2.mjs"

const { expect } = chai

describe("ZParser2 (experimental)", () => {
    it ("test", () => {
        ZParser.parse("div > span")
    })
})

describe("View2 (experimental)", () => {

})
