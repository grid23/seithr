"use strict"

import Node from "/mjs/Node.mjs"

const { expect } = chai
describe("class Node", () => {
    it ("is invoked with the new keyword", () => {
        const node = new Node()

        expect(node instanceof Node).to.be.true
        expect(node.nodeType === Node.OBJECT_NODE).to.be.true
        expect(node.nodeName === "").to.be.true
        expect(node.nodeValue).to.be.null
        expect(node.readonly).to.be.false
    })

    it ("can be invoked with specifics type, name, value and readonly", () => {
        const node = new Node({ type:"MODEL_DATA_NODE", name:"foo", value:"bar", readonly:true })

        const B = class B extends Node {
            static get FOO_NODE(){ return 15 }
            constructor(){ super({ type: "FOO_NODE" }) }
        }
        const b = new B()

        expect(node.nodeType === Node.MODEL_DATA_NODE).to.be.true
        expect(b.nodeType === B.FOO_NODE).to.be.true
        expect(node.nodeName === "foo").to.be.true
        expect(node.nodeValue === "bar").to.be.true
        expect(node.readonly).to.be.true
    })



    it("methods {appendChild,insertBefore,removeChild} returns the node being manipulated", () => {
        const a = new Node()
        const b = new Node()
        const c = new Node()

        expect( a.appendChild(b) ).to.be.eql(b)
        expect( a.insertBefore(c, b) ).to.be.eql(c)
        expect( a.removeChild(b) ).to.be.eql(b)
    })

    it("method replaceChild returns the node being replaced", () => {
        const a = new Node()
        const b = a.appendChild(new Node())
        const c = new Node()

        expect( a.replaceChild(c, b) ).to.be.eql(b)
    })
})
