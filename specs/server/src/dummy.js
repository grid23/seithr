"use strict"

require = require("@std/esm")(module,{"esm":"js"});
const chai = require("chai")

const {default:dummy} = require("../../../lib/dummy.mjs")
const { expect } = chai

describe("dummy objects", () => {
    it ("should offer an object implementing DOMElement properties", () => {
        const a = dummy()

        expect(a.addEventListener).to.exist
        expect(a.removeEventListener).to.exist
        expect(a.addEventListener).to.exist
        expect(a.appendChild).to.exist
    })

    it ("should be able to add/remove event listeners", done => {
        const b = dummy()
        const onfoo = () => {
            b.removeEventListener("foo", onfoo)
            done()
        }
        b.addEventListener("foo", onfoo)
        b.dispatchEvent("foo")
    })

    it("should be manipulable like a DOMNode node", () => {
        const a = dummy()
        const b = a.appendChild(dummy())

        expect(a.hasChildNodes()).to.be.true
        expect(a.childNodes[0] === b).to.be.true
    })
})
