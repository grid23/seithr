"use strict"

import domready from "/mjs/domready.mjs"

const { expect } = chai

describe("domready", () => {
    it ("it returns a promise, resolved with an object linking to some html nodes", (done) => {
        domready().then(({ nodes: { documentElement, head, title, viewport, body } }) => {
            expect( documentElement ).to.be.eql( document.documentElement )
            expect( head ).to.be.eql( document.head )
            expect( title ).to.be.eql( document.head.querySelector("title") )
            expect( viewport ).to.be.eql( document.head.querySelector("meta[name=viewport]") )
            done()
        })
    })

    it("is compatible with await/async", async () => {
        const { nodes: { documentElement, head, title, viewport, body } } = await domready()
        expect( documentElement ).to.be.eql( document.documentElement )
        expect( head ).to.be.eql( document.head )
        expect( title ).to.be.eql( document.head.querySelector("title") )
        expect( viewport ).to.be.eql( document.head.querySelector("meta[name=viewport]") )
    })
})
