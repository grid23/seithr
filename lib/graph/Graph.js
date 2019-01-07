"use strict"

import { EALRDYCONN, ENOTEDGE, ENOTINSET, ENOTVERTEX, EPRLLLNOTALLOW, EUNCOMPEDGE, EUNKNWNREL } from "errors"
import Edge from "graph/Edge"
import EventTarget from "events/EventTarget"
import Vertex from "graph/Vertex"
import {sgraph} from "graph/Edge"
import store from "store"
import Traversal from "graph/Traversal"

export const sallowed = new Object(Symbol("allowed"))
export const sedges = new Object(Symbol("edges"))
export const sgraphs = new Object(Symbol("graphs"))
export const svertices = new Object(Symbol("vertices"))

const allowance = Object.freeze({
    PARALLELS: 1024
})

const presets = Object.freeze({
    LINES: 0b0001
  , UNDIRECTED: 0b0001
  , ARCS: 0b0010
  , DIRECTED: 0b0010
  , CONNECTIONS: 0b1011
  , ALL: 0b1111
})

export default class Graph extends EventTarget {
    static get allowance(){ return allowance }
    static get presets(){ return presets }

    constructor({ allows=3 } = {}){
        super()
        store.set(this, new WeakMap)

        store.get(this).set(sallowed, allows)
        store.get(this).set(sedges, new Set)
        store.get(this).set(svertices, new Set)
    }

    get allowed(){ return store.get(this).get("sallowed") }
    get arcs(){ return this.edges.filter(edge => edge.type == Edge.types.ARC) }
    get connections(){ return this.edges.filter(edge => edge.type & (Edge.types.LINE|Edge.types.ARC|Edge.types.LOOP)) }
    get edges(){ return [...store.get(this).get(sedges)] }
    get hyperarcs(){ return this.edges.filter(edge => edge.type == Edge.types.HYPERARC) }
    get lines(){ return this.edges.filter(edge => edge.type == Edge.types.LINE) }
    get loops(){ return this.edges.filter(edge => edge.type == Edge.types.LOOP) }
    get regions(){ return this.hyperarcs }
    get vertices(){ return [...store.get(this).get(svertices)] }

    allows(type){ return Boolean(store.get(this).get(sallowed) & type) }

    addEdge(edge){
        if ( !(edge instanceof Edge) )
          throw new TypeError(ENOTEDGE)

        if ( edge.state == Edge.states.CONNECTED )
          throw new Error(EALRDYCONN)

        if ( !this.allows(edge.type) || edge.vertices.some(vertex => !store.get(this).get(svertices).has(vertex)))
          throw new TypeError(EUNCOMPEDGE)

        if ( edge.type !== Edge.types.HYPERARC && !this.allows(Graph.allowance.PARALLELS)
        && ( edge.type !== Edge.types.LOOP && [...this.connections].filter(({ vertices }) => vertices.includes(edge.a) && vertices.includes(edge.b)).length
        || edge.type === Edge.types.LOOP && [...this.loops].filter(({a}) => a == edge.a).length ))
          throw new Error(EPRLLLNOTALLOW)

        store.get(this).get(sedges).add(edge)
        store.get(edge).set(sgraph, this)
        return edge
    }

    addEdges(edges){ void [...edges].forEach(edge => this.addEdge(edge)) }

    adjacents(vertex){
        if ( !(vertex instanceof Vertex) )
          throw new TypeError(ENOTVERTEX)

        if ( !store.get(this).get(svertices).has(vertex) )
          throw new ReferenceError(ENOTINSET)

        return [...this.connections.reduce((acc, {a, b}) => {
            return b === vertex ? (acc.add(a), acc)
                 : a === vertex ? (acc.add(b), acc)
                 : acc
        }, new Set)]
    }

    adjacentsIn(vertex){
        if ( !(vertex instanceof Vertex) )
          throw new TypeError(ENOTVERTEX)

        if ( !store.get(this).get(svertices).has(vertex) )
          throw new ReferenceError(ENOTINSET)

        return [...this.arcs.reduce((acc, {inward, outward, relation}) => {
            if ( inward && inward.includes(vertex) )
              relation !== Edge.relations.ININ ? outward && outward.forEach(outward => outward !== vertex && acc.add(outward))
                                               : inward.forEach(inward => inward !== vertex && acc.add(inward))
            return acc
        }, new Set)]
    }

    adjacentsOut(vertex){
        if ( !(vertex instanceof Vertex) )
          throw new TypeError(ENOTVERTEX)

        if ( !store.get(this).get(svertices).has(vertex) )
          throw new ReferenceError(ENOTINSET)

        return [...this.arcs.reduce((acc, {inward, outward, relation}) => {
            if ( outward && outward.includes(vertex) )
              relation !== Edge.relations.OUTOUT ? inward && inward.forEach(inward => inward !== vertex && acc.add(inward))
                                                 : outward.forEach(outward => outward !== vertex && acc.add(outward))
            return acc
        }, new Set)]
    }

    addVertex(vertex, edges, ...args){
        if ( !(vertex instanceof Vertex) )
          throw new TypeError(ENOTVERTEX)

        store.get(this).get(svertices).add(vertex)
        store.get(vertex).get(sgraphs).add(this)

        if ( edges && edges instanceof Edge )
          this.addEdge(edges)
        else if ( edges && edges[Symbol.iterator] )
          this.addEdges(edges)
        else if ( typeof edges == "function" ) {
            const edge = this.addEdge(Reflect.construct(edges, [[vertex], ...args]))
            return [vertex, edge]
        }


        return vertex
    }

