"use strict"

const { dirname, resolve:resolvePath } = require("path")
const { exec, spawn } = require('child_process')
const log = require("npmlog")
const { name } = require("./package")
const { promisify } = require("util")
const { stat } = require("fs")

const argv = new Set(process.argv.slice(2))
const cwd = resolvePath(process.cwd(), dirname(process.mainModule.filename))

// define basic options for npmlog logger
// options may/will be re-set later to reflect env settings
const setLog = async () => {
    log.heading = `${name}#${process.pid}`
    log.headingStyle = { bg: "red", fg: "white", bold: "true" }
    log.prefixStyle = { bg: "red", fg: "black" }
    log.level = process.env.npm_package_config_log_level || "silly"
    log.info("log level", log.level)
}

const main = async () => {
    await setLog()
    log.verbose("bootstrap")
    require("core-js/stable")
    require("regenerator-runtime/runtime")
    require("@babel/register")({
        presets: [
            ["@babel/preset-env", {
                spec: true
              , targets: { node: "current" }
              , corejs: 3
              , useBuiltIns: "entry"
            }]
        ]
      , plugins: [
          // Stage 0
          "@babel/plugin-proposal-function-bind",

          // Stage 1
          "@babel/plugin-proposal-export-default-from",
          "@babel/plugin-proposal-logical-assignment-operators",
          ["@babel/plugin-proposal-optional-chaining", { "loose": false }],
          ["@babel/plugin-proposal-nullish-coalescing-operator", { "loose": false }],
          "@babel/plugin-proposal-do-expressions",

          // Stage 2
          ["@babel/plugin-proposal-decorators", { "legacy": false, "decoratorsBeforeExport": true }],
          "@babel/plugin-proposal-function-sent",
          "@babel/plugin-proposal-export-namespace-from",
          "@babel/plugin-proposal-throw-expressions",

          // Stage 3
          "babel-plugin-dynamic-import-node",
          ["@babel/plugin-proposal-class-properties", { "loose": false }],
          "@babel/plugin-proposal-json-strings",
          ["module-resolver", {
              cwd
            , "alias": {
                  "env": resolvePath(cwd, "./environment.js")
              }
          }]
        ]
    })

    log.silly("bootstrap", "OK")
    require("./app")
}

main()
