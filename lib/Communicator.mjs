"use strict"

import { ERR_INVALID_TARGET } from "./error.mjs"
import ReadyStateFul from "./ReadyStateFul.mjs"
import { MessageChannel } from "./window.mjs"
import store from "./store.mjs"

export const shandshake = new Object(Symbol())
export const sorigin = new Object(Symbol())
export const starget = new Object(Symbol())
export const stype = new Object(Symbol())

export default class Communicator extends ReadyStateFul {

    static get NONE() { return 0b0  }
    static get [0b0]() { return "NONE"  }
    static get SELF() { return 0b1 }
    static get [0b1]() { return "SELF" }
    static get HTMLIFRAMEELEMENT() { return 0b10  }
    static get [0b10]() { return "HTMLIFRAMEELEMENT" }
    static get WINDOW() { return 0b11  }
    static get [0b11]() { return "WINDOW" }
    static get WORKER() { return 0b100 }
    static get [0b100]() { return "WORKER" }

    static get UNINITIALIZED() { return 0b0 }
    static get [0b0]() { return "UNINITIALIZED" }
    static get INITIALIZED() { return 0b1 }
    static get [0b1]() { return "INITIALIZED" }
    static get CONNECTED() { return 0b10 }
    static get [0b10]() { return "CONNECTED" }
    static get DISCONNECTED() { return 0b11 }
    static get [0b11](){ return "DISCONNECTED" }

    constructor({ target, origin="*" }) {
        super()

        if ( Object.prototype.toString.call(target).slice(8, -1) === "HTMLIFRAMEELEMENT" )
          comms.get(this).set(stype, Communicator.HTMLIFRAMEELEMENT)
        else
          throw new TypeError(ERR_INVALID_TARGET)

        comms.get(this).set(starget, target)
        comms.get(this).set(sorigin, origin)
        ReadyStateFul.readyStateChange(this, Communicator.UNINITIALIZED)

        this.addEventListener("")
    }

    get endpoint() {}
    get handshakes() { return comms.get(this).get(shandshake) }
    get messagePort() {}
    get origin() { return comms.get(this).get(sorigin) }
    get target() { return comms.get(this).get(starget) }
    get type() { return comms.get(this).get(stype) }

    async handshake() {}
    async message() {}
}
