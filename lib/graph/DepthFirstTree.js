"use strict"

import { EINVALIDCONS, ENOTGRAPH, ENOTVERTEX } from "errors"
import Graph from "graph/Graph"
import store from "store"
import typeOf from "utils/toType"
import Vertex from "graph/Vertex"

export const sgraph = new Object(Symbol())
export const sroot = new Object(Symbol())
export const straversal = new Object(Symbol())

export default class DepthFirstTree {
    static from({ graph, rootVertex, traversal }){
        if ( !(graph instanceof Graph) )
          throw new TypeError(ENOTGRAPH)
        if ( !(rootVertex instanceof Vertex) )
          throw new TypeError(ENOTVERTEX)

        const dft = Object.create({})
        Object.setPrototypeOf(dft, DepthFirstTree.prototype)
        store.set(dft, new WeakMap)
        store.get(dft).set(sgraph, graph)
        store.get(dft).set(sroot, rootVertex)
        store.get(dft).set(straversal, traversal)

        return dft
    }

    constructor(){ throw new Error(EINVALIDCONS) }

    get root(){ return store.get(this).get(sroot) }

    hasPathTo(vertex){
        if ( !(vertex instanceof Vertex) )
          throw new TypeError(ENOTVERTEX)

        return store.get(this).get(straversal).has(vertex)
    }
}
