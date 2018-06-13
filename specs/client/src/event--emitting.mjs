"use strict"

import Event from "/mjs/Event.mjs"
import Node from "/mjs/Node.mjs"

const { expect } = chai
describe("event emitting", () => {
    describe("events", () => {
        it("can be dispatched on a Node object (bubbling, 1 node)", done => {
            const et = new Node
            const returned = []

            const onfoob = e => {
                et.removeEventListener("foo", onfoob)
                returned.push("bubble")


                expect(e.eventPhase === Event.AT_TARGET).to.be.true
                expect(e.currentTarget == et).to.be.true
                expect(e.target === et).to.be.true
            }

            const onfooc = e => {
                et.removeEventListener("foo", onfooc, true)
                returned.push("capture")

                expect(e.eventPhase === Event.AT_TARGET).to.be.true
                expect(e.currentTarget == et).to.be.true
                expect(e.target === et).to.be.true
                done()
            }

            et.addEventListener("foo", onfoob)
            et.addEventListener("foo", onfooc, true)
            et.dispatchEvent(new Event("foo"))

            // in order of addEventListener invocations
            expect(returned[0]).to.eql("bubble")
            expect(returned[1]).to.eql("capture")
        })

        it("can be dispatched on a Node object (without bubbling)", () => {
            const a = new Node
            const b = a.appendChild(new Node)
            let bubble = false
            let hit = false

            const onfoob = e => {
                a.removeEventListener("foo", onfoob)
                bubble = true
            }
            a.addEventListener("foo", onfoob)

            const onfoo = e => {
                b.removeEventListener("foo", onfoo)
                chai.expect(e.eventPhase === window.Event.AT_TARGET)
                hit = true
            }
            b.addEventListener("foo", onfoo)

            const event = new Event("foo", { bubbles: false })
            b.dispatchEvent(event)

            expect(bubble).to.be.false
            expect(hit).to.be.true
        })

        it("can be dispatched on a Node object (bubbling, 2 nodes)", () => {
            const a = new Node
            const b = a.appendChild(new Node)
            const returned = []

            const onfoob = e => {
                a.removeEventListener("foo", onfoob)
                returned.push("bubble")
                expect(e.target === b).to.be.true
                expect(e.currentTarget === a).to.be.true
                expect(e.eventPhase === window.Event.BUBBLING_PHASE).to.be.true
            }
            a.addEventListener("foo", onfoob)

            const onfooc = e => {
                a.removeEventListener("foo", onfooc, true)
                returned.push("capture")
                expect(e.target === b).to.be.true
                expect(e.currentTarget === a).to.be.true
                expect(e.eventPhase === window.Event.CAPTURING_PHASE).to.be.true
            }
            a.addEventListener("foo", onfooc, true)

            const onfooat = e => {
                b.removeEventListener("foo", onfooat)
                expect(e.target === b).to.be.true
                expect(e.currentTarget === b).to.be.true
                expect(e.eventPhase === window.Event.AT_TARGET).to.be.true
            }
            b.addEventListener("foo", onfooat)

            const event = new Event("foo")
            b.dispatchEvent(event)

            // in order of phases (capture then bubble)
            expect(returned[0]).to.eql("capture")
            expect(returned[1]).to.eql("bubble")
        })

        it("can be dispatched on a dom node (bubbling, 2 nodes)", () => {
            const a = document.createElement("div")
            const b = a.appendChild(document.createElement("div"))
            const returned = []

            const onfoob = e => {
                a.removeEventListener("foo", onfoob)
                returned.push("bubble")
                expect(e.target === b).to.be.true
                expect(e.currentTarget === a).to.be.true
                expect(e.eventPhase === window.Event.BUBBLING_PHASE).to.be.true
            }
            a.addEventListener("foo", onfoob)

            const onfooc = e => {
                a.removeEventListener("foo", onfooc, true)
                returned.push("capture")
                expect(e.target === b).to.be.true
                expect(e.currentTarget === a).to.be.true
                expect(e.eventPhase === window.Event.CAPTURING_PHASE).to.be.true
            }
            a.addEventListener("foo", onfooc, true)

            const onfooat = e => {
                b.removeEventListener("foo", onfooat)
                expect(e.target === b).to.be.true
                expect(e.currentTarget === b).to.be.true
                expect(e.eventPhase === window.Event.AT_TARGET).to.be.true
            }
            b.addEventListener("foo", onfooat)

            const event = new Event("foo")
            b.dispatchEvent(event.originalEvent)

            // in order of phases (capture then bubble)
            expect(returned[0]).to.eql("capture")
            expect(returned[1]).to.eql("bubble")
        })

        it("can be dispatched on a dom node (bubbling, 1 node)", () => {
            const a = document.createElement("div")
            const returned = []

            const onfoob = e => {
                a.removeEventListener("foo", onfoob)
                returned.push("bubble")
                expect(e.eventPhase === window.Event.AT_TARGET)
                expect(e.target === a).to.be.true
            }
            a.addEventListener("foo", onfoob)

            const onfooc = e => {
                a.removeEventListener("foo", onfooc, true)
                returned.push("capture")
                expect(e.eventPhase === window.Event.AT_TARGET).to.be.true
                expect(e.target === a).to.be.true
                expect(e.currentTarget === a).to.be.true
            }
            a.addEventListener("foo", onfooc, true)

            const event = new Event("foo")
            a.dispatchEvent(event.originalEvent)

            // in order of addEventListener invocations
            expect(returned[0]).to.eql("bubble")
            expect(returned[1]).to.eql("capture")
        })

        it("can be dispatched on a dom node (without bubbling)", () => {
            const a = document.createElement("div")
            const b = a.appendChild(document.createElement("div"))
            let bubble = false
            let hit = false

            const onfoob = e => {
                a.removeEventListener("foo", onfoob)
                bubble = true
            }
            a.addEventListener("foo", onfoob)

            const onfoo = e => {
                b.removeEventListener("foo", onfoo)
                chai.expect(e.eventPhase === window.Event.AT_TARGET)
                hit = true
            }
            b.addEventListener("foo", onfoo)

            const event = new Event("foo", { bubbles: false })
            b.dispatchEvent(event.originalEvent)

            expect(bubble).to.be.false
            expect(hit).to.be.true
        })

        it("can be originating from a user action on a dom nodes, then forwarded to a Node object", done => {
            const node = document.createElement("a")
            const et = new Node

            const onforwardedclick = e => {
                et.removeEventListener("click", onforwardedclick)
                expect(e.originalTarget === node).to.be.true
                expect(e.target === et).to.be.true
                expect(e.currentTarget === et).to.be.true
                done()
            }

            const onclick = e => {
                node.removeEventListener("click", onclick)
                et.dispatchEvent(e)
            }
            node.addEventListener("click", onclick)
            et.addEventListener("click", onforwardedclick)
            node.click()
        })
    })
})
