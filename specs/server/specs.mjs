"use strict"

import expose from "./expose.js"
import fs from "fs"
import Mocha from "mocha"
import path from "path"
import util from "util"

const { __dirname } = expose
const { readdir } = fs
const { extname, resolve:resolvePath } = path
const { promisify } = util

const main = async () => {
    const mocha = new Mocha({ reporter: "list" })

    const files = (await promisify(readdir)(resolvePath(__dirname, "./src")))
                  .map(file => resolvePath(__dirname, `./src/${file}`))
                  .forEach(file => mocha.addFile( file ))

    const start = process.memoryUsage().heapTotal / 1024 / 1024

    return new Promise(resolve => {
        mocha.run(failures => {
            process.on("exit", e => {
                const end = process.memoryUsage().heapTotal / 1024 / 1024
                console.log("memory usage", start, "=>", end, "(mb)")
            })

            process.exit(failures)
        })
    }).catch(e => console.error(e))
}

main()
