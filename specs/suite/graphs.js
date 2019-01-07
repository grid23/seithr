"use strict"

import { EALRDYCONN, EPRLLLNOTALLOW, ENOTGRAPH, EINVALIDCONS } from "errors"
import { BreadthFirstTree, DepthFirstTree, Edge, EventTarget, Graph, HyperGraph, Traversal, Vertex } from "seithr"

const { expect } = chai

describe("graphes", () => {
    describe("Graph", () => {
        it("is invoked with the new keyword ; implements EventTarget.", () => {
            const g = new Graph

            expect(g instanceof Graph).to.be.true
            expect(g instanceof EventTarget).to.be.true
        })

        describe("new Graph([opts{}])", () => {
            it ("opts.allows is a binary mask to only allow specific types of edges", () => {
                const g = new Graph({ allows:1 })
                const h = new Graph({ allows: Edge.types.ARC }) // 2
                const i = new Graph({ allows:4 })
                const j = new Graph({ allows:8 })
                const k = new Graph({ allows: Edge.types.LINE | Edge.types.ARC }) // 3
                const l = new Graph({ allows: Edge.types.LINE | Edge.types.ARC | Edge.types.HYPERARC }) // 7
                const m = new Graph({ allows: Edge.types.ARC | Edge.types.HYPERARC | Edge.types.LOOP }) // 14

                expect(g.allows(Edge.types.LINE)).to.be.true
                expect(g.allows(Edge.types.ARC)).to.be.false
                expect(g.allows(Edge.types.HYPERARC)).to.be.false
                expect(g.allows(Edge.types.LOOP)).to.be.false

                expect(h.allows(Edge.types.LINE)).to.be.false
                expect(h.allows(Edge.types.ARC)).to.be.true
                expect(h.allows(Edge.types.HYPERARC)).to.be.false
                expect(h.allows(Edge.types.LOOP)).to.be.false

                expect(i.allows(Edge.types.LINE)).to.be.false
                expect(i.allows(Edge.types.ARC)).to.be.false
                expect(i.allows(Edge.types.HYPERARC)).to.be.true
                expect(i.allows(Edge.types.LOOP)).to.be.false

                expect(j.allows(Edge.types.LINE)).to.be.false
                expect(j.allows(Edge.types.ARC)).to.be.false
                expect(j.allows(Edge.types.HYPERARC)).to.be.false
                expect(j.allows(Edge.types.LOOP)).to.be.true

                expect(k.allows(Edge.types.LINE)).to.be.true
                expect(k.allows(Edge.types.ARC)).to.be.true
                expect(k.allows(Edge.types.HYPERARC)).to.be.false
                expect(k.allows(Edge.types.LOOP)).to.be.false

                expect(l.allows(Edge.types.LINE)).to.be.true
                expect(l.allows(Edge.types.ARC)).to.be.true
                expect(l.allows(Edge.types.HYPERARC)).to.be.true
                expect(l.allows(Edge.types.LOOP)).to.be.false

                expect(m.allows(Edge.types.LINE)).to.be.false
                expect(m.allows(Edge.types.ARC)).to.be.true
                expect(m.allows(Edge.types.HYPERARC)).to.be.true
                expect(m.allows(Edge.types.LOOP)).to.be.true
            })
        })
    })

    describe("HyperGraph", () => {
        it("is invoked with the new keyword ; implements Graph, EventTarget.", () => {
            const g = new HyperGraph

            expect(g instanceof HyperGraph).to.be.true
            expect(g instanceof Graph).to.be.true
            expect(g instanceof EventTarget).to.be.true
        })

        it("is a graph with an implied allowance mask of 7 ( LINE, ARC, HYPERARC )", () => {
            const g = new HyperGraph

            expect(g.allows(Edge.types.LINE)).to.be.true
            expect(g.allows(Edge.types.ARC)).to.be.true
            expect(g.allows(Edge.types.HYPERARC)).to.be.true
            expect(g.allows(Edge.types.LOOP)).to.be.false
        })

        it("can have a label", () => {
            throw new Error("test")
        })
    })

    describe("Vertex", () => {
        it("is invoked with the new keyword ; implements EventTarget.", () => {
            const v = new Vertex

            expect(v instanceof Vertex).to.be.true
            expect(v instanceof EventTarget).to.be.true
        })

        it("can be present in 1+ graphs", () => {
            const g = new Graph
            const h = new Graph

            const a = new Vertex

            expect(() => g.addVertex(a)).to.not.throw()
            expect(() => h.addVertex(a)).to.not.throw()
        })

        it("can have a label", () => {
            throw new Error("test")
        })
    })

    describe("Edge", () => {
        it("is invoked with the new keyword ; implements EventTarget.", () => {
            const a = new Vertex
            const b = new Vertex
            const e = new Edge([a, b])

            expect(e instanceof Edge).to.be.true
            expect(e instanceof EventTarget).to.be.true
        })

        it("can only be present in a single graph", () => {
            const g = new Graph
            const h = new Graph

            const a = new Vertex
            const b = new Vertex

            const e = new Edge([a, b])

            expect(() => g.addVertices([a, b])).to.not.throw()
            expect(() => h.addVertices([a, b])).to.not.throw()
            expect(() => g.addEdge(e)).to.not.throw()
            expect(() => h.addEdge(e)).to.throw(EALRDYCONN)
        })

        it("setting relations new Edge([Vertex a[, Vertex b][, Vertex ...otherVertices]][, int relation])", () => {
            const a = new Vertex
            const b = new Vertex
            const c = new Vertex

            const e = new Edge([a, b])
            expect(e.vertices.length == 2).to.be.true
            expect(e.vertices.includes(a)).to.be.true
            expect(e.a == a).to.be.true
            expect(e.vertices.includes(b)).to.be.true
            expect(e.b == b).to.be.true
            expect(e.bidirected).to.be.false
            expect(e.directed).to.be.false
            expect(e.undirected).to.be.true
            expect(e.in).to.be.null
            expect(e.out).to.be.null
            expect(e.extraverted).to.be.false
            expect(e.intraverted).to.be.false
            expect(e.relation == Edge.relations.LINE).to.be.true
            expect(e.type == Edge.types.LINE).to.be.true

            const f = new Edge([a, b], ">")
            expect(f.bidirected).to.be.false
            expect(f.directed).to.be.true
            expect(f.undirected).to.be.false
            expect(f.in).to.deep.equal([b])
            expect(f.out).to.deep.equal([a])
            expect(f.extraverted).to.be.false
            expect(f.intraverted).to.be.false
            expect(f.relation == Edge.relations.OUTIN).to.be.true
            expect(f.type == Edge.types.ARC).to.be.true

            const g = new Edge([a, b], "<")
            expect(g.directed).to.be.true
            expect(g.in).to.deep.equal([a])
            expect(g.out).to.deep.equal([b])
            expect(g.relation == Edge.relations.INOUT).to.be.true
            expect(g.type === Edge.types.ARC).to.be.true

            const h = new Edge([a, b], "<>")
            expect(h.bidirected).to.be.true
            expect(h.in).to.deep.equal([a, b])
            expect(h.out).to.be.null
            expect(h.relation == Edge.relations.ININ).to.be.true
            expect(h.type === Edge.types.ARC).to.be.true

            const i = new Edge([a, b], "><")
            expect(i.bidirected).to.be.true
            expect(i.in).to.be.null
            expect(i.out).to.deep.equal([a, b])
            expect(i.relation == Edge.relations.OUTOUT).to.be.true
            expect(i.type === Edge.types.ARC).to.be.true

            const j = new Edge([a])
            expect(j.undirected).to.be.true
            expect(j.in).to.be.null
            expect(j.out).to.be.null
            expect(j.relation === Edge.relations.LINE).to.be.true
            expect(j.type === Edge.types.LOOP).to.be.true

            const k = new Edge([a], ">")
            expect(k.directed).to.be.true
            expect(k.in).to.deep.equal([a])
            expect(k.out).to.deep.equal([a])
            expect(k.relation === Edge.relations.OUTIN).to.be.true
            expect(k.type === Edge.types.LOOP).to.be.true

            const l = new Edge([a], "><")
            expect(l.bidirected).to.be.true
            expect(l.in).to.be.null
            expect(l.out).to.deep.equal([a])
            expect(l.relation === Edge.relations.OUTOUT).to.be.true
            expect(l.type === Edge.types.LOOP).to.be.true

            const m = new Edge([a, b, c], "@")
            expect(m.undirected).to.be.true
            expect(m.vertices.length === 3).to.be.true
            expect(m.in).to.be.null
            expect(m.out).to.be.null
            expect(m.relation === Edge.relations.REGION).to.be.true
            expect(m.type === Edge.types.HYPERARC).to.be.true
        })
    })

    describe("adding/removing vertices & edges to a graph", () => {
        it("Graph::addVertex(vertex [, edges]), Graph::addVertices(vertices [, edges])", () => {
            const g = new Graph

            const a = new Vertex
            const b = new Vertex
            const c = new Vertex

            const e = new Edge([a,b])
            const f = new Edge([b, c])

            g.addVertex(a)
            expect( g.vertices.includes(a) ).to.be.true

            g.addVertices([b, c], e)
            expect( g.vertices.includes(b) ).to.be.true
            expect( g.vertices.includes(c) ).to.be.true
            expect( g.edges.includes(e) ).to.be.true

            g.addEdge(f)
            expect( g.edges.includes(f) ).to.be.true

            expect( a.edges(g).includes(e) ).to.be.true
            expect( a.edges(g).includes(f) ).to.be.false

            expect( b.edges(g).includes(e) ).to.be.true
            expect( b.edges(g).includes(f) ).to.be.true

            expect( c.edges(g).includes(e) ).to.be.false
            expect( c.edges(g).includes(f) ).to.be.true

        })

        it("Graph::removeVertex(Vertex vertex [, Edges edges[]]), Graph::removeVertices(Vertex vertices[] [, Edge edges[]]), Graph::removeEdge(Edge edge), Graph::removeEdges(Edge edges[])", () => {
            const g = new Graph()

            const a = new Vertex
            const b = new Vertex
            const c = new Vertex

            const e = new Edge([a, b])
            const f = new Edge([b, c])

            g.addVertex(a)
            g.addVertices([b, c], e)
            g.addEdge(f)

            expect(g.vertices.length == 3).to.be.true
            expect(g.edges.length == 2).to.be.true

            g.removeEdge(f)

            expect(g.vertices.length == 3).to.be.true
            expect(g.edges.length == 1).to.be.true

            g.removeVertex(c, e)
            expect(g.vertices.length == 2).to.be.true
            expect(g.edges.length == 0).to.be.true
        })

        it("Graph::addEdge(Edge edge), Graph::addEdges(Edge edges[]), Graph::removeEdge(Edge edge), Graph::removeEdges(Edge edges[])", () => {
            const g = new Graph
            const a = new Vertex
            const b = new Vertex
            const c = new Vertex
            const e = new Edge([a, b], "-")
            const f = new Edge([b, c], ">")
            const h = new Edge([a, c], "<")

            expect(g.addVertices([a, b, c])).to.deep.equal([a, b, c])
            expect(g.vertices.length == 3).to.be.true
            expect(g.addEdge(e) === e).to.be.true
            expect(g.edges.length == 1).to.be.true
            expect(g.addEdges([f, h])).to.be.undefined
            expect(g.edges.length == 3).to.be.true
            expect(g.removeEdge(h) === h).to.be.true
            expect(g.edges.length == 2).to.be.true
            expect(g.removeEdges([e, f])).to.be.undefined
            expect(g.edges.length == 0).to.be.true
        })


        it("default graphs doesn't allow parallel edges", () => {
            const g = new Graph
            const a = new Vertex
            const b = new Vertex
            const e = new Edge([a, b])
            const f = new Edge([a, b])

            expect(() => g.addVertices([a, b], [e, f])).to.throw(EPRLLLNOTALLOW)
        })

        it("graphs can allow parallel edges", () => {
            const g = new Graph({ allows: Graph.allowance.PARALLELS|Edge.types.LINE })
            const a = new Vertex
            const b = new Vertex
            const e = new Edge([a, b])
            const f = new Edge([a, b])

            expect(() => g.addVertices([a, b], [e, f])).to.not.throw()
        })

        it("removing vertices remove unconnected edges", ()=> {
            const g = new Graph
            const h = new Graph({ allows: Graph.allowance.PARALLELS|Edge.types.LINE })
            const a = new Vertex
            const b = new Vertex
            const e = new Edge([a, b])
            const f = new Edge([a, b])
            const i = new Edge([a, b])
            const j = new Edge([a, b])

            g.addVertices([a, b], [e])
            h.addVertices([a, b], [i, j])

            expect(e.graph == g).to.be.true
            expect(e.state == Edge.states.CONNECTED).to.be.true
            expect(g.edges.length == 1).to.be.true
            expect(h.edges.length == 2).to.be.true

            g.removeVertex(a)
            expect(e.graph).to.be.null
            expect(g.edges.length == 0).to.be.true
            expect(h.edges.length == 2).to.be.true

            h.removeVertex(b)
            expect(i.graph).to.be.null
            expect(h.edges.length == 0).to.be.true

            expect(a.graphs.length == 1).to.be.true
            expect(b.graphs.length == 1).to.be.true
        })

        it("adding & removing vertices & effect on edges (remove vertices if LOOP are ok, or edge is region, remove edge otherwise)", () => {
            const g = new Graph({ allows: Graph.presets.CONNECTIONS|Edge.types.HYPERARC })
            const a = new Vertex
            const b = new Vertex
            const c = new Vertex
            const z = new Edge([a, b], ">")
            const y = new Edge([b, c], ">")
            const x = new Edge([a, c], "<")

            expect(g.addVertices([a, b, c], [x, y, z])).to.deep.equal([a, b, c])
            expect(g.vertices.length === 3).to.be.true
            expect(g.edges.length === 3).to.be.true
            expect(g.edges.length === g.arcs.length).to.be.true
            expect(g.connections.length === g.arcs.length).to.be.true

            const r = new Edge([a, b], "@")
            const s = new Edge([b, c], "REGION")

            expect(g.addEdges([r, s])).to.be.undefined
            expect(g.edges.length === 5).to.be.true
            expect(g.connections.length === 3).to.be.true
            expect(g.connections.length === g.arcs.length).to.be.true
            expect(g.regions.length === 2).to.be.true
            expect(g.regions.length === g.hyperarcs.length).to.be.true

            expect(g.removeVertex(c) == c).to.be.true
            expect(y.vertices.length == 1).to.be.true
            expect(y.type === Edge.types.LOOP).to.be.true
            expect(g.vertices.length == 2).to.be.true
            expect(g.edges.length == 5).to.be.true
            expect(g.connections.length == 3).to.be.true
            expect(g.regions.length == 2).to.be.true
            expect(g.removeVertex(b) === b).to.be.true
            expect(g.vertices.length == 1).to.be.true
            expect(g.edges.length == 3).to.be.true
            expect(g.connections.length == 2).to.be.true
            expect(g.regions.length == 1).to.be.true
        })
    })

    describe("degrees, adjacents", () => {
        const g = new Graph({ allows: Graph.presets.CONNECTIONS })
        const [[a, b], e] = g.addVertices([new Vertex, new Vertex], Edge, "-")
        const [[c, d], f] = g.addVertices([new Vertex, new Vertex], Edge, ">")
        const h = g.addEdge(new Edge([a,c], "<"))

        const z = new Graph({ allows: Graph.presets.CONNECTIONS })
        const [[y]] = z.addVertices([new Vertex], Edge)

        it("degrees is the number of adjacents(connected) vertices, loops count for 2", () => {
            expect(a.degree(g) == 2).to.be.true
            expect(b.degree(g) == 1).to.be.true
            expect(c.degree(g) == 2).to.be.true
            expect(d.degree(g) == 1).to.be.true
            expect(y.degree(z) == 2).to.be.true
        })

        it("outdegre/indegree, number of adjacents vertices with {out,in}ward connections", () => {
            expect(a.indegree(g) == 1).to.be.true
            expect(b.indegree(g) == 0).to.be.true
            expect(c.indegree(g) == 0).to.be.true
            expect(d.indegree(g) == 1).to.be.true

            expect(a.outdegree(g) == 0).to.be.true
            expect(b.outdegree(g) == 0).to.be.true
            expect(c.outdegree(g) == 2).to.be.true
            expect(d.outdegree(g) == 0).to.be.true
        })

        it("adjacents(connected) vertices", () => {
            expect(a.adjacents(g).includes(b)).to.be.true
            expect(g.adjacents(a).includes(c)).to.be.true
            expect(a.adjacents(g).includes(d)).to.be.false

            expect(b.adjacents(g).includes(a)).to.be.true
            expect(b.adjacents(g).includes(c)).to.be.false
            expect(b.adjacents(g).includes(d)).to.be.false

            expect(c.adjacents(g).includes(d)).to.be.true
            expect(g.adjacents(c).includes(a)).to.be.true
            expect(c.adjacents(g).includes(b)).to.be.false

            expect(d.adjacents(g).includes(c)).to.be.true
            expect(d.adjacents(g).includes(a)).to.be.false
            expect(d.adjacents(g).includes(b)).to.be.false
        })

        it("adjacentsIn, adjacentsOut", () => {
            expect(a.adjacentsIn(g).includes(c)).to.be.true
            expect(a.adjacentsIn(g).length == 1).to.be.true
            expect(a.adjacentsOut(g).length == 0).to.be.true

            expect(b.adjacentsIn(g).length == 0).to.be.true
            expect(g.adjacentsOut(b).length == 0).to.be.true

            expect(c.adjacentsIn(g).length == 0).to.be.true
            expect(c.adjacentsOut(g).length == 2).to.be.true
            expect(g.adjacentsOut(c).includes(a)).to.be.true
            expect(g.adjacentsOut(c).includes(d)).to.be.true

            expect(d.adjacentsIn(g).includes(c)).to.be.true
            expect(d.adjacentsIn(g).length == 1).to.be.true
            expect(g.adjacentsOut(d).length == 0).to.be.true
        })
    })

    describe("shortcuts", () => {
        it ("graph.addVertex(new Vertex, Edge, `-`)", () => {
            const g = new Graph({ allows: Edge.types.LOOP })
            const [a, e] = g.addVertex(new Vertex, Edge, ">")

            expect(g.vertices.length == 1).to.be.true
            expect(g.edges.length == 1).to.be.true
            expect(g.loops.length == 1).to.be.true
        })

        it ("graph.addVertices([new Vertex, new Vertex], Edge, `>`)", () => {
            const g = new Graph
            const [[a, b], e] = g.addVertices([new Vertex, new Vertex], Edge, ">")

            expect(g.vertices.length == 2).to.be.true
            expect(g.edges.length == 1).to.be.true
            expect(g.edges[0] === e).to.be.true
            expect(g.arcs.length ==1).to.be.true
        })

        it("Vertex::{arcs, connections, edges, hyperEdges, lines}(Graph graph), Vertex::graphs", () => {
            const h = new HyperGraph
            const [[a, b], e] = h.addVertices([new Vertex, new Vertex], Edge, ">")

            expect(a.arcs(h)[0] == e).to.be.true
            expect(b.arcs(h)[0] == e).to.be.true
            expect(a.connections(h).length == 1).to.be.true
            expect(b.connections(h).length == 1).to.be.true
            expect(a.edges(h).length == 1).to.be.true
            expect(b.edges(h).length == 1).to.be.true
            expect(a.hyperEdges(h).length == 0).to.be.true
            expect(b.hyperEdges(h).length == 0).to.be.true
            expect(a.lines(h).length == 0).to.be.true
            expect(b.lines(h).length == 0).to.be.true

            const [[c, d], f] = h.addVertices([new Vertex, new Vertex], Edge, "-")

            expect(c.arcs(h).length == 0).to.be.true
            expect(d.arcs(h).length == 0).to.be.true
            expect(c.connections(h).length == 1).to.be.true
            expect(d.connections(h).length == 1).to.be.true
            expect(c.edges(h).length == 1).to.be.true
            expect(d.edges(h).length == 1).to.be.true
            expect(c.hyperEdges(h).length == 0).to.be.true
            expect(d.hyperEdges(h).length == 0).to.be.true
            expect(c.lines(h).length == 1).to.be.true
            expect(d.lines(h).length == 1).to.be.true

            const [[g, i], r] = h.addVertices([new Vertex, new Vertex], Edge, "@")
            expect(g.arcs(h).length == 0).to.be.true
            expect(i.arcs(h).length == 0).to.be.true
            expect(g.connections(h).length == 0).to.be.true
            expect(i.connections(h).length == 0).to.be.true
            expect(g.edges(h).length == 1).to.be.true
            expect(i.edges(h).length == 1).to.be.true
            expect(g.hyperEdges(h).length == 1).to.be.true
            expect(i.hyperEdges(h).length == 1).to.be.true
            expect(g.lines(h).length == 0).to.be.true
            expect(i.lines(h).length == 0).to.be.true
        })

        it("Vertex::{arcTo, arcFrom, introvertArcWith, extravertArcWith, loop, lineWith}(graph), and Graph::{arcTo, arcFrom, introvertArcWith, extravertArcWith, loop, lineWith}(vertex)", () => {
            const g = new Graph({ allows: Graph.presets.ALL })
            const [a, b, c, d, e] = g.addVertices([new Vertex, new Vertex, new Vertex, new Vertex, new Vertex])

            a.arcTo(g, b)
            expect(a.adjacentsOut(g).includes(b)).to.be.true
            expect(b.adjacentsIn(g).includes(a)).to.be.true

            c.arcFrom(g, a)
            expect(a.adjacentsOut(g).includes(c)).to.be.true
            expect(c.adjacentsIn(g).includes(a)).to.be.true

            d.lineWith(g, a)
            expect(d.adjacents(g).includes(a)).to.be.true
            expect(a.adjacents(g).includes(d)).to.be.true

            a.loop(g)
            expect(a.loops(g).length == 1).to.be.true

            b.introvertArcWith(g, e)
            expect(b.adjacentsIn(g).includes(e)).to.be.true
            expect(e.adjacentsIn(g).includes(b)).to.be.true

            b.extravertArcWith(g, d)
            expect(b.adjacentsOut(g).includes(d)).to.be.true
            expect(d.adjacentsOut(g).includes(b)).to.be.true

            a.hyperEdgeWith(g, [b, c, d, e])
            expect(g.regions.length == 1).to.be.true
            expect(g.regions[0].vertices.includes(a)).to.be.true
            expect(g.regions[0].vertices.includes(b)).to.be.true
            expect(g.regions[0].vertices.includes(c)).to.be.true
            expect(g.regions[0].vertices.includes(d)).to.be.true
            expect(g.regions[0].vertices.includes(e)).to.be.true
        })
    })

    describe("errors", () => {

        it("adding an edge connecting to a vertice not present in a graph throws", () => {
            throw new Error("test")
        })

    })

    describe("graphs traversal", () => {
        const graph = new Graph({ allows: Graph.presets.UNDIRECTED })
        const [[a, b], z] = graph.addVertices([new Vertex, new Vertex], Edge)
        const [[, c], y] = graph.addVertices([a, new Vertex], Edge)
        graph.addEdge(new Edge([b, c]))
        const [[d, e], x] = graph.addVertices([new Vertex, new Vertex], Edge)
        const [[f, g], w] = graph.addVertices([new Vertex, new Vertex], Edge)
        graph.addEdge(new Edge([b, d]))
        graph.addEdge(new Edge([b, e]))
        graph.addEdge(new Edge([c, f]))
        graph.addEdge(new Edge([c, g]))
        graph.addEdge(new Edge([e, f]))

        describe("Traversal", () => {
            it("is invoked with the new keyword, inherits from EventTarget, graph argument is mandatory", () => {
                const traversal = new Traversal(graph)

                expect(traversal instanceof Traversal).to.be.true
                expect(traversal instanceof EventTarget).to.be.true
                expect(() => new Traversal).to.throw(ENOTGRAPH)
            })
        })

        describe("BreadthFirstTree", () => {
            it("is returned by Graph::{breadthFirstTree}", () => {
                const bft = graph.breadthFirstTree(a)
                expect(bft instanceof BreadthFirstTree).to.be.true
                expect(() => new BreadthFirstTree).to.throw(EINVALIDCONS)
            })
        })

        describe("depthFirstTree", () => {
            it("is returned by Graph::{depthFirstTree}", () => {
                const dft = graph.depthFirstTree(a)
                expect(dft instanceof DepthFirstTree)
                expect(() => new DepthFirstTree).to.throw(EINVALIDCONS)
            })
        })
    })

    describe("traversals, undirected graphs", () => {
        const graph = new Graph({ allows: Graph.presets.UNDIRECTED })
        const [[a, b], z] = graph.addVertices([new Vertex, new Vertex], Edge)
        const [[, c], y] = graph.addVertices([a, new Vertex], Edge)
        graph.addEdge(new Edge([b, c]))
        const [[d, e], x] = graph.addVertices([new Vertex, new Vertex], Edge)
        const [[f, g], w] = graph.addVertices([new Vertex, new Vertex], Edge)
        graph.addEdge(new Edge([b, d]))
        graph.addEdge(new Edge([b, e]))
        graph.addEdge(new Edge([c, f]))
        graph.addEdge(new Edge([c, g]))
        graph.addEdge(new Edge([e, f]))
        const h = new Vertex

        describe("bft = Graph.breadthFirstTree(vertex)", () => {
            it ("bft.pathTo(vertex)", () => {
                const bft = graph.bft(a)
                expect(bft.pathTo(b)).to.deep.equal([a, b])
                expect(bft.pathTo(c)).to.deep.equal([a, c])
                expect(bft.pathTo(d)).to.deep.equal([a, b, d])
                expect(bft.pathTo(e)).to.deep.equal([a, b, e])
                expect(bft.pathTo(f)).to.deep.equal([a, c, f])
                expect(bft.pathTo(g)).to.deep.equal([a, c, g])
                expect(bft.pathTo(h)).to.be.null
            })

            it("bft.hasPathto(vertex)", () => {
                const bft = graph.bft(a)
                graph.vertices.forEach(vertex => expect(bft.hasPathTo(vertex)).to.be.true)
                expect(bft.hasPathTo(h)).to.be.false
            })
        })

        describe("dft = Graph.depthFirstTree(vertex)", () => {
            it("dft.hasPathTo(vertex)", () => {
                const dft = graph.dft(a)
                graph.vertices.forEach(vertex => expect(dft.hasPathTo(vertex)).to.be.true)
                expect(dft.hasPathTo(h)).to.be.false
            })
        })

    })

    describe("traversals, directed graphs", () => {

    })
})
