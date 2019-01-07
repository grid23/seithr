"use strict"

import { Cookie, Model } from "seithr"

const { expect } = chai
describe("Cookie (legacy tests from  ippankiban)", () => {

    it ("new Cookie(name)", done => {
        const c = new Cookie({ name: "_foo" })
        const v = Math.random()

        console.log("x", Cookie.events.sync)
        c.addEventListener(Cookie.events.sync, e => {
            console.log("xxxx")
            expect(!!unescape(document.cookie).match(`_foo={"foo":${v}}`)).to.be.true
            done()
        })
        window.addEventListener("beforeunload", e=>c.clear())

        c.io = { foo: v }
    })

    it("new Cookie({...})", done => {
        const c = new Cookie({ name: "_bar", session: true })
        const v = Math.random()

        c.addEventListener(Cookie.events.sync, e => {
            console.log("xxxx2")
            expect(!!unescape(document.cookie).match(`_bar={"foo":${v}}`)).to.be.true
            done()
        })
        window.addEventListener("beforeunload", e=>c.clear())
        c.io = { foo: v }
    })
})
