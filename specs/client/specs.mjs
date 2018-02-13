"use strict"

import http2 from "http2"
import fs from "fs"
import util from "util"
import routes from "./routes"
import expose from "./expose"
import path from "path"

const {
    constants: {
        HTTP2_HEADER_METHOD
      , HTTP2_HEADER_PATH
      , HTTP2_HEADER_STATUS
      , HTTP2_HEADER_CONTENT_TYPE
    }
  , createSecureServer
} = http2
const { readdir, readFile } = fs
const { promisify } = util
const { __dirname } = expose
const { resolve:resolvePath } = path

const startServer = async () => Promise.all([
    promisify(readFile)(resolvePath(__dirname, "../../.tls/server.key"), "utf8")
  , promisify(readFile)(resolvePath(__dirname, "../../.tls/server.crt"), "utf8")
]).then(([ key, cert ]) => new Promise(async (resolve) => {
    const server = createSecureServer ({ key, cert })
    server.on("stream", async (httpstream, headers, flag) => {
        const route = `${headers[HTTP2_HEADER_METHOD].toUpperCase()}${headers[HTTP2_HEADER_PATH]}`
        console.log("<=", route)
        let hit = 0

        loop: for ( const { path, routeHandler:handler } of routes ) {
            const match = path.map(v => route.match(v))
                              .filter(v => !!v)
                              .map(v => v.slice(1))

            console.log(`\t ${path} => `, match, match && match.length)
            if ( match.length )
              try {
                  const response = await handler({ httpstream, headers, flag, match })

                  if ( response > 0 )
                    hit += 1
                  if ( response == 1 )
                    break loop
                  continue loop
              } catch(e) {
                  console.error(e)
                  continue loop
              }
        }

        if ( !hit )
          httpstream.respond({
            [HTTP2_HEADER_STATUS]: 404,
            [HTTP2_HEADER_CONTENT_TYPE]: "text/plain"
          }),
          httpstream.end("404")
    })


    server.on("error", async (e) => console.error(e))
    server.once("listening", () => resolve(server))
    server.listen(1337)
}))

const main = async () => {
    const server = await startServer()
    console.log(`---\n\t access test suite at https://localhost:1337\n---`)
}
main()
