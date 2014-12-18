// <reference path="./contracts/index.d.ts"/>

import StandardTokenizerHelper = require("./StandardTokenizerHelper");

class StandardTokenizer implements ITokenizer {
    constructor() {
        this.helper = new StandardTokenizerHelper();
    }
    tokenize(input: any) {
        var result = [];
        for (var propertyName in input) {
            if (input.hasOwnProperty(propertyName)) {
                var property;
                property = input[propertyName];
                result.push({
                    accessor: this.helper.getAccessor(propertyName),
                    type: this.helper.getType(propertyName, property),
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
