"use strict"

import Cookie from "/mjs/Cookie.mjs"
import Sync from "/mjs/Cookie.mjs"

const { expect } = chai
describe("Cookie (legacy tests from  ippankiban)", () => {

    it ("new Cookie(name)", done => {
        const c = new Cookie({ name: "_foo" })
        const v = Math.random()

        c.addEventListener(Sync.TYPE, e => {
            expect(!!unescape(document.cookie).match(`_foo={"foo":${v}}`)).to.be.true
            done()
        })
        window.addEventListener("beforeunload", e=>c.clear())
        c.set("foo", v)

    })

    it("new Cookie({...})", done => {
        const c = new Cookie({ name: "_bar", session: true })
        const v = Math.random()

        c.addEventListener(Sync.TYPE, e => {
            expect(!!unescape(document.cookie).match(`_bar={"foo":${v}}`)).to.be.true
            done()
        })
        window.addEventListener("beforeunload", e=>c.clear())
        c.set("foo", v)
    })
})
