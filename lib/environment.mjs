"use strict"

let node = false
try { window } catch(e) { node = true }

export const client = !node
export const server = node
