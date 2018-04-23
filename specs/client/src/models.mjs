"use strict"

"use strict"

import Model from "/mjs/Model.mjs"

const { expect } = chai
describe("class Model", () => {

    describe("legacy tests from korbut", () => {

        it("should accept an object as base key->value pairs", () => {
            const m = new Model({foo:"bar", bar:"foo"})

            expect(m.data.foo).to.be.equal("bar")
            expect(m.data.bar).to.be.equal("foo")
            expect(m.data.bar).to.be.equal("foo")
            expect(m.getItem("bar")).to.be.equal("foo")
        })

        it("should accept a serialized string as base key->value pairs", () => {
            const m = new Model("foo=bar&bar=foo")

            expect(m.data.foo).to.be.equal("bar")
            expect(m.getItem("foo")).to.be.equal("bar")
            expect(m.data.bar).to.be.equal("foo")
            expect(m.getItem("bar")).to.be.equal("foo")
        })

        describe("#setItem", () => {
            const m = new Model

            it("should accept any JSON-compatible type of data", () => {
                  m.setItem("a", 0)
                  expect(m.data.a).to.be.equal(0)
                  expect(m.getItem("a")).to.be.equal(0)

                  m.setItem("b", 1)
                  expect(m.data.b).to.be.equal(1)
                  expect(m.getItem("b")).to.be.equal(1)

                  m.setItem("c", -1)
                  expect(m.data.c).to.be.equal(-1)
                  expect(m.getItem("c")).to.be.equal(-1)

                  m.setItem("z", new Number(2))
                  expect(m.data.z).to.be.equal(2)
                  expect(m.getItem("z")).to.be.equal(2)

                  m.setItem("e", true)
                  expect(m.data.e).to.be.true
                  expect(m.getItem("e")).to.be.true

                  m.setItem("f", false)
                  expect(m.data.f).to.be.false
                  expect(m.getItem("f")).to.be.false

                  m.setItem("g", new Boolean(1))
                  expect(m.data.g).to.be.true
                  expect(m.getItem("g")).to.true

                  m.setItem("h", "string")
                  expect(m.data.h).to.be.equal("string")
                  expect(m.getItem("h")).to.be.equal("string")

                  m.setItem("i", new String("string"))
                  expect(m.data.i).to.be.equal("string")
                  expect(m.getItem("i")).to.be.equal("string")

                  m.setItem("j", { k: [{l: "string", m: "string"}, { o: "string" }], p: "string"})

                  expect(m.data["j.k.0.l"]).to.be.equal("string")
                  expect(m.getItem("j.k.0.l")).to.be.equal("string")

                  m.setItem("q", [0])
                  expect(m.data["q.length"]).to.be.equal(1)
                  expect(m.getItem("q.0")).to.be.equal(0)

                  m.setItem("r", new Array(2))
                  expect(m.data["r.length"]).to.be.equal(2)
                  expect(m.getItem("r.0")).to.be.undefined
            })
        })

        describe("0, null, false, undefined values in dataset", () => {
            it ("0 should never equal false", done => {
                const m = new Model

                m.addEventListener("add", function onadd(e){
                    m.removeEventListener("add", onadd)

                    expect(e.from).to.be.undefined
                    expect(e.to).to.be.equal(0)

                    m.addEventListener("add", function onadd(e){
                        expect(e.from).to.be.equal(0)
                        expect(e.to).to.be.equal(25)
                        done()
                    })

                    m.setItem("x", 25)
                })

                m.setItem("x", 0)
            })
        })
    })

})
