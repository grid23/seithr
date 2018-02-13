"use strict"

import cancelAnimationFrames from "/mjs/cancelAnimationFrames.mjs"
import requestAnimationFrames from "/mjs/requestAnimationFrames.mjs"

const { expect } = chai

describe("requestAnimationFrames", () => {
    it("accept only a generator function, returns a promise", done => {
        const generatorFn = function *(){}
        const generator = generatorFn()
        const fn = function(){}
        let error
        expect( () => requestAnimationFrames(generatorFn) ).to.not.throw()
        expect( () => requestAnimationFrames(generator) ).to.not.throw()
        expect( !!requestAnimationFrames(generatorFn).then ).to.be.true

        requestAnimationFrames(fn).catch(e => {
            expect(e instanceof TypeError).to.be.true
            done()
        })
    })

    it("is compatible with await/async", async () => {
        let i = 0
        const rv = await requestAnimationFrames(function *(){
            for (  ; i < 10 ; i++ )
              yield i
            return "foo"
        })
        expect(rv).to.be.string("foo")
        expect(i).to.be.eql(10)
    })

    it("allows cancelAnimationFrames to cancel the generator", done => {
        let frames = 0
        const gen = function *(){
            while ( true ) {
                frames += 1
                yield "foo"
            }

        }

        requestAnimationFrames(gen)
        setTimeout(() => cancelAnimationFrames(gen), 80)
        setTimeout(() => {
            expect(frames < 9).to.be.eql(true)
            done()
        }, 160) // enough for about 10 frames
    })
})
