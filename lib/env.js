"use strict"

export const BUBBLES = (() => {
    let bubbles = false
    const a = document.createElement("div")
    const b = a.appendChild(document.createElement("div"))
    a.addEventListener("bubblestest", e => bubbles=true)

    const e = document.createEvent("Event")
    e.initEvent("bubblestest", true, true)
    b.dispatchEvent(e)

    return bubbles
})()
