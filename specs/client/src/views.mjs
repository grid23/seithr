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

    it(`extends View`, () => {
        class V extends View {
            constructor(model){
                super(model)
            }

            get _template(){ return "div > span" }
        }

        const v = new V
        document.getElementById("samples").appendChild(v.fragment)
        chai.expect(v.expression.string).to.equal("div > span")
        chai.expect(v.root.nodeName).to.equal("DIV")
    })

    it(`new View("span") == new View(new ZExpression("span")) `, () => {
        let v = new View("span")
        let w = new View(new ZExpression("span"))
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

    it("model values are injected to the dom immediatly", done => {
        let v = new View("div[data-foo=$foo].$foo#$foo{$foo}", { foo:"foo" })

        chai.expect(v.root.getAttribute("data-foo") === "foo").to.be.true
        chai.expect(v.root.className.indexOf("foo") != -1).to.be.true
        chai.expect(v.root.id == "foo").to.be.true
        chai.expect(v.root.textContent.indexOf("foo") != -1).to.be.true

        v.model.addEventListener("update", () => setTimeout(() => {
          chai.expect(v.root.getAttribute("data-foo") === "bar").to.be.true
          chai.expect(v.root.className.indexOf("bar") != -1).to.be.true
          chai.expect(v.root.id == "bar").to.be.true
          chai.expect(v.root.textContent.indexOf("bar") != -1).to.be.true
          done()
        }, 100))

        v.model.set("foo", "bar")
    })
})
