"use strict"

import { ERR_CSSTEXT } from "./error.mjs"
import CSSConditionalRule from "./CSSConditionalRule.mjs"

const rconditional = /^\@media([^\{]*)\{(.*)\}/i
export default class CSSMediaRule extends CSSConditionalRule {
    constructor(condition = ""){
        if ( !rconditional.exec(condition) )
          throw new TypeError(ERR_CSSTEXT)

        super(condition)
    }
}
