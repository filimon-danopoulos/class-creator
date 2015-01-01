// <reference path="./contracts/index.d.ts"/>

import StandardTokenizerHelper = require("./StandardTokenizerHelper");
import TokenizerResult = require("./TokenizerResult");

class StandardTokenizer implements ITokenizer {
    constructor() {
        this.helper = new StandardTokenizerHelper();
    }
    tokenize(rawInput: any): ITokenizerResult[] {
        var result: ITokenizerResult[] = [];        
        var input = {
            rootClass: rawInput
        };
        var objects = this.helper.getObjects(input);
        for (var i = 0, l = objects.length; i < l; i++) {
            var current = objects[i];
            result.push(new TokenizerResult(current.name, this.helper.getTokensForObject(current.value)));
        }

        return result; 
    }
    helper: ITokenizerHelper;
}


export = StandardTokenizer;
