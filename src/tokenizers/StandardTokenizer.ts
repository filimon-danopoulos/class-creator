// <reference path="./contracts/index.d.ts"/>

import StandardTokenizerHelper = require("./StandardTokenizerHelper");
import Token = require("./Token");

class StandardTokenizer implements ITokenizer {
    constructor() {
        this.helper = new StandardTokenizerHelper();
    }
    tokenize(input: any) {
        var result = [];
        for (var propertyName in input) {
            if (input.hasOwnProperty(propertyName)) {
                var property = input[propertyName];
                var type = this.helper.getType(propertyName, property);
                result.push({
                    accessor: this.helper.getAccessor(propertyName),
                    type: type, 
                    construct: this.helper.getConstruct(propertyName),
                    name: this.helper.getName(propertyName)
                });
            }
        }
        return result;
    }
    helper: ITokenizerHelper;
}

export = StandardTokenizer;
