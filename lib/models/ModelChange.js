"use strict"

import Event from "events/Event"
import spath from "models/Model"
import store from "store"

export default class ModelChange extends Event {
    static get TYPE(){ return "model:change" }

    constructor(path){
        super(ModelChange.TYPE, { bubbles: false })
        store.get(this).set(spath, path)
    }

    get path(){ return store.get(this).get(spath) }
    get toString(){ return this.path.join(".") }
}
