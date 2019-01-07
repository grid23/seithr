"use strict"

import { ENOTGRAPH, ENOTVERTEX, EUNCOMPEDGE } from "errors"
import Edge from "graph/Edge"
import EventTarget from "events/EventTarget"
import Graph from "graph/Graph"
import store from "store"

import { sedges } from "graph/Edge"
import { sgraphs } from "graph/Graph"
export const slabel = new Object(Symbol("label"))

export default class Vertex extends EventTarget {
    constructor(label){
        super()
        store.set(this, new WeakMap)
        store.get(this).set(sedges, new Set)
        store.get(this).set(sgraphs, new Set)
        this.label = label
    }

    get graphs(){ return [...store.get(this).get(sgraphs)] }

    get label(){ return store.get(this).get(slbabel) || null }
    set label(label=null){ store.get(this).set(slabel, label) }

    addEdge(graph, edge) { // shortcut to graph method
        if ( !(graph instanceof Graph) )
          throw new TypeError(ENOTGRAPH)
        return graph.addEdge(edge)
    }

    addEdges(graph, edges){ // shortcut to graph method
        if ( !(graph instanceof Graph) )
          throw new TypeError(ENOTGRAPH)
        return graph.addEdges(edges)
    }

    adjacents(graph){
        if ( !(graph instanceof Graph) )
          throw new TypeError(ENOTGRAPH)

        return graph.adjacents(this)
    }

    adjacentsIn(graph){
        if ( !(graph instanceof Graph) )
          throw new TypeError(ENOTGRAPH)

        return graph.adjacentsIn(this)
    }

    adjacentsOut(graph){
        if ( !(graph instanceof Graph) )
          throw new TypeError(ENOTGRAPH)

        return graph.adjacentsOut(this)
    }

    arcFrom(graph, vertex){
        if ( !(graph instanceof Graph) )
          throw new TypeError(ENOTGRAPH)

        return graph.arcFrom(vertex, this)
    }

    // number of edges not regions in graph
    arcs(graph){
        if ( !(graph instanceof Graph) )
          throw new TypeError(ENOTGRAPH)

        return graph.arcs.filter(({vertices}) => vertices.includes(this))
    }

    arcTo(graph, vertex){
        if ( !(graph instanceof Graph) )
          throw new TypeError(ENOTGRAPH)

        return graph.arcTo(vertex, this)
    }

    // number of edges not regions in graph
    connections(graph){
        if ( !(graph instanceof Graph) )
          throw new TypeError(ENOTGRAPH)

        return graph.connections.filter(({vertices}) => vertices.includes(this))
    }

    // the number of edges
    degree(graph){
        if ( !(graph instanceof Graph) )
          throw new TypeError(ENOTGRAPH)

        return graph.degree(this)
    }

    // list edges related to current vertex in the given graph
    edges(graph){
        if ( !(graph instanceof Graph) )
          throw new TypeError(ENOTGRAPH)
        return graph.edges.filter(edge => edge.vertices.includes(this))
    }

    extravertArcWith(graph, vertex){
      if ( !(graph instanceof Graph) )
        throw new TypeError(ENOTGRAPH)

      return graph.extravertArcWith(vertex, this)
    }

    hyperEdges(graph){
      if ( !(graph instanceof Graph) )
        throw new TypeError(ENOTGRAPH)
      return graph.hyperarcs.filter(edge => edge.vertices.includes(this))
    }

    hyperEdgeWith(graph, vertices){
      if ( !(graph instanceof Graph) )
        throw new TypeError(ENOTGRAPH)

      return graph.hyperEdgeWith([this, ...vertices])
    }

    // inward edges ( vertex <= x ) in the given graph
    indegree(graph){
        if ( !(graph instanceof Graph) )
          throw new TypeError(ENOTGRAPH)
        return graph.indegree(this)
        //return graph.edges.filter(edge => edge.in && edge.in.includes(this))
    }

    introvertArcWith(graph, vertex){
      if ( !(graph instanceof Graph) )
        throw new TypeError(ENOTGRAPH)
      if ( !(vertex instanceof Vertex) )
        throw new TypeError(ENOTVERTEX)

      return graph.addEdge(new Edge([this, vertex], "<>"))
    }

    lines(graph){
        if ( !(graph instanceof Graph) )
          throw new TypeError(ENOTGRAPH)
        return graph.lines.filter(edge => edge.vertices.includes(this))
    }

    lineWith(graph, vertex){
      if ( !(graph instanceof Graph) )
        throw new TypeError(ENOTGRAPH)

      return graph.lineWith(vertex, this)
    }

    loop(graph, relation){
      if ( !(graph instanceof Graph) )
        throw new TypeError(ENOTGRAPH)

      return graph.loop(this, relation)
    }

    loops(graph){
        if ( !(graph instanceof Graph) )
          throw new TypeError(ENOTGRAPH)

        return graph.loops.filter(({ a }) => a === this)
    }

    // outward edges ( vertex => x ) in the given graph
    outdegree(graph){
        if ( !(graph instanceof Graph) )
          throw new TypeError(ENOTGRAPH)
        return graph.outdegree(this)
        //return graph.edges.filter(edge => edge.out && edge.out.includes(this))
    }

    removeEdge(graph, edge){ // shortcut to graph method
        if ( !(graph instanceof Graph) )
          throw new TypeError(ENOTGRAPH)
        return graph.removeEdge(edge)
    }

    removeEdges(graph, edges){ // shortcut to graph method
        if ( !(graph instanceof Graph) )
          throw new TypeError(ENOTGRAPH)
        return graph.removeEdges(edges)
    }
}
