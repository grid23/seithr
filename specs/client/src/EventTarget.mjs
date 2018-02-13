"use strict"

import EventTarget from "/mjs/EventTarget.mjs"
import Node from "/mjs/Node.mjs"

const { expect } = chai
describe("class EventTarget", () => {
    it("inherits from Node", () => {
        const et = new EventTarget()

        expect(et instanceof EventTarget).to.be.true
        expect(et instanceof Node).to.be.true
    })
})
