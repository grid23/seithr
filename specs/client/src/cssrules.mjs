"use strict"

import CSSConditionalRule from "/mjs/CSSConditionalRule.mjs"
import CSSMediaRule from "/mjs/CSSMediaRule.mjs"
import CSSRule from "/mjs/CSSRule.mjs"
import store from "/mjs/store.mjs"
import { sdummy } from "/mjs/EventTarget.mjs"
import { TextUpdate } from "/mjs/CSSRule.mjs"

const { expect } = chai
describe("CSSConditionalRule (legacy test from ippankiban)", () => {

    it ("new CSSConditionalRule", () => {
        const rule = new CSSConditionalRule("@media(min-width:500px){}")

        chai.expect(rule instanceof CSSConditionalRule).to.be.true
        chai.expect(rule.condition).to.equal("media")
        chai.expect(rule.conditionText).to.equal("(min-width:500px)")
    })
})

describe("CSSMediaRule", () => {
    it ("new CSSMediaRule(csstext) (legacy test from ippankiban)", () => {
        const rule = new CSSMediaRule("@media(min-width:500px){ .foo{ background: red } }")

        chai.expect(rule instanceof CSSConditionalRule).to.be.true
        chai.expect(rule instanceof CSSMediaRule).to.be.true
        chai.expect(rule.condition).to.equal("media")
        chai.expect(rule.conditionText).to.equal("(min-width:500px)")
    })
})

describe("CSSRule (legacy test from ippankiban)", () => {

    it("new CSSRule(selector, csstext)" , () => {
        const rule = new CSSRule(".foo", "background:black; color:#fff; border: 1px solid red")

        chai.expect(rule instanceof CSSRule).to.be.true
        chai.expect(!!rule.getProperty("background").match("black")).to.be.true
        chai.expect(rule.getProperty("color")).to.equal("rgb(255, 255, 255)")
        chai.expect(rule.getProperty("border")).to.equal("1px solid red")
    })

    it("new CSSRule(`selector{ csstext }`)" , () => {
        const rule = new CSSRule(".foo { background:black; color:white; border: 1px solid red }")

        chai.expect(!!rule.getProperty("background").match("black")).to.be.true
        chai.expect(rule.getProperty("color")).to.equal("white")
        chai.expect(rule.getProperty("border")).to.equal("1px solid red")
    })

    it("new CSSRule(selector, { props })", () => {
        const rule = new CSSRule(".foo", {
            background: "black"
          , color: "white"
          , border: "1px solid red"
        })

        chai.expect(!!rule.getProperty("background").match("black")).to.be.true
        chai.expect(rule.getProperty("color")).to.equal("white")
        chai.expect(rule.getProperty("border")).to.equal("1px solid red")
    })

    it("cssRule.setProperty(prop, value)", done => {
        const rule = new CSSRule(".foo")

        rule.addEventListener(TextUpdate.TYPE, e => {
            chai.expect(!!rule.getProperty("background").match("black")).to.be.true

            done()
        })

        rule.setProperty("background", "black")
    })
})
