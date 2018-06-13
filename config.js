"use strict"

const argv = new Set( process.argv.slice(2) )
const { dirname, resolve:resolvePath, join:joinPath } = require("path")
const { homedir, tmpdir } = require("os")
const { name:appname } = require("./package.json")

console.log(process)
const cwd = resolvePath(process.cwd(), dirname(process.mainModule.filename))

module.exports = {
    ALIAS: resolvePath(cwd, "./bundle/alias.js")
  , APPNAME: appname
  , APP_USER_PATH: resolvePath(homedir(), `./${appname.toLowerCase()}`)
  , APP_TMP_PATH: resolvePath(tmpdir(), `./${appname.toLowerCase()}`)
  , BUNDLER: resolvePath(cwd, "./bundle/bundle.js")
  , CWD:cwd
  , DEBUG_MASK: [...argv].filter(v => v.indexOf("--debug=") == 0).map(v => v.split("=")[1])[0] || 0
  , HOMEDIR: homedir()
  , MINIFY: argv.has("--minify")
  , NODE_ENV: process.env.NODE_ENV || [...argv].filter(v => v.indexOf("--env=") == 0).map(v => v.split("=")[1])[0] || "dev"
  , SPECS: resolvePath(cwd, "./specs/specs.mjs")
  , TMPDIR: tmpdir()
  , VERBOSE: argv.has("--verbose")
  , WEBPACK: argv.has("--wp")
  , WATCH: module.exports.WATCH = argv.has("--watch")
}
