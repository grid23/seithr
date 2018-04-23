"use strict"

import Model from "/mjs/Model.mjs"
import ZExpression from "/mjs/ZExpression.mjs"
import ZParser from "/mjs/ZParser.mjs"

const samples = document.querySelector("#samples")
describe ("ZExpression & ZParser (legacy tests from ippankiban)", ()=>{

    describe("new ZExpression", ()=>{
        it ("returns a valid zExpression object", ()=>{
            let e = new ZExpression

            chai.expect(e instanceof ZExpression).to.be.true
        })

        it ("can be iterated (zExpression[Symbol.iterator])", ()=>{
            let e = new ZExpression("span{💩}")
            let chars = []

            for ( let char of e )
              chars.push(char)

            chai.expect(chars).to.deep.equal(["s", "p", "a", "n", "{", "💩", "}"])
        })
    })

    describe("new ZParser", ()=>{
        it ("returns a valid zParser object", ()=>{
            let p = new ZParser

            chai.expect(p instanceof ZParser).to.be.true
        })

        describe ("parser.parse()", () => {
            it("returns a document fragment tree and a hash of reference nodes", () => {
                let r = ZParser.parse("div>span{foo}")

                chai.expect(r.tree.nodeType).to.equal(Node.DOCUMENT_FRAGMENT_NODE)
            })

            it("siblings" , () => {
                let r = ZParser.parse("ul>li+li")
                let s = ZParser.parse("li+li+li")

                chai.expect(r.tree.nodeType).to.equal(Node.DOCUMENT_FRAGMENT_NODE)
                chai.expect(r.tree.childNodes[0].nodeName).to.equal("UL")
                chai.expect(r.tree.childNodes[0].childNodes.length).to.equal(2)

                chai.expect(s.tree.nodeType).to.equal(Node.DOCUMENT_FRAGMENT_NODE)
                chai.expect(s.tree.childNodes.length).to.equal(3)
            })

            it("group (no var)", () => {
                let r = ZParser.parse("(span{foo})")

                chai.expect(r.tree.nodeType).to.equal(Node.DOCUMENT_FRAGMENT_NODE)
                chai.expect(r.tree.childNodes.length).to.equal(1)
            })

            it("group (var)", () => {
                let r = ZParser.parse("(span{$foo})", {foo: "bar"})
                console.log(r.tree.childNodes[0].textContent, r.vars, r.model.data, r.updates)
                chai.expect(r.tree.nodeType).to.equal(Node.DOCUMENT_FRAGMENT_NODE)
                chai.expect(r.tree.childNodes.length).to.equal(1)
                chai.expect(r.tree.childNodes[0].textContent).to.equal("bar")

            })

            it("group, children, and siblings (no var)", ()=> {
                let r = ZParser.parse("(ul>li+li)+(ul>ol+ol)")

                chai.expect(r.tree.nodeType).to.equal(Node.DOCUMENT_FRAGMENT_NODE)
                chai.expect(r.tree.childNodes.length).to.equal(2)
            })

            it ("setting ID on element (no var)", ()=>{
                let r = ZParser.parse("div#foo#bar") // only the last can be taken into account!

                chai.expect(r.tree.nodeType).to.equal(Node.DOCUMENT_FRAGMENT_NODE)
                chai.expect(r.tree.childNodes[0].nodeName).to.equal("DIV")
                chai.expect(r.tree.childNodes[0].id).to.equal("bar")
            })

            it ("setting ID on element (var)", () => {
                let r = ZParser.parse("div#$foo#bar", { foo: "foo" }) // the last to update will decide

                chai.expect(r.tree.nodeType).to.equal(Node.DOCUMENT_FRAGMENT_NODE)
                chai.expect(r.tree.childNodes[0].nodeName).to.equal("DIV")
                chai.expect(r.tree.childNodes[0].id).to.equal("foo")
            })

            it ("setting classname on element (no var)", ()=>{
                const CLASS_LIST_COMPAT = (Element.prototype.hasOwnProperty("classList") || HTMLElement.prototype.hasOwnProperty("classList")) && function(){
                    // to be compatible, browser must be able to use classlist on a svg element
                    try {
                        document.createElementNS("http://www.w3.org/2000/svg", "svg").classList.add("x")
                        return true
                    } catch(e){}
                    return false
                }()

                let r = ZParser.parse("div.a.b.C")

                chai.expect(r.tree.nodeType).to.equal(Node.DOCUMENT_FRAGMENT_NODE)
                chai.expect(r.tree.childNodes[0].nodeName).to.equal("DIV")

                if ( CLASS_LIST_COMPAT )
                  chai.expect(r.tree.childNodes[0].classList.contains("a")).to.be.true,
                  chai.expect(r.tree.childNodes[0].classList.contains("b")).to.be.true,
                  chai.expect(r.tree.childNodes[0].classList.contains("C")).to.be.true
                else
                  chai.expect(r.tree.childNodes[0].className).to.equal(" a b C")
            })

            it ("setting classname on element (var)",() =>{
                const CLASS_LIST_COMPAT = (Element.prototype.hasOwnProperty("classList") || HTMLElement.prototype.hasOwnProperty("classList")) && function(){
                    // to be compatible, browser must be able to use classlist on a svg element
                    try {
                        document.createElementNS("http://www.w3.org/2000/svg", "svg").classList.add("x")
                        return true
                    } catch(e){}
                    return false
                }()

                let r = ZParser.parse("div.a.$b.£c", { b: "foo", c: "bar" })

                chai.expect(r.tree.nodeType).to.equal(Node.DOCUMENT_FRAGMENT_NODE)
                chai.expect(r.tree.childNodes[0].nodeName).to.equal("DIV")

                if ( CLASS_LIST_COMPAT )
                  chai.expect(r.tree.childNodes[0].classList.contains("a")).to.be.true,
                  chai.expect(r.tree.childNodes[0].classList.contains("foo")).to.be.true,
                  chai.expect(r.tree.childNodes[0].classList.contains("bar")).to.be.true
                else
                  chai.expect(r.tree.childNodes[0].className).to.equal(" a foo bar")
            })

            it ("setting attribute on element (no var)", () => {
                let r = ZParser.parse("div[test=foo][foo]")

                chai.expect(r.tree.nodeType).to.equal(Node.DOCUMENT_FRAGMENT_NODE)
                chai.expect(r.tree.childNodes[0].nodeName).to.equal("DIV")
                chai.expect(r.tree.childNodes[0].getAttribute("test")).to.equal("foo")
                chai.expect(r.tree.childNodes[0].getAttribute("foo")).to.equal("true")
            })

            it ("setting attribute on element (var)", () => {
                let r = ZParser.parse("div[test=$foo][test2=£bar]", { foo: "bar", bar: "foo" })

                chai.expect(r.tree.nodeType).to.equal(Node.DOCUMENT_FRAGMENT_NODE)
                chai.expect(r.tree.childNodes[0].nodeName).to.equal("DIV")
                chai.expect(r.tree.childNodes[0].getAttribute("test")).to.equal("bar")
                chai.expect(r.tree.childNodes[0].getAttribute("test2")).to.equal("foo")
            })

            it ("setting text content (no var)", () => {
                let r = ZParser.parse("span{foo}")

                chai.expect(r.tree.nodeType).to.equal(Node.DOCUMENT_FRAGMENT_NODE)
                chai.expect(r.tree.childNodes[0].nodeName).to.equal("SPAN")
                chai.expect(r.tree.childNodes[0].textContent).to.equal("foo")
            })

            it ("setting text content ( w/ vars ) A", () => {
                let r = ZParser.parse("span{lorem ipsum $foo solor £bar damet $foo}", {
                    foo: "a", bar: "b"
                })

                chai.expect(r.tree.nodeType).to.equal(Node.DOCUMENT_FRAGMENT_NODE)
                chai.expect(r.tree.childNodes[0].nodeName).to.equal("SPAN")
                chai.expect(r.tree.childNodes[0].childNodes.length).to.equal(6)
                chai.expect(r.tree.childNodes[0].textContent).to.equal("lorem ipsum a solor b damet a")
            })

            it ("setting text content ( w/ vars - unsafe ) B", () => {

                let r = ZParser.parse("span{£foo}", {
                    foo: "<b>a</b>"
                })

                chai.expect(r.tree.nodeType).to.equal(Node.DOCUMENT_FRAGMENT_NODE)
                chai.expect(r.tree.childNodes[0].nodeName).to.equal("SPAN")
                //chai.expect(r.tree.childNodes[0].childNodes.length).to.equal(1)
                chai.expect(r.tree.childNodes[0].innerHTML).to.equal("<b>a</b>")
            })

            it ("node references", () => {
                let r = ZParser.parse("(span@bar>a[href=$href]>span@{£foo}) + span", { foo: "bar", href: "#foo" })

                chai.expect(r.tree.nodeType).to.equal(Node.DOCUMENT_FRAGMENT_NODE)
                chai.expect(r.tree.childNodes[0].nodeName).to.equal("SPAN")
                chai.expect(r.tree.childNodes[0].childNodes[0].nodeName).to.equal("A")
                chai.expect(r.tree.childNodes[0].childNodes[0].childNodes[0].nodeName).to.equal("SPAN")

                chai.expect([...r.refs["root"]].length).to.equal(2)
                chai.expect([...r.refs["bar"]][0]).to.equal(r.tree.childNodes[0])
                chai.expect([...r.refs["a"]][0]).to.equal(r.tree.childNodes[0].childNodes[0])
                chai.expect([...r.refs["span"]][0]).to.equal(r.tree.childNodes[0].childNodes[0].childNodes[0])
            })

        })
    })
})
