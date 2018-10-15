"use strict"

const { name } = require("./package")

const setLog = async () => {
    const log = require("npmlog")
    log.heading = `${name}#${process.pid}`
    log.headingStyle = { bg: "red", fg: "black", bold: "true" }
    log.prefixStyle = { bg: "black", fg: "red" }
    log.level = eval(process.env.config_npm_silent) ? "silent" : "silly"

    return log
}

const main = async () => {
    const log = await setLog()

    log.silly("bootstrap", "start")
    require("@babel/polyfill")
    require("@babel/register")({
        presets: [
            ["@babel/preset-env", {
                targets: { node: "current" }
            }]
        ]
      , plugins: [
          // Stage 0
          "@babel/plugin-proposal-function-bind",

          // Stage 1
          "@babel/plugin-proposal-export-default-from",
          "@babel/plugin-proposal-logical-assignment-operators",
          ["@babel/plugin-proposal-optional-chaining", { "loose": false }],
          ["@babel/plugin-proposal-pipeline-operator", { "proposal": "minimal" }],
          ["@babel/plugin-proposal-nullish-coalescing-operator", { "loose": false }],
          "@babel/plugin-proposal-do-expressions",

          // Stage 2
          ["@babel/plugin-proposal-decorators", { "legacy": true }],
          "@babel/plugin-proposal-function-sent",
          "@babel/plugin-proposal-export-namespace-from",
          "@babel/plugin-proposal-numeric-separator",
          "@babel/plugin-proposal-throw-expressions",

          // Stage 3
          // "@babel/plugin-syntax-dynamic-import",
          // "@babel/plugin-syntax-import-meta",
          "babel-plugin-dynamic-import-node"
        , ["@babel/plugin-proposal-class-properties", { "loose": false }],
          "@babel/plugin-proposal-json-strings"
        ]
    })
    log.silly("bootstrap", "OK")

    require("./src/main/App").main()
}

main()
