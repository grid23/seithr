"use strict"
import { Model } from "seithr"

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

    it ("hook: model.hook.prop = function(){}", () => {
        const m = new Model
        m.io = { bar: "bar" }
        m.hook.foo = function(){ return this.io.bar }
        expect(m.hook.foo === "bar").to.be.true
    })

    it("only one active object proxy can exist at a time, proxy survives for a tick when revoked", done => {
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

    it("allows object to be manipulated freely", () => {
        const m = new Model

        m.io = { foo: ["b", "a", "r"], bar: { f:"f", o:"o", b:"b", a:"a", r:"" } }
        expect(() => m.io.foo[0] = "B").to.not.throw()
        expect([...m.io.foo].join("") === "Bar").to.be.true
        expect(Object.keys(m.io.bar).join("") === "fobar")
    })

    it("model have a global hidden name and can have a set global name", () => {
        const m = new Model({ref:"foo"})
        m.io = { foo: "bar" }
        chai.expect(Model.io.foo.foo === "bar").to.be.true
        chai.expect(Model.io[m.valueOf()].foo === "bar").to.be.true
        chai.expect(Model.io["" + m].foo === "bar").to.be.true
    })

    it("event modelchange is fired when a value is set", done => {
        const m = new Model
        let i = 0
        m.addEventListener(Model.events.modelchange, ({target:m}) => {
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

    it("set, defineProperty, deleteProperty provoke a change event", done => {
        const m = new Model

        let i = 0
        m.addEventListener(Model.events.modelchange, ({target:m}) => {
            i += 1

            if ( i == 1 )
              expect(m.io.foo === "bar").to.be.true
            if ( i == 2 )
              expect(m.io.fu === "bar").to.be.true
            if ( i == 3 )
              expect(m.io.fu === undefined).to.be.true,
              done()
        })

        m.io = {foo: "bar"}
        Object.defineProperty(m.io, "fu", { enumerable: true, configurable:true, value: "bar" })
        delete m.io.fu
    })

    it("model can be sealed, preventing any change", () => {
        const m = new Model

        m.io = { foo: "bar" }
        m.seal()

        m.io.foo = "foo"
        expect(m.io.foo === "bar").to.be.true
    })

    it("model can be strictly sealed, preventing any change and throwing errors when attempting changes", () => {
        const m = new Model

        m.io = { foo: "bar" }
        m.seal(true)

        expect(() => m.io.foo = "foo").to.throw()
    })

    it("model.silentio can be used to modify data without events", () => {
        const m = new Model
        let i = 0
        m.addEventListener(Model.events.modelchange, e => i+=1)
        m.silentio = { foo: "bar" }
        m.silentio = { bar: "foo" }

        expect(m.io.bar === "foo").to.be.true
        expect(i==0).to.be.true
    })

    describe("chained models", () => {
        it("requests flow to model parent nodes (with overflow=true(default))", () => {
            const a = new Model
            const b = a.appendChild(new Model)
            const b2 = a.appendChild(new Model({ overflow: false }))
            const c = b.appendChild(new Model)
            const d = a.appendChild(new Model)
            a.io = { a: { b: { c: { d: { e: "foo" } } } } }
            b.io = { a: { b: {} } }
            b2.io = { a: { b: {} } }
            c.io = { a: {} }
            d.io = { foo: {} }

            expect(b.io.a.b.c.d.e === "foo").to.be.true
            expect(b2.io.a.b.c).to.be.undefined
            expect(c.io.a.b.c.d.e === "foo").to.be.true
            expect(d.io.foo.x).to.be.undefined
        })
    })

    describe("meta", () => {
        it("model.m{...} returns a description of the request, not the value", () => {
            const m = new Model

            m.io = { foo: "bar" }

            expect(m.m.model === m).to.be.true
            expect(m.m.path.length == 0).to.be.true
            expect(m.m.foo.model === m).to.be.true
            expect(m.m.foo.path.length == 1 && m.m.foo.path[0] === "foo").to.be.true
            expect(m.m.foo.bar.model === m).to.be.true
            expect(m.m.foo.bar.path.length == 2 && m.m.foo.bar.path[0] === "foo").to.be.true
        })
    })
})
