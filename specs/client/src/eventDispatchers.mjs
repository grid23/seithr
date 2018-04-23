"use strict"

import EventDispatcher from "/mjs/EventDispatcher.mjs"

const { expect } = chai
describe("class EventDispatcher", () => {
    it("is invoked with the new keyword", () => {
        const ed = new EventDispatcher

        expect(ed instanceof EventDispatcher).to.be.true
    })
})
