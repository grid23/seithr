"use strict"

import log from "npmlog"
import { resolve as resolvePath } from "path"

const setEnv = async () => {
    const env = await import("env")

    log.verbose("setEnv()")
    Object.keys(env)
      .forEach(variable => {
          process.env[variable] = env[variable]
          log.silly(`set env variable ${variable}`, process.env[variable])
      })
    log.silly("setEnv()", "OK")
}

const bundle = async () => {
    log.verbose("bundle()")
    const { default:bundler } = await import(resolvePath(process.env.CWD, "./bundle/bundle"))
    await bundler()
    log.silly("bundle", "OK")
}

const test = async () => {
    log.verbose("test()")
    const { default:suite } = await import(resolvePath(process.env.CWD, "./specs/specs"))
    const { port } = await suite()
    log.verbose("test server listening at", `http://localhost:${port}`)
}

const main = async () => {
    log.silly("main()")

    await setEnv()

    if ( JSON.parse(process.env.BUNDLE) )
      await bundle()
    if ( JSON.parse(process.env.TEST) )
      await test()

    log.silly("main()", "OK")
}

main()
  .catch(e => console.error(e))
