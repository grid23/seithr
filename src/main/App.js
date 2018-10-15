"use strict"

import EventEmitter from "events"

export class App extends EventEmitter {

}

export const main = () => new App
export default main
