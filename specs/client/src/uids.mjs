"use strict"

import UID from "/mjs/UID.mjs"

const { expect } = chai

describe("UID class", () => {
    it("generates a valid uuid", () => {
          const a = UID.uid()
          const b = UID.uid()

          expect(a !== b).to.be.true
    })

    it("write heavier test", () => {
        throw new Error("write heavier test")
    })
})
