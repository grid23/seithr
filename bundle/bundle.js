"use strict"

import log from "npmlog"
import substitution from "./substitution"
import UglifyJsPlugin from "uglifyjs-webpack-plugin"
import { resolve as resolvePath } from "path"
import webpack from "webpack"

export default async () => new Promise(resolve => {
    const alias = {
        cookies: resolvePath(process.env.CWD, "./lib/cookies")
      , css: resolvePath(process.env.CWD, "./lib/css")
      , decorators: resolvePath(process.env.CWD, "./lib/decorators")
      , env: resolvePath(process.env.CWD, "./lib/env")
      , errors: resolvePath(process.env.CWD, "./lib/errors")
      , events: resolvePath(process.env.CWD, "./lib/events")
      , models: resolvePath(process.env.CWD, "./lib/models")
      , nodes: resolvePath(process.env.CWD, "./lib/nodes")
      , routing: resolvePath(process.env.CWD, "./lib/routing")
      , seithr: resolvePath(process.env.CWD, "./lib")
      , serializers: resolvePath(process.env.CWD, "./lib/serializers")
      , store: resolvePath(process.env.CWD, "./lib/store")
      , uids: resolvePath(process.env.CWD, "./lib/uids")
      , utils: resolvePath(process.env.CWD, "./lib/utils")
      , views: resolvePath(process.env.CWD, "./lib/views")
    }

    const entry = process.env.TEST
    ? { "suite": resolvePath(process.env.CWD, "./specs/suite/index") }
    : { "seithr": resolvePath(process.env.CWD, "./lib/index") }

    const config = {
        context: process.env.CWD

      , devtool: "source-map"

      , entry

      , externals: [
        ]

      , module: {
            rules: [
                {
                    test: /\.js$/
                  , use: {
                        loader: "babel-loader"
                      , options: {
                            cacheDirectory: true
                          , presets: [
                                ["@babel/preset-env", { targets: { browsers: ["last 2 versions", "ie 11"] } }]
                            ]
                          , plugins: [
                            // Stage 0
                                "@babel/plugin-proposal-function-bind"

                            // Stage 1
                              , "@babel/plugin-proposal-export-default-from"
                              , "@babel/plugin-proposal-logical-assignment-operators"
                              , ["@babel/plugin-proposal-optional-chaining", { "loose": false }]
                              , ["@babel/plugin-proposal-pipeline-operator", { "proposal": "minimal" }]
                              , ["@babel/plugin-proposal-nullish-coalescing-operator", { "loose": false }]
                              , "@babel/plugin-proposal-do-expressions"

                            // Stage 2
                              , ["@babel/plugin-proposal-decorators", { "legacy": false, "decoratorsBeforeExport": true }]
                              , "@babel/plugin-proposal-function-sent"
                              , "@babel/plugin-proposal-export-namespace-from"
                              , "@babel/plugin-proposal-numeric-separator"
                              , "@babel/plugin-proposal-throw-expressions"

                            // Stage 3
                              , "@babel/plugin-syntax-dynamic-import"
                              , "@babel/plugin-syntax-import-meta"
                              , ["@babel/plugin-proposal-class-properties", { "loose": false }]
                              , "@babel/plugin-proposal-json-strings"
                            ]
                        }
                    }
                }
            ]
        }

      , optimization: {
            minimizer: [
                JSON.parse(process.env.MINIFY) && new UglifyJsPlugin({
                    cache: true
                  , parallel: true
                  , sourceMap: true
                  , uglifyOptions: { ecma:8 }
                })
            ].filter(v => !!v)
       }

      , output: {
            filename: "[name].js"
          , path: process.env.APP_USER_DIR
          , library: process.env.TEST ? "suite" : "seithr"
          , libraryTarget: 'var'
        }

      , plugins: [
            new webpack.DefinePlugin(substitution)
        ].filter(v => !!v)

      , resolve: {
            alias
          , modules: [resolvePath(process.env.CWD, "./node_modules")]
        }

      , watch: JSON.parse(process.env.WATCH)
      , watchOptions: { aggregateTimeout: 200 }
    }

    let first = true
    let runs = 0
    webpack(config, async (error, {compilation:{errors, assets}}) => {
        runs += 1
        const alerts = [error, ...(errors||[])].filter(v => !!v)
        const files = Object.keys(assets).map(k => assets[k].existsAt)

        if ( alerts.length )
          log.warn(`bundle#${runs}`, `error(s) =>`),
          alerts.forEach(alert => log.error(alert))
        else
          log.info(`bundle#${runs}`, `no error => \n${files.join(`\n`)}`)

        if ( !first )
          return
        first = false

        resolve()
    })
})
