"use strict"

const wm = new WeakMap

export const get = wm.get.bind(wm)
export const set = wm.set.bind(wm)
export default wm
