"use strict"

import { ENOTGRAPH, ENOTVERTEX } from "errors"

import BreadthFirstTree from "graph/BreadthFirstTree"
import DepthFirstTree from "graph/DepthFirstTree"
import EventTarget from "events/EventTarget"
import Graph from "graph/Graph"
import store from "store"
import Vertex from "graph/Vertex"

export const sgraph = new Object(Symbol())

export default class Traversal extends EventTarget {

    constructor(graph){
        if ( !(graph instanceof Graph) )
          throw new TypeError(ENOTGRAPH)

        super()
        store.set(this, new WeakMap)
        store.get(this).set(sgraph, graph)
    }

    get bft(){ return this.breadthFirstTree }

    get graph(){ return store.get(this).get(sgraph) }

    depthFirstTree(rootVertex){
        if ( !(rootVertex instanceof Vertex) )
          throw new TypeError(ENOTVERTEX)

        const traversal = new WeakMap
        const stack = [[null, rootVertex]]

        while ( stack.length ) {
            const [parent, vertex] = stack[stack.length-1]

            traversal.set(vertex, parent)

            const nextVertex = [
                ...this.graph.lines.reduce((acc, {a, b, vertices}) => (vertices.includes(vertex) && acc.push(a===vertex?b:a), acc), [])
              , ...this.graph.adjacentsOut(vertex)
            ]
            .filter(child => !traversal.has(child))
            [0]

            if ( !nextVertex ) stack.pop()
            else stack.push([vertex, nextVertex])
        }

        return DepthFirstTree.from({ graph:this.graph, rootVertex, traversal })
    }

    breadthFirstTree(rootVertex){
        if ( !(rootVertex instanceof Vertex) )
          throw new TypeError(ENOTVERTEX)

        const traversal = new WeakMap
        const queue = [[null, rootVertex]]

        while ( queue.length ) {
            const [parent, vertex] = queue.shift()

            if ( traversal.has(vertex) )
              continue
            traversal.set(vertex, parent)

            // void [
            //     ...this.graph.lines.reduce((acc, {a, b, vertices}) => (vertices.includes(vertex) && acc.push(a===vertex?b:a), acc), [])
            //   , ...this.graph.adjacentsOut(vertex)
            // ]
            // .filter(child => !traversal.has(child))
            // .forEach(child => queue.push([vertex, child]))

            void [
                ...this.graph.lines.filter(({vertices}) => vertices.includes(vertex))
              , ...this.graph.arcs.filter(({vertices}) => vertices.includes(vertex))
            ]
            .sort((a, b) => (+a.label||0) - (+b.label||0))
            .reduce((acc, {a,b}) =>  (acc.push(a===vertex?b:a), acc), [])
            .forEach(child => queue.push([vertex, child]))
        }

        return BreadthFirstTree.from({ graph:this.graph, rootVertex, traversal })
    }

}
