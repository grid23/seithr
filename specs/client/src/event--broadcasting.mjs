"use strict"

import Event from "/mjs/Event.mjs"
import EventTarget from "/mjs/EventTarget.mjs"

const { expect } = chai
describe("event broadcasting", () => {
    describe("events", () => {
        it("can be added/removed to a global events bus with EventTarget::{addBroadcastListener, removeBroadcastListener}; broadcast with EventTarget::broadcastEvent", done => {
            const et = new EventTarget
            const onfoo = e => {
                et.removeBroadcastListener("foo", onfoo)
                expect(e.eventPhase === EventTarget.BROADCAST_PHASE)
                done()
            }
            et.addBroadcastListener("foo", onfoo)
            et.broadcastEvent(new Event("foo"))
        })

        it("fire in phase order: capture, at_target, bubble, broadcast", () => {
            const a = new EventTarget
            const b = a.appendChild(new EventTarget)
            const c = b.appendChild(new EventTarget)
            const d = new EventTarget
            const returned = []

            const oncapture = e => {
                a.removeEventListener("foo", oncapture, true)
                returned.push("capture")
            }

            const ontarget = e => {
                c.removeEventListener("foo", ontarget)
                returned.push("target")
            }

            const onbubble = e => {
                b.removeEventListener("foo", onbubble)
                returned.push("bubble")
            }

            const onbroadcast = e => {
                d.removeBroadcastListener("foo", onbroadcast)
                returned.push("broadcast")
            }


            d.addBroadcastListener("foo", onbroadcast)
            c.addEventListener("foo", ontarget)
            b.addEventListener("foo", onbubble)
            a.addEventListener("foo", oncapture, true)
            c.broadcastEvent(new Event("foo"))

            expect(returned).to.be.eql(["capture", "target", "bubble", "broadcast"])
        })
    })
})
