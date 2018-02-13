"use strict"

import EventTarget from "/mjs/EventTarget.mjs"
import Node from "/mjs/Node.mjs"
import ReadyStateFul from "/mjs/ReadyStateFul.mjs"
import Worker from "/mjs/Worker.mjs"

const { expect } = chai
describe("Worker", () => {
    it("is invoked with the new keyword, takes no argument. Worker intherits from ReadyStateFul", () => {
        const worker = new Worker

        chai.expect(worker instanceof Worker).to.be.true
        chai.expect(worker instanceof ReadyStateFul).to.be.true
        chai.expect(worker instanceof EventTarget).to.be.true
        chai.expect(worker instanceof Node).to.be.true
        chai.expect(worker.readyState === Worker.UNINITIALIZED).to.be.true
    })

    it("can start a child process with the async Worker::spawn(body) method, body is a function expression with the explicit name worker, that returns the worker instance", async () => {
        const worker = await new Worker().spawn(function worker(){})

        chai.expect(worker.readyState === Worker.INITIALIZED).to.be.true
        chai.expect(!!worker.url).to.be.true
        chai.expect(!!worker.cp).to.be.true

        worker.terminate()
        chai.expect(worker.readyState === Worker.DISCONNECTED).to.be.true
        chai.expect(!worker.url).to.be.true
        chai.expect(!worker.cp).to.be.true
    })

    it("can start a child process with the async Worker::spawn(url) method that returns the worker instance", async () => {
        const worker = await new Worker().spawn("/samples/worker--a.mjs")

        chai.expect(worker.readyState === Worker.INITIALIZED).to.be.true
        chai.expect(!!worker.url).to.be.true
        chai.expect(!!worker.cp).to.be.true

        worker.terminate()
        chai.expect(worker.readyState === Worker.DISCONNECTED).to.be.true
        chai.expect(!worker.url).to.be.true
        chai.expect(!worker.cp).to.be.true
    })
})
