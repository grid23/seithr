"use strict"

import Model from "/mjs/Model.mjs"
import ZExpression from "/mjs/ZExpression.mjs"
import ZParser from "/mjs/ZParser.mjs"
import View from "/mjs/View.mjs"

const samples = document.querySelector("#samples")
describe("class View (legacy tests from ippankiban)", () => {

    it("new View() returns a valid (but empty) view", () => {
        let v = new View

        chai.expect(v instanceof View)
        chai.expect(v.expression.string).to.equal("")
    })

    it(`new View("span") == new View(new ZExpression("span")) `, () => {
        console.log('<--------')
        let v = new View("span")
        let w = new View(new ZExpression("span"))
        console.log('-------->')
        chai.expect(v.expression.string).to.equal("span")
        chai.expect(w.expression.string).to.equal("span")
    })

    it (`new View({ foo: bar }) = new View( new Model({ foo: bar }))`, () => {
        let v = new View({foo: "bar"})
        let w = new View(new Model({foo: "bar"}))

        chai.expect(v.model.get("foo")).to.equal("bar")
        chai.expect(w.model.get("foo")).to.equal("bar")
    })

    it (`new View("span{$foo}", { foo: "bar" }) === new View(new ZExpression("span{$foo}"), new Model({ foo: "bar"}))`, () => {
        let v = new View("span{$foo}", { foo: "bar" })
        let w = new View(new ZExpression("span{$foo}"), new Model({ foo: "bar"}))

        chai.expect(v.model.get("foo")).to.equal("bar")
        chai.expect(w.model.get("foo")).to.equal("bar")
        chai.expect(v.fragment.childNodes[0].nodeName).to.equal("SPAN")
        chai.expect(w.fragment.childNodes[0].nodeName).to.equal("SPAN")
    })


    it("getting references from templates (one root dom node)", () => {
        let v = new View("div> span@foo{$foo} + span@foo{$foo}", { foo: "bar" })

        chai.expect(v.root).to.equal( v.query("root") )
        chai.expect(v.query("root").nodeName).to.equal("DIV")
        chai.expect(v.query("foo").nodeName).to.equal("SPAN")
        chai.expect(v.queryAll("foo").length).to.equal(2)
        chai.expect(v.queryAll("foo")[0].nodeName).to.equal("SPAN")
        chai.expect(v.queryAll("foo")[1].nodeName).to.equal("SPAN")
    })
})
