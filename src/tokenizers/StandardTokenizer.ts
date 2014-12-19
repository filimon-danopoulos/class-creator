// <reference path="./contracts/index.d.ts"/>

import StandardTokenizerHelper = require("./StandardTokenizerHelper");
import Token = require("./Token");

class StandardTokenizer implements ITokenizer {
    constructor() {
        this.helper = new StandardTokenizerHelper();
    }
    tokenize(rawInput: any): ITokenizerResult[] {
        var result: ITokenizerResult[] = [];        
        var input = {
            rootClass: rawInput
        };
        var objects = getObjects(input);
        for (var i = 0, l = objects.length; i < l; i++) {
            result.push(getTokensForObject(this.helper, objects[i]));
        }

        return result; 
    }
    helper: ITokenizerHelper;
}

function getObjects(input: any): any[] {
    var result = [];
    var keys = Object.keys(input);
    for(var i = 0, l = keys.length; i < l; i++) {
		var key = keys[i];
		var value = input[key];
        if (typeof value === "object" && !Array.isArray(value)) {
            result.push({name: key, value: value});
            result = result.concat(getObjects(value));
        }
    }
    return result;
}

function getTokensForObject(helper: ITokenizerHelper, input: any): ITokenizerResult {
    var result = {
        className: input.name,
        tokens: []
    }
    var value = input.value;
    for (var propertyName in value) {
        if (value.hasOwnProperty(propertyName)) {
            var property = value[propertyName];
            result.tokens.push(new Token(
                helper.getName(propertyName),
                helper.getType(propertyName, property),
                helper.getConstruct(propertyName),
                helper.getAccessor(propertyName)
            ));
        }
    }
    return result;
} 

export = StandardTokenizer;
