"use strict"

import EventTarget from "/mjs/EventTarget.mjs"
import Node from "/mjs/Node.mjs"

const { expect } = chai
describe("class EventTarget", () => {
    it("is invoked with the new keyword", () => {
        const et = new EventTarget()
        expect(et instanceof EventTarget).to.be.true
    })
})
