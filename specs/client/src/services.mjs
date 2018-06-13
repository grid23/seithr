"use strict"

import Node from "/mjs/Node.mjs"
import Service from "/mjs/Service.mjs"

describe("Service (legacy tests from ippankiban)", () => {

    it ("new Service(url)", () => {
        const s = new Service(document.location.href)

        chai.expect(s instanceof Node).to.be.true
        chai.expect(s instanceof Service).to.be.true
    })

    it("service.request(cb) | ok", done => {
        const s = new Service(document.location.href)

        s.request((err, status, req) => {
            chai.expect(!!err).to.be.false
            chai.expect(!!req).to.be.true
            chai.expect(status).to.equal(200)
            done()
        })
    })

    it("service.request(cb) | err", done => {
        const s = new Service("/wont/work")

        s.request((err, status, req) => {
            chai.expect(!!err).to.be.true
            chai.expect(!!req).to.be.true
            chai.expect(status).to.equal(404)
            done()
        })
    })
})
