"use strict"

//TODO SHIMS

import { client, server } from "./environment.mjs"

export const Event = client ? window.Event : {}
export const MessageChannel = client ? window.MessageChannel : {}
export const Node = client ? window.Node : {}
export const Worker = client ? window.Worker : {}
export const Blob = client ? window.Blob : {}
