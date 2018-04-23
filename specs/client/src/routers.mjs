"use strict"

"use strict"

import EventTarget from "/mjs/EventTarget.mjs"
import Node from "/mjs/Node.mjs"
import Route from "/mjs/Route.mjs"
import RouteDispatcher from "/mjs/RouteDispatcher.mjs"
import Router from "/mjs/Router.mjs"

const { expect } = chai
describe("class Router (legacy tests from ippankiban)", () => {
    it("router.addRouteHandler(path, handler)", () => {
        const router = new Router()
        router.addRouteHandler("/foo", (route, next) => next())
        router.addRouteHandler("/foo", (route, next) => next())

        chai.expect(router.routes.get("/foo").length).to.equal(2)
    })

    it("router.addRouteHandler(path, { handleRoute: ()=>{} })", () => {
        const router = new Router()
        router.addRouteHandler("/foo", { handleRoute: (route, next) => next() })
        chai.expect(typeof router.routes.get("/foo").handleRoute).to.equal("function")
    })

    it("router.addRouteHandler([paths], handler)", () => {
        const router = new Router()
        const foo = (route, next) => next()

        router.addRouteHandler(["/foo", "/bar"], foo)

        chai.expect(typeof router.routes.get("/foo")).to.equal("function")
        chai.expect(typeof router.routes.get("/bar")).to.equal("function")
    })

    it("router.removeRouteHandler(path, handler)", () => {
        const router = new Router()
        const foo = (route, next)=>next()
        router.addRouteHandler("/foo", foo)
        router.addRouteHandler("/bar", (route, next)=>next())
        router.removeRouteHandler("/foo", foo)

        chai.expect(router.routes.get("/foo")).to.equal(undefined)
        chai.expect(typeof router.routes.get("/bar")).to.equal("function")
    })

    it("router.dispatchRoute(path) (A)", done => {
        const router = new Router()
        const foo = (route, next) => {}

        router.addRouteHandler("/foo", foo)
        const dispatch = router.dispatchRoute("/foo")

        chai.expect(dispatch instanceof RouteDispatcher).to.be.true
        dispatch.addEventListener("routing", () => done())
    })

    it("router.dispatchRoute(path) (B)", done => {
        const router = new Router()
        let hits = 0
        const foo = (route, next) => {
            hits += 1

            next()
        }

        router.addRouteHandler("/foo", foo)
        router.addRouteHandler("/foo", foo)

        const dispatch = router.dispatchRoute("/foo")

        dispatch.addEventListener("routing", e => {
            chai.expect(hits).to.equal(2)
            done()
        })
    })

    it("router.dispatchRoute(path) (C)", done => {
        const router = new Router()
        let hits = 0
        const foo = (route, next) => {
            hits += 1
        }
        const bar = (route, next) => {
            throw new Error("shouldn't go there")
            hits += 1
        }

        router.addRouteHandler("/foo", foo)
        router.addRouteHandler("/foo", bar)

        const dispatch = router.dispatchRoute("/foo")
        dispatch.addEventListener("routing", e => {
            chai.expect(hits).to.equal(e.count)
            chai.expect(e.count).to.equal(1)
            done()
        })
    })

    it("router.dispatchRoute(path) (D)", done => {
        const router = new Router

        router.addRouteHandler("*", (route, next) => {})
        router.addRouteHandler("*", (route, next) => next(true))

        const dispatch = router.dispatchRoute("/foo")
        dispatch.addEventListener("routing", e => {
            chai.expect(e.count).to.equal(1)
            done()
        })
    })

    it("router.dispatchRoute(path) (E)", done => {
        const router = new Router
        let order = 0

        router.addRouteHandler("/foo", (route, next) => {
          chai.expect(order).to.equal(2)
          order += 1
          next(false)
        })
        router.addRouteHandler("/foo", (route, next) => {
            chai.expect(order).to.equal(3)
        })
        router.addRouteHandler("*", (route, next) => {
            chai.expect(order).to.equal(0)
            order += 1
        })
        router.addRouteHandler("*", (route, next) => {
            chai.expect(order).to.equal(1)
            order += 1
            next(true)
        })

        const dispatch = router.dispatchRoute("/foo")
        dispatch.addEventListener("routing", e => {
            chai.expect(e.count).to.equal(2)
            done()
        })
    })

    it("router.dispatchRoute(path) (F)", done => {
        const router = new Router
        let order = 0

        router.addRouteHandler("/foo/:bar.:foo", (route, next) => {
          chai.expect(order).to.equal(2)

          chai.expect(route.matches.bar).to.equal("bar")
          chai.expect(route.matches.foo).to.equal("foo")

          order += 1
          next(false)
        })
        router.addRouteHandler("/:bar/bar.:foo", (route, next) => {
            chai.expect(order).to.equal(3)

            chai.expect(route.matches.bar).to.equal("foo")
            chai.expect(route.matches.foo).to.equal("foo")

            order += 1
            next()
        })
        router.addRouteHandler("/:bar/bar.foo", (route, next) => {
            chai.expect(order).to.equal(4)

            chai.expect(route.matches.bar).to.equal("foo")
        })
        router.addRouteHandler("*", (route, next) => {
            chai.expect(order).to.equal(0)
            order += 1
        })
        router.addRouteHandler("*", (route, next) => {
            chai.expect(order).to.equal(1)
            order += 1
            next(true)
        })

        const dispatch = router.dispatchRoute("/foo/bar.foo")
        dispatch.addEventListener("routing", e => {
            chai.expect(e.count).to.equal(3)
            done()
        })
    })

    it("router.dispatchRoute(path) (G - wait)", done => {
        const router = new Router
        let order = 0

        router.addRouteHandler("/foo", (route, next) => {
            route.wait(ok => {
                setTimeout(() => {
                    chai.expect(order).to.equal(0)
                    order += 1

                    next()
                    ok()
                }, 1000)
            })
        })

        router.addRouteHandler("/foo", (route, next) => {
            chai.expect(order).to.equal(1)
        })

        router.dispatchRoute("/foo").addEventListener("routing", e => {
            chai.expect(e.count).to.equal(2)
            done()
        })
    })

    it("router.dispatchRoute(path) (H - late next error)", done => {
        const router = new Router
        const _warn = console.warn.bind(console)
        console.warn = function(msg){
            console.warn = _warn
            done()
        }

        router.addRouteHandler("/H", (r, next) => {
            next()
            next()
        })

        router.dispatchRoute("/H")
    })

    it("router.dispatchRoute(path) (I - late next error 2)", done => {
        const router = new Router
        const _warn = console.warn.bind(console)
        console.warn = function(msg){
            console.warn = _warn
            done()
        }

        router.addRouteHandler("/H", (r, next) => {
            next()
            r.wait(ok => {
                ok()
                next()
            })
        })

        router.dispatchRoute("/H")
    })

})
