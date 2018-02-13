"use strict"

import http2 from "http2"
import fs from "fs"
import expose from "../expose"
import _path from "path"
import util from "util"

const {
    HTTP2_HEADER_STATUS
  , HTTP2_HEADER_CONTENT_TYPE
  , HTTP2_HEADER_CONTENT_LENGTH
} = http2.constants
const { __dirname } = expose
const { open, fstat } = fs
const { resolve:resolvePath } = _path
const { promisify } = util

export const path = [/^GET\/external\/(.*)$/]
export const routeHandler = async ({ httpstream, headers, flag, match }) => new Promise(async (resolve) => {
    const file = match[0][0]

    let filepath
    let type

    switch (file) {
        case "chai.js":
            filepath = resolvePath(__dirname, "../../node_modules/chai/chai.js")
            type = "application/javascript"
            break
        case "mocha.js":
            filepath = resolvePath(__dirname, "../../node_modules/mocha/mocha.js")
            type = "application/javascript"
            break
        case "mocha.css":
            filepath = resolvePath(__dirname, "../../node_modules/mocha/mocha.css")
            type = "text/css"
            break
        default:
            return resolve(-1)
    }

    const fd = await promisify(open)(filepath, "r")
    const stats = await promisify(fstat)(fd)

    httpstream.once("close", () => resolve(1))
    httpstream.respondWithFD(fd, {
        [HTTP2_HEADER_STATUS]: 200
      , [HTTP2_HEADER_CONTENT_TYPE]: type
      , [HTTP2_HEADER_CONTENT_LENGTH]: stats.size
    })
})

export default { path, routeHandler }