    addVertices(vertices, edges, ...args){
        const added = [...vertices].map(vertex => this.addVertex(vertex))

        if ( edges && edges instanceof Edge )
          this.addEdge(edges)
        else if ( edges && edges[Symbol.iterator] )
          this.addEdges(edges)
        else if ( typeof edges == "function" ) {
            const edge = Reflect.construct(edges, [added, ...args])
            return [added, this.addEdge(edge)]
        }

        return added
    }

    arcFrom(a, b){
        if ( !(a instanceof Vertex) || !(b instanceof Vertex) )
          throw new TypeError(ENOTVERTEX)

        return this.addEdge(new Edge([a, b], ">"))
    }

    arcTo(a, b){
        if ( !(a instanceof Vertex) || !(b instanceof Vertex) )
          throw new TypeError(ENOTVERTEX)

        return this.addEdge(new Edge([a, b], "<"))
    }

    get bft(){ return this.breadthFirstTree }
    breadthFirstTree(vertex){ return new Traversal(this).breadthFirstTree(vertex) }

    degree(vertex){
        if ( !(vertex instanceof Vertex) )
          throw new TypeError(ENOTVERTEX)

        if ( !store.get(this).get(svertices).has(vertex) )
          throw new ReferenceError(ENOTINSET)

        return this.connections.reduce((acc, {vertices, type}) => {
            if ( vertices.includes(vertex) )
              acc += type === Edge.types.LOOP ? 2 : 1
            return acc
        }, 0)
    }

    get dft(){ return this.depthFirstTree }
    depthFirstTree(vertex){ return new Traversal(this).depthFirstTree(vertex) }

    extravertArcWith(a, b){
        if ( !(a instanceof Vertex) || !(b instanceof Vertex) )
          throw new TypeError(ENOTVERTEX)

        return this.addEdge(new Edge([a, b], "><"))
    }

    hyperEdgeWith(vertices){
        vertices.forEach(vertex => {
            if ( !(vertex instanceof Vertex) )
            throw new TypeError(ENOTVERTEX)
        })

        return this.addEdge(new Edge([...vertices], "@"))
    }

    indegree(vertex){
        if ( !(vertex instanceof Vertex) )
          throw new TypeError(ENOTVERTEX)

        if ( !store.get(this).get(svertices).has(vertex) )
          throw new ReferenceError(ENOTINSET)

        return this.arcs.reduce((acc, {inward}) => {
            if ( inward.includes(vertex) )
              acc += 1
            return acc
        }, 0)
    }

    introvertArcWith(vertices){
        if ( !(a instanceof Vertex) || !(b instanceof Vertex) )
          throw new TypeError(ENOTVERTEX)

        return this.addEdge(new Edge([a, b], "<>"))
    }

    lineWith(a, b){
        if ( !(a instanceof Vertex) || !(b instanceof Vertex) )
          throw new TypeError(ENOTVERTEX)

        return this.addEdge(new Edge([a, b]))
    }

    loop(vertex, rel="LINE"){
        if ( !(vertex instanceof Vertex) )
          throw new TypeError(ENOTVERTEX)
        if ( !Edge.relations.hasOwnProperty(rel) )
          throw new ReferenceError(EUNKNWNREL)

        return this.addEdge(new Edge([vertex], rel))
    }

    outdegree(vertex){
        if ( !(vertex instanceof Vertex) )
          throw new TypeError(ENOTVERTEX)

        if ( !store.get(this).get(svertices).has(vertex) )
          throw new ReferenceError(ENOTINSET)

        return this.arcs.reduce((acc, {outward}) => {
            if ( outward.includes(vertex) )
              acc += 1
            return acc
        }, 0)
    }

    removeEdge(edge){
        if ( !(edge instanceof Edge) )
          throw new TypeError(ENOTEDGE)

        store.get(this).get(sedges).delete(edge)
        store.get(edge).delete(sgraph)

        return edge
    }

    removeEdges(edges){ void [...edges].forEach(edge => this.removeEdge(edge)) }

    removeVertex(vertex, edges){
        if ( !(vertex instanceof Vertex) )
          throw new TypeError(ENOTVERTEX)

        store.get(this).get(svertices).delete(vertex)
        store.get(vertex).get(sgraphs).delete(this)

        edges = edges && edges[Symbol.iterator] ? edges
              : edges ? [edges] : []
        void [...edges].forEach(edge => this.removeEdge(edge))

        void [...this.edges].forEach(edge => {
            if ( !edge.vertices.includes(vertex) )
              return

            //if ( edge.type != Edge.types.HYPERARC || edge.vertices.length == 1)
            if ( edge.vertices.length > 1 && (edge.type == Edge.types.HYPERARC || this.allows(Edge.types.LOOP))  )
              edge.removeVertex(vertex)
            else
              this.removeEdge(edge)
        })

        return vertex
    }

    removeVertices(vertices, edges){
        void [...vertices].forEach(vertex => this.removeVertex(vertex))

        if ( edges && !edges[Symbol.iterator] )
          this.removeEdge(edges)
        else if ( edges && edges[Symbol.iterator] )
          this.removeEdges(edges)
    }
}
