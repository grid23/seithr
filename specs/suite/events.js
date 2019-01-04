"use strict"

import { Event, EventTarget, Node } from "seithr"
const { expect } = chai

describe("event emitting", () => {
    it("events can be dispatched on a compatible object", done => {
        const et = new EventTarget
        const returned = [0, 0]

        et.addEventListener("foo", e => returned[0] = 1)
        et.addEventListener("foo", e => {
            returned[1] = 1

            expect(returned[0] === 1).to.be.true
            expect(returned[1] === 1).to.be.true
            done()
        })

        et.dispatchEvent(new Event("foo"))
    })

    it("event handlers can be added and removed with DOMEvent syntax", done => {
        /*
            capture phase has no influence here
        */
        const et = new EventTarget
        const returned = [0, 0, 0]

        const a = e => {
            expect(e.eventPhase === Event.AT_TARGET).to.be.true
            returned[0] = 1
            expect(returned[0] === 1).to.be.true
            expect(returned[1] === 0).to.be.true
            expect(returned[2] === 0).to.be.true
        }
        const b = e => {
            expect(e.eventPhase === Event.AT_TARGET).to.be.true
            returned[1] = 1
            et.removeEventListener("foo", a)
            et.removeEventListener("foo", b, true)
            expect(returned[0] === 1).to.be.true
            expect(returned[1] === 1).to.be.true
            expect(returned[2] === 0).to.be.true
        }
        const c = e => {
            expect(e.eventPhase === Event.AT_TARGET).to.be.true
            if ( returned[2] === 1) {
                expect(returned[0] === 1).to.be.true
                expect(returned[1] === 1).to.be.true
                expect(returned[2] === 1).to.be.true
                done()
            }
            else
              returned[2] = 1
        }

        et.addEventListener("foo", a)
        et.addEventListener("foo", b, true)
        et.addEventListener("foo", c)

        et.dispatchEvent(new Event("foo"))
        et.dispatchEvent(new Event("foo"))
    })

    it("events can have a capture and bubble phase", done => {
        const et = new Node
        const ft = et.appendChild(new Node)
        const returned = [0, 0, 0]

        const a = e => {
            expect(e.eventPhase === Event.BUBBLING_PHASE).to.be.true
            returned[0] = 1
            expect(returned[0] === 1).to.be.true
            expect(returned[1] === 1).to.be.true
            expect(returned[2] === 1).to.be.true
            done()
        }
        const b = e => {
            expect(e.eventPhase === Event.CAPTURING_PHASE).to.be.true
            returned[1] = 1
            expect(returned[0] === 0).to.be.true
            expect(returned[1] === 1).to.be.true
            expect(returned[2] === 0).to.be.true
        }
        const c = e => {
            expect(e.eventPhase === Event.AT_TARGET).to.be.true
            returned[2] = 1
            expect(returned[0] === 0).to.be.true
            expect(returned[1] === 1).to.be.true
            expect(returned[2] === 1).to.be.true
        }

        et.addEventListener("foo", a)
        et.addEventListener("foo", b, true)
        ft.addEventListener("foo", c)

        ft.dispatchEvent(new Event("foo"))
    })

    it("events can be cancelable with Event.{stop, stopImmediate} methods", () => {
        const et = new Node
        const ft = et.appendChild(new Node)
        const gt = ft.appendChild(new Node)

        let cancelled = false
        et.addEventListener("foo", e => cancelled = false)
        ft.addEventListener("foo", e => cancelled = false)
        gt.addEventListener("foo", e => {
            cancelled = true
            e.stopImmediate()
        })
        gt.addEventListener("foo", e => cancelled = false)
        gt.dispatchEvent(new Event("foo"))

        expect(cancelled).to.be.true

        cancelled = false
        et.addEventListener("bar", e => cancelled = false)
        ft.addEventListener("bar", e => cancelled = false)
        gt.addEventListener("bar", e => e.stop())
        gt.addEventListener("bar", e => cancelled = true)
        gt.dispatchEvent(new Event("foo"))

        expect(cancelled).to.be.true
    })

    it("Event.{bubbles, cancelable} are true by default", () => {
        const event = new Event("foo")
        expect(event.bubbles).to.be.true
        expect(event.cancelable).to.be.true
    })

    it("has a detail property, with a null default, detail is sealed", () => {
        const a = new Event("foo")
        const b = new Event("foo", { detail: "foo" })
        const c = new Event("foo", { detail: ["a", "b", "c"] })
        try { c.detail.push("d") } catch(e){}
        expect(a.detail).to.be.null
        expect(b.detail).to.eql("foo")
        expect(c.detail.length).to.eql(3)
    })

    it("set bubbles, cancelable, detail properties", () => {
        const event = new Event("foo", { bubbles:false, cancelable:false, detail:"foo" })
        expect(event.bubbles).to.be.false
        expect(event.cancelable).to.be.false
        expect(event.detail === "foo").to.be.true
    })

    it("events can have an additional phase as BROADCAST_PHASE and have related methods EventTarget.{addBroadcastListener, removeBroadcastListener, broadcastEvent}", done => {
        const et = new EventTarget
        const ft = new EventTarget
        const returned = [0, 0]
        et.addBroadcastListener("foo", e => {
            returned[1] =1
            expect(e.eventPhase === Event.BROADCAST_PHASE).to.be.true
            expect(returned[0] === 1).to.be.true
            expect(returned[1] === 1).to.be.true
            done()
        })
        ft.addEventListener("foo", e => returned[0] = 1)
        ft.broadcastEvent(new Event("foo"))
    })

    it("broadcasting can be cancelled by Event.preventDefault() ( event initiliazed with cancelable:false cannot be defaultPrevented)", () => {
        const et = new EventTarget
        const ft = new EventTarget

        let cancelled = false
        et.addBroadcastListener("foo", e => cancelled = false)
        ft.addEventListener("foo", e => {
            cancelled = true
            e.preventDefault()
            expect(e.defaultPrevented).to.be.true
        })
        ft.dispatchEvent(new Event("foo"))

        expect(cancelled).to.be.true

        let notcancelled = false
        et.addBroadcastListener("bar", e => {
            notcancelled = false
        })
        ft.addEventListener("bar", e => {
            notcancelled = true
            e.preventDefault()
            expect(e.defaultPrevented).to.be.false
        })
        ft.dispatchEvent(new Event("bar", { cancelable: false }))
        expect(notcancelled).to.be.true
    })

    it("events can be generated from DOM events ( Event.from(DOMEvent) )", done => {
        throw new Error("TODO")
    })

    it("can be generated from other events ( Event.from(seithr.Event) )", done => {
        throw new Error("TODO")
    })
})
