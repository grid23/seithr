"use strict"

import trait from "/mjs/trait.mjs"
import View from "/mjs/View.mjs"

const { expect } = chai

describe("traits", () => {
    const stest = Symbol("test")
    const stest2 = Symbol("test2")

    class A {
        foo(){}
        [stest](){}
    }

    class B extends A {
        fu(){}
    }

    class C {
        bar(){}
        [stest2](){}
    }

    it ("allows multiple inheritance like mix-ins", () => {
        class Z extends trait(A, B) {}
        class Y extends trait(B, C) {}

        const z = new Z
        const y = new Y
        expect(!!z.foo).to.be.true
        expect(!!z[stest]).to.be.true

        expect(!!y.foo).to.be.true
        expect(!!y.bar).to.be.true
        expect(!!y[stest]).to.be.true
        expect(!!y[stest2]).to.be.true
    })

    it ("the utmost right class is the super (the only one that can apply its constructor payload and compatibles with instanceof)", () => {
        class W extends trait(B, View) {}
        const w = new W
        expect(w instanceof W).to.be.true
        expect(w instanceof View).to.be.true
    })
})
