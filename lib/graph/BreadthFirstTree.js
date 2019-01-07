"use strict"

import { EINVALIDCONS, ENOTGRAPH, ENOTVERTEX } from "errors"
import Graph from "graph/Graph"
import store from "store"
import typeOf from "utils/toType"
import Vertex from "graph/Vertex"

export const sgraph = new Object(Symbol())
export const sroot = new Object(Symbol())
export const straversal = new Object(Symbol())

export default class BreadthFirstTree {
    static from({ graph, rootVertex, traversal }){
        if ( !(graph instanceof Graph) )
          throw new TypeError(ENOTGRAPH)
        if ( !(rootVertex instanceof Vertex) )
          throw new TypeError(ENOTVERTEX)

        const bft = Object.create({})
        Object.setPrototypeOf(bft, BreadthFirstTree.prototype)
        store.set(bft, new WeakMap)
        store.get(bft).set(sgraph, graph)
        store.get(bft).set(sroot, rootVertex)
        store.get(bft).set(straversal, traversal)

        return bft
    }

    constructor(){ throw new Error(EINVALIDCONS) }

    get root(){ return store.get(this).get(sroot) }

    hasPathTo(vertex){
        if ( !(vertex instanceof Vertex) )
          throw new TypeError(ENOTVERTEX)

        return store.get(this).get(straversal).has(vertex)
    }

    pathTo(vertex){
        if ( !(vertex instanceof Vertex) )
          throw new TypeError(ENOTVERTEX)

        const traversal = store.get(this).get(straversal)
        if ( !traversal.has(vertex) ) return null

        const path = [vertex]
        let parent = vertex
        while ( parent = traversal.get(parent) )
          path.unshift(parent)

        return path
    }
}
