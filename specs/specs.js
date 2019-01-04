"use strict"

import { createReadStream } from "fs"
import log from "npmlog"
import mime from "mime"
import { parse as parseURL } from "url"
import { promisify } from "util"
import { resolve as resolvePath } from "path"
import { Server } from "http"
import { stat } from "fs"

export default async () => new Promise(resolve => {
    const server = new Server

    server.on("request", async (request, response) => {
        const pathname = parseURL(request.url).pathname
        const parts = pathname.split("/").filter(v => !!v)
        const type = parts.shift()
        const filepath = `./${parts.join("/")}`

        let path
        switch(type){
            case "chai":
                path = resolvePath(process.env.CWD, "./node_modules/chai", filepath)
                break
            case "favicon.ico":
                path = resolvePath(process.env.CWD, "./seithr.ico")
                break
            case "mocha":
                path = resolvePath(process.env.CWD, "./node_modules/mocha", filepath)
                break
            case "seithr":
                path = resolvePath(process.env.APP_USER_DIR, filepath)
                break
            default:
                path = resolvePath(process.env.CWD, "./specs/html/index.html")
                break
        }
        log.http(`<= ${request.url} [path to file: ${path}]`)

        try {
            const stats = await promisify(stat)(path)

            if ( !stats || stats.isDirectory() )
              throw new Error("unexisting file")

            const type = mime.getType(path)

            log.http("to serve", path)
            response.writeHead(200, {
                "content-type": type
              , "content-length": stats.size
            })

            return createReadStream(path).pipe(response)
        } catch(e) {
            log.http("unable to serve", path)
            response.writeHead(404, {
                "content-type": "text/plain"
              , "content-length": e.message.length
            })
            return response.end(e.message)
        }
    })

    server.once("listening", () => resolve(server.address()))
    server.listen(+process.env.npm_package_config_port||0)
})
