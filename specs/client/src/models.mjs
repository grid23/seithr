"use strict"

import DataNode from "/mjs/DataNode.mjs"
import { ERR_ILLEGAL_CONSTRUCTOR, ERR_INVALID_DATA, ERR_NOT_A_LEAF, ERR_READ_ONLY } from "/mjs/error.mjs"
import EventTarget from "/mjs/EventTarget.mjs"
import Node from "/mjs/Node.mjs"

const { expect } = chai

describe("DataNode", () => {

    it("can't be invoked with the new keyword", () => {
        expect(() => new DataNode).to.throw(ERR_ILLEGAL_CONSTRUCTOR)
    })

    it("is created via DataNode.from(seed) (simple objects)", () => {
        const a = DataNode.from({ foo: "bar" })

        expect(a instanceof EventTarget).to.be.true
        expect(a instanceof Node).to.be.true
        expect(a instanceof DataNode).to.be.true
        expect(a.nodeType === DataNode.LEAF_NODE).to.be.true
        expect(a.nodeName === "foo").to.be.true
        expect(a.nodeValue === "bar").to.be.true
        expect(a.nodeValue === "bar").to.be.true
        expect(a.childNodes.length === 0).to.be.true

        //undefined gets transformed as null
        //as JSON.stringify([undefined])
        const b = DataNode.from(["foo", "bar", undefined])
        expect(b.nodeType === DataNode.FOREST_NODE).to.be.true
        expect(b.nodeName === "").to.be.true
        expect(b.nodeValue).to.deep.equal(["foo", "bar", null])
        expect(b.toJSON()).to.deep.equal(["foo", "bar", null])
        expect(b.childNodes.length === 3).to.be.true

        const c = DataNode.from(null)
        expect(c.nodeType === DataNode.LEAF_NODE).to.be.true
        expect(c.nodeName === "").to.be.true
        expect(c.nodeValue).to.equal(null)
        expect(c.toJSON()).to.equal(null)
        expect(a.childNodes.length === 0).to.be.true

        const d = DataNode.from("foo")
        expect(d.nodeType === DataNode.LEAF_NODE).to.be.true
        expect(d.nodeName === "").to.be.true
        expect(d.nodeValue).to.be.eql("foo")
        expect(d.toJSON()).to.be.eql("foo")
        expect(a.childNodes.length === 0).to.be.true

        expect(() => DataNode.from(undefined)).to.throw(ERR_INVALID_DATA)
        expect(() => DataNode.from(function(){})).to.throw(ERR_INVALID_DATA)
    })

    it("is created via DataNode.from(seed) (mixed objects)", () => {
        const a = DataNode.from({ foo: [ undefined, null, 0, "foo", [0, 1], { foo: "bar" } ] })
        const rv_a = { foo: [ null, null, 0, "foo", [0, 1], { foo: "bar" } ] }
        expect(a.toJSON()).to.deep.equal(rv_a)
        expect(a.nodeValue).to.deep.equal(rv_a.foo)

        const b = DataNode.from({ foo: { bar: { fu: [{ foo: "bar" }, undefined, undefined, 0, 1] , biz: undefined } } })
        const rv_b = { foo: { bar: { fu: [{ foo: "bar" }, null, null, 0, 1] } } }
        expect(b.toJSON()).to.deep.equal(rv_b)
        expect(b.nodeValue).to.deep.equal(rv_b.foo)
    })

    it("allows nodeValue & nodeName props to be set, only if it doesn't break the tree structure (simple objects)", () => {
        const a = DataNode.from("foo", { readonly: true })
        expect(() => a.nodeValue = "bar").to.throw(ERR_READ_ONLY)

        const b = DataNode.from("foo")
        b.nodeValue = "bar"
        expect(b.nodeValue === "bar").to.be.true

        const c = DataNode.from({ foo: "bar" })
        c.nodeValue = { bar: "foo" }
        expect(c.nodeValue === "foo").to.be.true
        expect(c.nodeName === "bar").to.be.true

        const d = DataNode.from([ 0, 1, 2 ])
        expect(() => d.nodeValue = { foo:"bar" }).to.throw(ERR_NOT_A_LEAF)

        const e = DataNode.from({foo: "bar"})
        e.nodeValue = [ 0, 1, 2 ]
        expect(e.childNodes.length === 3).to.be.true
        expect(e.nodeType === DataNode.FOREST_NODE).to.be.true
        expect(e.nodeValue).to.deep.equal([ 0, 1, 2 ])
        expect(e.toJSON()).to.deep.equal({ foo: [ 0, 1, 2 ] })

    })
})
