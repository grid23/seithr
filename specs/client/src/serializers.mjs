"use strict"

import Serializer from "/mjs/Serializer.mjs"
import Node from "/mjs/Node.mjs"

const { expect } = chai
describe("class Serializer", () => {

    it("Serializer.serialize(object)", () => {
        const o = { foo: "bar" }
        const p = { foo: "bar", bar: "foo" }
        const q = {}

        expect(Serializer.serialize(o)).to.equal("foo=bar")
        expect(Serializer.serialize(p)).to.equal("foo=bar&bar=foo")
        expect(Serializer.serialize(q)).to.equal("")
    })

    it("Serializer.objectify(string)", () => {
        const s = "foo=bar"
        const t = "foo=bar&bar=foo"
        const u = ""

        expect(Serializer.objectify(s)).to.deep.equal({ foo: "bar" })
        expect(Serializer.objectify(t)).to.deep.equal({ foo: "bar", bar: "foo" })
        expect(Serializer.objectify(u)).to.deep.equal({  })
    })

    it("new Serializer().serialize(object)", () => {
        const o = { foo: "bar" }
        const p = { foo: "bar", bar: "foo" }
        const q = {}

        expect(new Serializer().serialize(o)).to.equal("foo=bar")
        expect(new Serializer().serialize(p)).to.equal("foo=bar&bar=foo")
        expect(new Serializer().serialize(q)).to.equal("")
    })

    it("new Serializer().objectify(string)", () => {
        const s = "foo=bar"
        const t = "foo=bar&bar=foo"
        const u = ""

        expect(new Serializer().objectify(s)).to.deep.equal({ foo: "bar" })
        expect(new Serializer().objectify(t)).to.deep.equal({ foo: "bar", bar: "foo" })
        expect(new Serializer().objectify(u)).to.deep.equal({  })
    })

})
