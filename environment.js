"use strict"

import { dirname, resolve as resolvePath } from "path"
import { execSync } from "child_process"
import { arch, homedir, platform, release, tmpdir } from "os"
import { name as APPNAME, version as APPVERSION } from "./package"

const argv = new Set(process.argv.slice(2))
const CWD = resolvePath(process.cwd(), dirname(process.mainModule.filename))

export const WSL = platform() == "linux" && release().includes("Microsoft")
export const HOME_DIR = WSL
           ? execSync("cmd.exe /c echo %USERPROFILE% | sed 's/\\\\/\\//g' | sed 's/^.:/\\/mnt\\/c/' | sed 's/\\r//g' | tr -d '\n'").toString()
           : homedir()
export const TMP_DIR = WSL
          ? execSync("cmd.exe /c echo %TEMP% | sed 's/\\\\/\\//g' | sed 's/^.:/\\/mnt\\/c/' | sed 's/\\r//g' | tr -d '\n'").toString()
          : tmpdir()


export { APPNAME, APPVERSION }
export const APP_USER_DIR = resolvePath(HOME_DIR, `./.${APPNAME.toLowerCase()}`)
export const APP_TMP_DIR = resolvePath(TMP_DIR, `./.${APPNAME.toLowerCase()}`)
export const BUNDLE = argv.has("--bundle")
export { CWD }
export const DEBUG = argv.has("--debug")
export const DIST = process.env.NODE_ENV === "production"
export const TEST = argv.has("--test")
export const WATCH = argv.has("--watch")
