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

export const path = [/^GET\/samples\/(.*)$/]
export const routeHandler = async ({ httpstream, headers, flag, match }) => new Promise(async (resolve) => {
    const fd = await promisify(open)(resolvePath(__dirname, "./samples", `./${match[0][0]}`), "r")
    const stats = await promisify(fstat)(fd)

    httpstream.once("close", () => resolve(1))
    httpstream.respondWithFD(fd, {
        [HTTP2_HEADER_STATUS]: 200
      , [HTTP2_HEADER_CONTENT_TYPE]: "application/javascript"
      , [HTTP2_HEADER_CONTENT_LENGTH]: stats.size
    })
})

export default { path, routeHandler }
