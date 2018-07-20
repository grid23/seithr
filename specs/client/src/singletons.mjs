"use strict"

import Event from "/mjs/Event.mjs"
import EventTarget from "/mjs/EventTarget.mjs"
import singleton from "/mjs/singleton.mjs"
import View from "/mjs/View.mjs"

const { expect } = chai

describe("singletons", () => {
    it("allows a singleton class to be factorized", () => {
        const Foo = singleton(class extends View {})

        expect( new Foo === new Foo ).to.be.true
    })

    it("static properties are preserved", () => {
        const Bar = singleton(class Foo extends View {
            static fubar(){}
        })

        expect(!!Bar.fubar).to.be.true
    })

    it("sample", done => {
        const SET = singleton(class extends EventTarget {
            static addEventListener(...args){
                return new SET().addEventListener(...args)
            }

            static removeEventListener(...args){
                return new SET().removeEventListener(...args)
            }

            static dispatchEvent(...args){
                return new SET().dispatchEvent(...args)
            }
        })

        let i = 0
        const set = new SET
        const set2 = new SET
        const onfoo = () => {
            i += 1
            expect(i == 1).to.be.true

            setTimeout(() => done(), 4)
        }

        expect(set2 === set).to.be.true
        SET.addEventListener("foo", onfoo)
        SET.removeEventListener("foo", onfoo)
        SET.addEventListener("foo", onfoo)
        SET.dispatchEvent(new Event("foo"))
    })
})
