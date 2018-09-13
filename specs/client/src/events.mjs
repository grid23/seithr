"use strict"

import Event from "/mjs/Event.mjs"
import EventTarget from "/mjs/EventTarget.mjs"
import singleton from "/mjs/singleton.mjs"

const { expect } = chai
describe("class Event", () => {
    // it("inherits from window.Event", () => {
    //     const event = new Event("foo")
    //     expect(event instanceof window.Event).to.be.true
    //     expect(event instanceof Event).to.be.true
    // })

    it("has a default true values for bubbles & cancelable properties", () => {
        const event = new Event("foo")
        expect(event.bubbles).to.be.true
        expect(event.cancelable).to.be.true
        //expect(event.composed).to.be.false
    })

    it("use the window.Event arguments to set bubbles, cancelable, composed, detail properties", () => {
        const event = new Event("foo", { bubbles:false, cancelable:false, composed:true })
        expect(event.bubbles).to.be.false
        expect(event.cancelable).to.be.false
        //expect(event.composed).to.be.true
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

    it("has an additional phase ( BROADCAST_PHASE )", () => {
        expect(Event.BROADCAST_PHASE).to.eql(window.Event.BUBBLING_PHASE + 1)
    })

    it("can be generated from DOM events ( Event.from(event) )", done => {
        const node = document.createElement("div")
        const onclick = e => {
            node.removeEventListener("click", onclick)
            const event = Event.from(e)

            expect(event.bubbles).to.be.true
            expect(event.cancelable).to.be.true
            expect(event instanceof Event).to.be.true
            //expect(event instanceof window.Event).to.be.true
            done()
        }
        node.addEventListener("click", onclick)
        node.click()
    })

    it("can be generated from other events ( Event.from(event) )", done => {
        const et = new EventTarget
        const onfoo = e => {
            et.removeEventListener("foo", onfoo)

            const event = Event.from(e)
            expect(event.bubbles).to.be.true
            expect(event.cancelable).to.be.true
            expect(event instanceof Event).to.be.true
            //expect(event instanceof window.Event).to.be.true
            done()
        }
        et.addEventListener("foo", onfoo)
        et.dispatchEvent(new Event("foo"))
    })

    describe("practical test 1", () => {
        const ET = singleton(class extends EventTarget {
            static addEventListener(...args){ return new ET().addEventListener(...args) }
            static removeEventListener(...args){ return new ET().removeEventListener(...args) }
            static dispatchEvent(...args){ return new ET().dispatchEvent(...args) }
        })

        let i = 0
        class X extends Event {
            constructor(dict) {
                i+=1
                console.log(dict, i)

                super(dict.type)
            }
        }

        it ("event should only be intialized once", done => {
            ET.addEventListener("test", e => {
                setTimeout(() => {
                    expect(i === 1).to.be.true
                    done()
                }, 200)
            })
            ET.dispatchEvent(new X({ type: "test" }))
        })
    })
})
