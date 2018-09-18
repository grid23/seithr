"use strict"

import Model from "/mjs/Model2.mjs"
import View, {expression} from "/mjs/View2.mjs"
import Parser from "/mjs/ZParser2.mjs"

const { expect } = chai

describe("View.expression", () => {
    it("View.expression`...`, View.expression(...)", () => {
        const e = View.expression`div{${"bar"}}`
        const f = View.expression("div{bar}")

        expect(e === "div{bar}").to.be.true
        expect(f === "div{bar}").to.be.true
    })

    it("View.expression`div{${model.io.value}}`", () => {
        const m = new Model
        m.io = { foo: { bar: "foobar" } }
        const e = View.expression`div{${m.io.foo.bar}}`

        expect(e === `div{foobar}`).to.be.true
    })

    it("View.expression`div{${model.m.value}}`", () => {
        const m = new Model
        const e = View.expression`div{${m.m.foo.bar}}`

        expect(e === `div{⌊foo.bar∈${m}⌉}`).to.be.true
    })

    it("View.expression`div + ${View}`", () => {
        class V extends View {}
        class W extends V {}
        const e = View.expression`div + ${W}`

        expect(e === `div + |${W}|`).to.be.true
    })
})

describe("Parser2 (experimental)", () => {
    it("ZParser.parse(div > span)", () => {
        const p = Parser.parse(expression`div > span`)

        expect(p.fragment.childNodes.length == 1).to.be.true
        expect(p.fragment.childNodes[0].childNodes.length == 1).to.be.true
        expect(p.refs.root.length == 1).to.be.true
        expect(p.refs.root[0] == p.fragment.childNodes[0]).to.be.true
    })

    it("ZParser.parse(div > span > b)", () => {
        const p = Parser.parse(expression`div > span > b`)

        expect(p.fragment.childNodes.length == 1).to.be.true
        expect(p.fragment.childNodes[0].childNodes.length == 1).to.be.true
        expect(p.refs.root.length == 1).to.be.true
        expect(p.refs.root[0] == p.fragment.childNodes[0]).to.be.true
        expect(p.refs.root[0].childNodes[0].childNodes.length === 1).to.be.true
        expect(p.refs.root[0].childNodes[0].childNodes[0].nodeName === "B").to.be.true
    })

    it("ZParser.parse(div + div)", () => {
        const p = Parser.parse(expression`div + div`)

        expect(p.fragment.childNodes.length == 2).to.be.true
        expect(p.refs.root.length == 2).to.be.true
        expect(p.refs.root[0] == p.fragment.childNodes[0]).to.be.true
        expect(p.refs.root[1] == p.fragment.childNodes[1]).to.be.true
    })

    it("ZParser.parse(div + div > span)", () => {
        const p = Parser.parse(expression`div + div > span`)

        expect(p.fragment.childNodes.length == 2).to.be.true
        expect(p.refs.root.length == 2).to.be.true
        expect(p.refs.root[0] == p.fragment.childNodes[0]).to.be.true
        expect(p.refs.root[1] == p.fragment.childNodes[1]).to.be.true
        expect(p.refs.root[1].childNodes.length === 1).to.be.true
        expect(p.refs.root[1].childNodes[0].nodeName === "SPAN").to.be.true
    })

    it("ZParser.parse(div > span + span)", () => {
        const p = Parser.parse(expression`div > span + span`)

        expect(p.fragment.childNodes.length == 1).to.be.true
        expect(p.refs.root.length == 1).to.be.true
        expect(p.refs.root[0] == p.fragment.childNodes[0]).to.be.true
        expect(p.refs.root[0].childNodes.length === 2).to.be.true
        expect(p.refs.root[0].childNodes[0].nodeName === "SPAN").to.be.true
        expect(p.refs.root[0].childNodes[1].nodeName === "SPAN").to.be.true
    })

    it("ZParser.parse(div@foo > span@foo)", () => {
        const p = Parser.parse(expression`div@foo >span@foo`)
        expect(p.fragment.childNodes.length == 1).to.be.true
        expect(p.fragment.childNodes[0].childNodes.length == 1).to.be.true
        expect(p.refs.root.length == 1).to.be.true
        expect(p.refs.foo.length == 1)
        expect(p.refs.foo[0] === p.fragment.childNodes[0]).to.be.true
        expect(p.refs.foo[1] === p.fragment.childNodes[0].childNodes[0]).to.be.true
    })

    it("ZParser.parse(div@foo + div@bar > span@foo)", () => {
        const p = Parser.parse(expression`div@foo + div@bar > span@foo`)
        expect(p.fragment.childNodes.length == 2).to.be.true
        expect(p.fragment.childNodes[1].childNodes.length == 1).to.be.true
        expect(p.refs.root.length == 2).to.be.true
        expect(p.refs.foo.length == 2)
        expect(p.refs.foo[0] === p.fragment.childNodes[0]).to.be.true
        expect(p.refs.foo[1] === p.fragment.childNodes[1].childNodes[0]).to.be.true
        expect(p.refs.bar.length === 1).to.be.true
        expect(p.refs.bar[0] === p.fragment.childNodes[1])
    })

    it("ZParser.parse(div[foo])", () => {
        const p = Parser.parse(expression`div[foo] > span[foo=bar]`)

        expect(p.fragment.childNodes[0].hasAttribute("foo")).to.be.true
        expect(p.fragment.childNodes[0].getAttribute("foo") === "true").to.be.true
        expect(p.fragment.childNodes[0].childNodes[0].getAttribute("foo") === "bar").to.be.true
    })

    it("ZParser.parse(div[foo=${model.io.value}])", () => {
        const m = new Model
        m.io = { foo: "bar" }
        const p = Parser.parse(expression`div[foo=${m.io.foo}]`)

        expect(p.fragment.childNodes[0].getAttribute("foo") === "bar").to.be.true
    })

    it("ZParser.parse(div[foo=${model.m.value}])", () => {
        const m = new Model
        m.io = { foo: "abc" }

        const p = Parser.parse(expression`div[foo=${m.m.foo}]`)

        expect(p.fragment.childNodes[0].getAttribute("foo") === "abc").to.be.true
    })

    it("ZParser.parse(div[foo=foo-${model.m.value}-bar-${model.m.value}])", () => {
        const m = new Model
        m.io = { foo: "abc", bar: "def" }

        const p = Parser.parse(expression`div[foo=foo-${m.m.foo}-bar-${m.m.bar}]`)
        expect(p.fragment.childNodes[0].getAttribute("foo") === "foo-abc-bar-def").to.be.true
    })

    it("ZParser.parse(div#foo)", () => {
        const p = Parser.parse(expression`div#foo`)

        expect(p.fragment.childNodes[0].getAttribute("id") === "foo").to.be.true
    })

    it("ZParser.parse(div#${model.io.value})", () => {
        const m = new Model
        m.io = { foo: "bar" }
        const p = Parser.parse(expression`div#${m.io.foo}`)

        expect(p.fragment.childNodes[0].getAttribute("id") === "bar").to.be.true
    })

    it("ZParser.parse(div#${model.m.value})", () => {
        const m = new Model
        m.io = { foo: "abc" }

        const p = Parser.parse(expression`div#${m.m.foo}`)

        expect(p.fragment.childNodes[0].getAttribute("id") === "abc").to.be.true
    })

    it("ZParser.parse(div#foo-${model.m.value}-bar-${model.m.value})", () => {
        const m = new Model
        m.io = { foo: "abc", bar: "def" }

        const p = Parser.parse(expression`div#foo-${m.m.foo}-bar-${m.m.bar}`)
        expect(p.fragment.childNodes[0].getAttribute("id") === "foo-abc-bar-def").to.be.true
    })

    it("ZParser.parse(div.foo)", () => {
        const p = Parser.parse(expression`div.foo`)

        expect(p.fragment.childNodes[0].getAttribute("class") === "foo").to.be.true
    })

    it("ZParser.parse(div.foo.bar)", () => {
        const p = Parser.parse(expression`div.foo.bar`)

        expect(p.fragment.childNodes[0].getAttribute("class") === "foo bar").to.be.true
    })

    it("ZParser.parse(div.${model.io.value})", () => {
        const m = new Model
        m.io = { foo: "abc" }

        const p = Parser.parse(expression`div.${m.m.foo}`)

        expect(p.fragment.childNodes[0].getAttribute("class") === "abc").to.be.true
    })

    it("ZParser.parse(div.${model.m.value})", () => {
        const m = new Model
        m.io = { foo: "abc" }

        const p = Parser.parse(expression`div.${m.m.foo}`)

        expect(p.fragment.childNodes[0].getAttribute("class") === "abc").to.be.true
    })

    it("ZParser.parse(div.${model.m.value}.${model.m.value})", () => {
        const m = new Model
        m.io = { foo: "abc", bar:"def" }

        const p = Parser.parse(expression`div.${m.m.foo}.${m.m.bar}`)

        expect(p.fragment.childNodes[0].getAttribute("class") === "abc def").to.be.true
    })

    it("ZParser.parse(div.${model.m.value}.${model.m.value}.pqr)", () => {
        const m = new Model
        m.io = { foo: "abc def", bar:"ghi jkl mno" }

        const p = Parser.parse(expression`div.${m.m.foo}.${m.m.bar}.pqr`)

        //expect(p.fragment.childNodes.length == 1).to.be.true
        expect(p.fragment.childNodes[0].getAttribute("class") === "abc def ghi jkl mno pqr").to.be.true
    })

    it("ZParser.parse(div{hello world!})", () => {
        const p = Parser.parse(expression`div{hello world!}`)

        expect(p.fragment.childNodes[0].textContent === "hello world!").to.be.true
    })

    it("ZParser.parse(div{{hello world!}})", () => {
        const p = Parser.parse(expression`div{{hello world!}}`)

        expect(p.fragment.childNodes[0].textContent === "hello world!").to.be.true
    })

    it("ZParser.parse(div{hello ${m.m.value}})", () => {
        const m = new Model
        m.io = { world: "world" }
        const p = Parser.parse(expression`div{hello ${m.m.world}!}`)

        expect(p.fragment.childNodes[0].textContent === "hello world!").to.be.true
    })

    it("ZParser.parse(div{hello }{${m.m.value}})", () => {
        const m = new Model
        m.io = { world: "world" }
        const p = Parser.parse(expression`div{hello }{${m.m.world}!}`)

        expect(p.fragment.childNodes[0].childNodes.length == 2).to.be.true
        expect(p.fragment.childNodes[0].textContent === "hello world!").to.be.true
    })
})

describe("View2 (experimental)", () => {

})