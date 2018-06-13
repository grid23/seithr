"use strict"

import Stylesheet from "/mjs/Stylesheet.mjs"
import CSSRule from "/mjs/CSSRule.mjs"
import CSSMediaRule from "/mjs/CSSMediaRule.mjs"
import ZParser from "/mjs/ZParser.mjs"

const { expect } = chai
describe("Stylesheet (legacy test from ippankiban)", () => {

    it("new Stylesheet()", () => {
        const ss = new Stylesheet

        chai.expect(ss instanceof Stylesheet).to.be.true
        chai.expect(ss.node.nodeType).to.equal(Node.ELEMENT_NODE)
        chai.expect(ss.node.nodeName).to.equal("STYLE")
    })

    it(`new Stylesheet("/path/to/css")`, () => {
        const ss = new Stylesheet("/external/mocha.css")

        chai.expect(ss.node.nodeType).to.equal(Node.ELEMENT_NODE)
        chai.expect(ss.node.nodeName).to.equal("LINK")
    })

    it(`new Stylesheet(node)`, () => {
        const target = document.querySelector("link")
        const ss = new Stylesheet(target)

        chai.expect(ss.node.nodeType).to.equal(Node.ELEMENT_NODE)
        chai.expect(ss.node.nodeName).to.equal("LINK")
    })

    it("stylesheet.insertRule(cssRule)", async () => {
        const dummy = ZParser.parse("div.foo").tree.childNodes[0]
        const ss = new Stylesheet
        const rule = new CSSRule(".foo{background:rgb(255,0,0);}")

        await ss.insertRule(rule)
        chai.expect(ss.sheet.cssRules.length).to.equal(1)
        chai.expect(getComputedStyle(dummy).getPropertyValue("background-color")).to.equal("rgb(255, 0, 0)")
    })

    it("stylesheet.insertRule(cssRule) | cssRule update", async () => {
        const dummy = ZParser.parse("div.foo").tree.childNodes[0]
        const ss = new Stylesheet
        const rule = new CSSRule(".foo{background:rgb(255,0,0);}")

        await ss.insertRule(rule)

        chai.expect(ss.sheet.cssRules.length).to.equal(1)
        chai.expect(getComputedStyle(dummy).getPropertyValue("background-color")).to.equal("rgb(255, 0, 0)")

        rule.setProperty("background", "rgb(0,255,0)")
        chai.expect(getComputedStyle(dummy).getPropertyValue("background-color")).to.equal("rgb(0, 255, 0)")
    })

    it("stylesheet.deleteRule(cssRule)", async () => {
        const dummy = ZParser.parse("div.bar").tree.childNodes[0]
        const ss = new Stylesheet
        const rule = new CSSRule(".bar{background:rgb(255,0,0);}")
        const rule2 = new CSSRule(".bar{color:rgb(255,0,0);}")

        await ss.insertRule(rule)
        await ss.insertRule(rule2)

        chai.expect(ss.sheet.cssRules.length).to.equal(2)
        chai.expect(getComputedStyle(dummy).getPropertyValue("background-color")).to.equal("rgb(255, 0, 0)")
        chai.expect(getComputedStyle(dummy).getPropertyValue("color")).to.equal("rgb(255, 0, 0)")

        await ss.deleteRule(rule)

        chai.expect(ss.sheet.cssRules.length).to.equal(1)
        chai.expect(getComputedStyle(dummy).getPropertyValue("background-color")).to.equal("rgba(0, 0, 0, 0)")
        chai.expect(getComputedStyle(dummy).getPropertyValue("color")).to.equal("rgb(255, 0, 0)")
    })

    it("stylesheet.insertRule(cssMediaRule)", async () => {
        const dummy = ZParser.parse("div.fu").tree.childNodes[0]
        const ss = new Stylesheet
        const media = new CSSMediaRule("@media(min-width:1px){ .fu { background: rgb(255,0,0);} }")
        const rule1 = new CSSRule(".fu{ background: rgb(0,255,0)  }")
        const rule2 = new CSSRule(".fu{ background: rgb(0,0,255)  }")

        media.insertRule(rule1)
        await ss.insertRule(media)

        chai.expect(ss.sheet.cssRules.length).to.equal(1)
        chai.expect(getComputedStyle(dummy).getPropertyValue("background-color")).to.equal("rgb(0, 255, 0)")

        await media.insertRule(rule2)
        chai.expect(getComputedStyle(dummy).getPropertyValue("background-color")).to.equal("rgb(0, 0, 255)")
    })

    it("stylesheet.deleteRule(cssMediaRule)", async () => {
        const dummy = ZParser.parse("div.z").tree.childNodes[0]
        const ss = new Stylesheet
        const media = new CSSMediaRule("@media(min-width:1px){ .z { background: rgb(255,0,0);} }")
        const rule1 = new CSSRule(".z{ background: rgb(0,255,0)  }")
        const rule2 = new CSSRule(".z{ background: rgb(0,0,255)  }")

        media.insertRule(rule1)
        await ss.insertRule(media)

        chai.expect(ss.sheet.cssRules.length).to.equal(1)
        chai.expect(getComputedStyle(dummy).getPropertyValue("background-color")).to.equal("rgb(0, 255, 0)")

        media.insertRule(rule2)
        chai.expect(getComputedStyle(dummy).getPropertyValue("background-color")).to.equal("rgb(0, 0, 255)")

        await ss.deleteRule(media)

        chai.expect(ss.sheet.cssRules.length).to.equal(0)
        chai.expect(getComputedStyle(dummy).getPropertyValue("background-color")).to.equal("rgba(0, 0, 0, 0)")
    })

    it("stylesheet.insertRule(cssMediaRule) | add/remove cssMediaRules to cssMediaRule", async () => {
        const dummy = ZParser.parse("div.fu").tree.childNodes[0]
        const ss = new Stylesheet
        const media1 = new CSSMediaRule("@media(min-width:1px){ .fu { background: rgb(255,0,0);} }")
        const media2 = new CSSMediaRule("@media(min-width:1px){ .fu { background: rgb(0,255, 0);} }")

        await ss.insertRule(media1)

        chai.expect(ss.sheet.cssRules.length).to.equal(1)
        chai.expect(getComputedStyle(dummy).getPropertyValue("background-color")).to.equal("rgb(255, 0, 0)")

        media1.insertRule(media2)
        chai.expect(ss.sheet.cssRules.length).to.equal(1)
        chai.expect(getComputedStyle(dummy).getPropertyValue("background-color")).to.equal("rgb(0, 255, 0)")

        media1.deleteRule(media2)
        chai.expect(getComputedStyle(dummy).getPropertyValue("background-color")).to.equal("rgb(255, 0, 0)")
    })
})
