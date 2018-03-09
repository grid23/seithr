"use strict"

require = require("@std/esm")(module,{"esm":"js"});
const chai = require("chai")

const {default:Node} = require("../../../lib/Node.mjs")
const { expect } = chai

describe("class Node", () => {
    it("should work on server side", () => {
        const a = new Node
        const b = a.appendChild(new Node)

        expect(a instanceof Node).to.be.true
        expect(b instanceof Node).to.be.true
    })
})
