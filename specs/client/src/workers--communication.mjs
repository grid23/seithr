"use strict"

import Worker from "/mjs/Worker.mjs"
import Communicator from "/mjs/Communicator.mjs"

const { expect } = chai
describe("communication between parent & child process worker", () => {
    it("starts with a handshake", async () => {
        const worker = await new Worker().spawn(function worker(){
            "use strict"
            
            console.log(self, self.parent)
        })
    })
})
