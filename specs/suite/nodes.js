"use strict"

import { EventTarget, Node } from "seithr"
const { expect } = chai

describe("class Node", () => {
    it ("is invoked with the new keyword", () => {
        const node = new Node()

        expect(node instanceof Node).to.be.true
        expect(node instanceof EventTarget).to.be.true
        expect(node.nodeType === Node.OBJECT_NODE).to.be.true
        expect(node.nodeName === "").to.be.true
        expect(node.nodeValue).to.be.null
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

    describe("leastCommonAncestor", () => {
        it("takes an iterable list of nodes and find the nearest (least in the tree) ancestor to all nodes", () => {
              const a = new Node
              const b = a.appendChild(new Node)
              const c = a.appendChild(new Node)
              const d = c.appendChild(new Node)
              const e = new Node

              expect(Node.lca([b,c,d]) === a).to.be.true
              expect(Node.lca([a, b,c,d]) === a).to.be.true
              expect(Node.lca([a, a]) === a).to.be.true
              expect(Node.lca([a, e]) === null).to.be.true

        })
    })
})
