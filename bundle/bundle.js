"use strict"

const {
    APPNAME, APP_USER_PATH, APP_TMP_PATH
  , JS, CSS
  , CLIENT, COMPONENTS, SHARED_ROUTES
  , CWD
  , JSDOC, JSDOC_CONF
  , MINIFY
  , NODE_ENV
  , WATCH
} = process.env

const { basename, dirname, isAbsolute:isAbsoluePath, join:joinPath, relative:relativePath, resolve:resolvePath } = require("path")
const CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin")
const substitution = require("./substitution")
const UglifyJsPlugin = require("webpack/lib/optimize/UglifyJsPlugin")
const WatchCBPlugin = require("./WatchCBPlugin")
const webpack = require("webpack")

const entry = {
    seithr: resolvePath(CWD, "./lib/index.js")
}

const main = async cb => {
    const config = {
        context: CWD
      , devtool: "source-map"
      , entry
      , watch: eval(WATCH), watchOptions: { aggregateTimeout:200 }

      , output: {
            path: APP_USER_PATH
          , filename: "[name].js"
        }

      , module: {
            rules: [
                {
                    test: /\.txt|\.svg|\.csv$/
                  , use: { loader: "raw-loader" }
                }
              , {
                    test:  /\.js|\.mjs|\.es6$/
                  , use: {
                        loader: "babel-loader"
                      , options: {
                            cacheDirectory: true
                          , presets: [
                                "react"
                              , ["env", {
                                    targets: {
                                        browsers: ["last 2 versions"]
                                    }
                                }]
                              , "stage-0" // ec39 proprosals
                            ]
                          , plugins: []
                        }
                    }
                }
            ]
        }

      , plugins: [
              WATCH && new WatchCBPlugin(cb)
            , new webpack.DefinePlugin(substitution)
            , eval(MINIFY) && new UglifyJsPlugin({ sourceMap: true, uglifyOptions: { ecma:8 } })
        ].filter(v => !!v)

    }

    webpack(config, (err, stats) => {
        const errors = (err || stats.hasErrors()) && [err, ...(stats.compilation.errors||[])].filter(v => !!v)
        cb(errors, stats)
    })

}

main((errors, stats) => {
    console.log("bundle ok")
})
.catch(e => console.error(e))

console.log(`bundler started (${process.pid})`)
process.once("exit", () => console.log(`bundler exiting (${process.pid})`))
process.once("SIGINT", () => process.exit())
process.once("SIGTERM", () => process.exit())
process.title = `${APPNAME}--bundler`
