"use strict"

const { dirname, resolve:resolvePath, join:joinPath } = require("path")
const { fork } = require("child_process")
const watch = require("glob-watcher")

const config = async () => new Promise(resolve => {
    const config = require("./config")

    Object.keys(config)
      .forEach(variable => process.env[variable.toUpperCase()] = config[variable])

    resolve()
})

const bundle = async () => {
    const file = process.env["BUNDLER"]
    let cp
    const start = async () => {
        if ( cp )
          cp.kill()

        cp = fork(file, process.argv.slice(2), { env: process.env })
        process.addListener("SIGINT", () => cp.kill())

        return cp
    }

    watch([`${dirname(file)}/**/*.js`], start)
    await start()
}

const test = async () => {
    const file = process.env["SPECS"]
    let cp
    const start = async () => {
        if ( cp )
          cp.kill()

        cp = fork(file, process.argv.slice(2), { env: process.env })
        process.addListener("SIGINT", () => cp.kill())

        return cp
    }

    watch([`${dirname(file)}/**/*.js`], start)
    await start()
}

const main = async () => {
    process.addListener("exit", code => console.log(`app exiting (${process.pid})`))
    process.addListener("SIGINT", () => process.exit(0))
    process.addListener("SIGTERM", () => process.exit(0))
    await config()
    const { APPNAME } = process.env

    await bundle()
    await test()
}

main()
  .catch(e => console.error(e))
