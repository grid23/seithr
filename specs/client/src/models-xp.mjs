"use strict"
import Model from "/mjs/Model2.mjs"

const { expect } = chai

describe("class Model2 (experimental)", () => {
    it("models can contain any kind of data", () => {
        const m = new Model()
        const n = new Model()
        const o = new Model()
        const p = new Model()
        const q = new Model()

        m.io = { foo: "bar", fu: [0,1,2] }
        n.io = "foo"
        o.io = ["a", "b", "c"]
        p.io = function(){ return true }
        q.io = null

        expect(m.io.foo === "bar").to.be.true
        expect(Array.isArray(m.io.fu)).to.be.true
        expect(typeof n.io === "string").to.be.true
        expect(Array.isArray(o.io)).to.be.true
        expect(p.io()).to.be.true
        expect(q.io === null).to.be.true
    })

    it("only one object proxy can exist at a time", done => {
        const m = new Model()
        m.io = { foo: "bar", fu: { bar: "foo" } }
        const x = m.io
        const y = m.io.foo
        const z = m.io.fu
        setTimeout(() => {
            expect(() => x.foo).to.throw()
            expect(() => y.foo).to.not.throw() // end-value are not proxied
            expect(() => z.bar).to.not.throw()
            done()
        }, 4)
    })

    it("model have a global hidden name and can have a set global name", () => {
        const m = new Model("foo")
        m.io = { foo: "bar" }
        chai.expect(Model.io.foo.foo === "bar").to.be.true
        chai.expect(Model.io[m.valueOf()].foo === "bar").to.be.true
        chai.expect(Model.io["" + m].foo === "bar").to.be.true
    })


    it("event modelchange is fired when a value is set", done => {
        const m = new Model
        let i = 0
        m.addEventListener(Model.CHANGE, ({target:m}) => {
            i += 1
            if ( i ===1 )
              expect(m.io.foo === "bar").to.be.true

            if ( i === 2 )
              expect(m.io.fu.fu === "bar").to.be.true,
              done()

            if ( i > 2 )
              throw new Error("too many events")
        })
        m.io = { foo: "bar", fu:null }
        m.io.fu = { fu: "bar" }
    })
})
