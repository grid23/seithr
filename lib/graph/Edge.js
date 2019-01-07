"use strict"

import { ENOTVERTEX, EUNKNWNREL } from "errors"
import EventTarget from "events/EventTarget"
import store from "store"
import Vertex from "graph/Vertex"

export const sdirection = new Object(Symbol())
export const sedges = new Object(Symbol())
export const sextraverted = new Object(Symbol())
export const sgraph = new Object(Symbol)
export const slabel = new Object(Symbol())
export const srelation = new Object(Symbol())
export const svertexa = new Object(Symbol())
export const svertexb = new Object(Symbol())
export const svertices = new Object(Symbol())

const relations = Object.freeze({
    "-"   : 0b1 // A - B
  , LINE  : 0b1
  , "<"   : 0b10 // A <- B
  , INOUT : 0b10
  , "<>"  : 0b100 // A <-> B
  , ININ  : 0b100
  , ">"   : 0b1000 // A -> B
  , OUTIN : 0b1000
  , "><"  : 0b10000 // A >-< B
  , OUTOUT: 0b10000
  , "@"   : 0b100000 // < A, B, C,... >
  , REGION: 0b100000
  , HYPERARC: 0b100000
})

const states = Object.freeze({
    CONNECTED: 0b1
  , DISCONNECTED: 0b0
})

const types = Object.freeze({
    LINE    : 0b1 // 2 vertices and no direction
  , ARC     : 0b10 // 2 vertices and 1-2 direction
  , HYPERARC: 0b100 // more than 2 vertices
  , REGION  : 0b100 // more than 2 vertices
  , LOOP    : 0b1000 // 1 vertice
})

export default class Edge extends EventTarget {
    static get relations(){ return relations }
    static get states(){ return states }
    static get types(){ return types }

    constructor(vertices, relation, label){
        super()
        store.set(this, new WeakMap)
        store.get(this).set(svertices, new Set)

        this.relation = relation
        this.label = label

        const [a, b, ...otherVertices] = [...vertices]
        if ( a )
          this.addVertex(a)
        if ( b )
          this.addVertex(b)
        if ( otherVertices.length )
          this.addVertices(otherVertices)
    }

    get a(){ return this.vertices[0] || null }
    get b(){ return this.vertices[1] || this.vertices[0] || null }

    get bidirected(){ return Boolean(this.relation & ( Edge.relations.OUTOUT|Edge.relations.ININ )) }

    get directed(){ return Boolean(this.relation & ( Edge.relations.INOUT|Edge.relations.OUTIN )) }

    get extraverted(){ return Boolean(this.relation & Edge.relations.ININ) }

    get graph(){ return store.get(this).get(sgraph) || null }

    get in(){
        if ( this.relation & Edge.relations.ININ )
          return [...new Set([this.a, this.b])]
        else if ( this.relation & Edge.relations.INOUT )
          return [this.a]
        else if ( this.relation & Edge.relations.OUTIN )
          return [this.b]
        return null
    }
    get inward(){ return this.in }

    get intraverted(){ return Boolean(this.relation & Edge.relations.ININ) }

    get label(){ return store.get(this).get(slabel) || null }
    set label(label=null){ store.get(this).set(slabel, label) }

    get out(){
        if ( this.relation & Edge.relations.OUTOUT )
          return [...new Set([this.a, this.b])]
        else if ( this.relation & Edge.relations.OUTIN )
          return [this.a]
        else if ( this.relation & Edge.relations.INOUT )
          return [this.b]
        return null
    }
    get outward(){ return this.out }

    get relation(){ return store.get(this).get(srelation) }
    set relation(rel="LINE"){
        if ( !Edge.relations.hasOwnProperty(rel) )
          throw new ReferenceError(EUNKNWNREL)
        store.get(this).set(srelation, Edge.relations[rel])
    }

    get state(){ return store.get(this).get(sgraph) ? Edge.states.CONNECTED : Edge.states.DISCONNECTED }

    get type(){
        if ( this.relation & Edge.relations.LINE )
          return this.a === this.b ? Edge.types.LOOP : Edge.types.LINE
        else if ( this.relation & (Edge.relations.INOUT|Edge.relations.OUTIN|Edge.relations.ININ|Edge.relations.OUTOUT) )
          return this.a === this.b ? Edge.types.LOOP : Edge.types.ARC
        else if ( this.relation & Edge.relations.REGION )
          return Edge.types.HYPERARC
    }

    get undirected(){ return !this.directed && !this.bidirected }

    get vertices(){ return [...store.get(this).get(svertices)] }

    addVertex(vertex){
        if ( !(vertex instanceof Vertex) )
          throw new TypeError(ENOTVERTEX)

        const l = this.vertices.length
        if ( l >= 2 && this.relation !== Edge.relations.REGION )
          throw new Error(ETOOMANYVERT)

        store.get(this).get(svertices).add(vertex)
        store.get(vertex).get(sedges).add(this)
        return vertex
    }

    addVertices(vertices){ return [...vertices].map(vertex => this.addVertex(vertex)) }

    removeVertex(vertex){
        if ( !(vertex instanceof Vertex) )
          throw new TypeError(ENOTVERTEX)

        store.get(this).get(svertices).delete(vertex)
        store.get(vertex).get(sedges).delete(this)
        return vertex
    }

    removeVertices(vertices){ return [...vertices].map(vertex => this.removeVertex(vertex)) }
}
