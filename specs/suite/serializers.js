"use strict"

import { Serializer } from "seithr"
const { expect } = chai

describe("Serializer", () => {
    new Serializer

    it("serialize objects", () => {
        const o = {}
        const p = { foo: "試し" }
        const q = { foo: "試し", bar: "visualização" }

        expect(Serializer.serialize(o) === "").to.be.true
        expect(Serializer.serialize(p) === "foo=%E8%A9%A6%E3%81%97").to.be.true
        expect(Serializer.serialize(q) === "foo=%E8%A9%A6%E3%81%97&bar=visualiza%C3%A7%C3%A3o").to.be.true
    })

    it("stringify objects", () => {
        const o = {}
        const p = { foo: "試し" }
        const q = { foo: "試し", bar: "visualização" }

        expect(Serializer.stringify(o) === "").to.be.true
        expect(Serializer.stringify(p) === "foo=試し").to.be.true
        expect(Serializer.stringify(q) === "foo=試し&bar=visualização").to.be.true
    })

    it("objectify serialized string", () => {
        const o = {}
        const p = { foo: "試し" }
        const q = { foo: "試し", bar: "visualização" }

        expect( !!Object.keys(Serializer.objectify(Serializer.serialize(o))).length ).to.be.false
        expect( Serializer.objectify(Serializer.stringify(p)).foo === "試し" ).to.be.true
        expect( Serializer.objectify(Serializer.serialize(q)).foo === "試し" ).to.be.true
        expect( Serializer.objectify(Serializer.serialize(q)).bar === "visualização" ).to.be.true
    })
})
