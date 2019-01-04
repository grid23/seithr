"use strict"

import { ERR_CSSTEXT } from "errors"
import CSSConditionalRule from "css/CSSConditionalRule"

const rconditional = /^\@media([^\{]*)\{(.*)\}/i
export default class CSSMediaRule extends CSSConditionalRule {
    constructor(condition = ""){
        if ( !rconditional.exec(condition) )
          throw new TypeError(ERR_CSSTEXT)

        super(condition)
    }
}
