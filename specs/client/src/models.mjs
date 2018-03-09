"use strict"

import DataNode from "/mjs/DataNode.mjs"
import { ERR_ILLEGAL_CONSTRUCTOR, ERR_INVALID_DATA } from "/mjs/error.mjs"
import EventTarget from "/mjs/EventTarget.mjs"
import Node from "/mjs/Node.mjs"

const { expect } = chai

describe("DataNode", () => {

    it("can't be invoked with the new keyword", () => {
        expect(() => new DataNode).to.throw(ERR_ILLEGAL_CONSTRUCTOR)
    })

    it("is created via DataNode.from(seed) (simple objects)", () => {
        const a = DataNode.from("foo")
        const b = DataNode.from(1)
        const c = DataNode.from(false)
        const d = DataNode.from(null)

        expect( () => DataNode.from(undefined) ).to.throw(TypeError, ERR_INVALID_DATA)
        expect( () => DataNode.from(NaN) ).to.throw(TypeError, ERR_INVALID_DATA)
        expect(a.nodeName).to.equal("")
        expect(a.nodeValue).to.equal("foo")
        expect(b.nodeName).to.equal("")
        expect(b.nodeValue).to.equal(1)
        expect(c.nodeName).to.equal("")
        expect(c.nodeValue).to.equal(false)
        expect(d.nodeName).to.equal("")
        expect(d.nodeValue).to.equal(null)
    })

    it("is created via DataNode.from(seed) ( iterables & objects )", () => {
        const a = DataNode.from([0, 1, 2, 3])
        const b = DataNode.from(new Set([0, 1, 2, 3]))
        const map = new Map
        map.set("a", 0)
        map.set("b", 1)
        map.set("c", 2)
        map.set("d", 3)
        const c = DataNode.from(map)
        const d = DataNode.from({ a: 0, b:1, c:2, d:3 })

        expect(a.nodeName).to.equal("")
        expect(a.nodeValue).to.equal(null)
        expect(a.childNodes.length).to.equal(4)
        expect(a.childNodes.map(child => child.nodeValue)).to.deep.equal([0, 1, 2, 3])

        expect(b.nodeName).to.equal("")
        expect(b.nodeValue).to.equal(null)
        expect(b.childNodes.length).to.equal(4)
        expect(b.childNodes.map(child => child.nodeValue)).to.deep.equal([0, 1, 2, 3])

        expect(c.nodeName).to.equal("")
        expect(c.nodeValue).to.equal(null)
        expect(c.childNodes.length).to.equal(4)
        expect(c.childNodes.map(child => ([child.nodeName, child.nodeValue]))).to.deep.equal([["a", 0], ["b", 1], ["c", 2], ["d", 3]])

        expect(d.nodeName).to.equal("")
        expect(d.nodeValue).to.equal(null)
        expect(d.childNodes.length).to.equal(4)
        expect(d.childNodes.map(child => ([child.nodeName, child.nodeValue]))).to.deep.equal([["a", 0], ["b", 1], ["c", 2], ["d", 3]])
    })

    it("is created via DataNode.from(seed) ( complex objects )", () => {
        const a = DataNode.from([{ foo: "bar" }])
        const b = a.childNodes[0]
        const c = b.childNodes[0]

        expect(a.nodeName).to.equal("")
        expect(a.nodeValue).to.equal(null)
        expect(a.childNodes.length).to.equal(1)
        expect(b.nodeName).to.equal("")
        expect(b.nodeValue).to.equal(null)
        expect(b.childNodes.length).to.equal(1)
        expect(c.nodeName).to.equal("foo")
        expect(c.nodeValue).to.equal("bar")

        const d = DataNode.from([{ foo: [ { bar: "foo", foo: "bar" } ] }])
        const e = d.childNodes[0]
        const f = e.childNodes[0]
        expect(f.nodeName).to.equal("foo")
        expect(f.nodeValue).to.equal(null)
        expect(f.childNodes.length).to.equal(1)
        const g = f.childNodes[0]
        expect(g.childNodes.length).to.equal(2)
        expect(g.childNodes[0].nodeName).to.equal("bar")
        expect(g.childNodes[0].nodeValue).to.equal("foo")
        expect(g.childNodes[1].nodeName).to.equal("foo")
        expect(g.childNodes[1].nodeValue).to.equal("bar")
    })
})
