"use strict"

import singleton from "/mjs/singleton.mjs"
import View from "/mjs/View.mjs"

const { expect } = chai

describe("singletons", () => {
    it("allows a singleton class to be factorized", () => {
        const Foo = singleton(class Foo extends View {})

        expect( new Foo === new Foo ).to.be.true
    })

    it("static properties are preserved", () => {
        const Bar = singleton(class Foo extends View {
            static fubar(){}
        })

        expect(!!Bar.fubar).to.be.true
    })
})
