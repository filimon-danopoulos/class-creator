// <reference path="./contracts/index.d.ts"/>

import StandardTokenizerHelper = require("./StandardTokenizerHelper");

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
            result.push(this.helper.getTokensForObject(objects[i]));
        }

        return result; 
    }
    helper: ITokenizerHelper;
}


export = StandardTokenizer;
