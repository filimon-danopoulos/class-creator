/// <reference path="../thirdparty/mocha/mocha.d.ts" />
/// <reference path="../app/contracts/index.d.ts" />


import assert = require("assert");
import JsonParser = require("../app/parsers/JsonParser");

describe("JsonParser", function() {
    var parser = new JsonParser();
    describe("parse", function() {
        it("should return the same json that is input to it", function() {
            var input:{[key:string]:any} = {
                "_test": "test",
                "test": 1, 
                "Test": ["array"],
                "TEST": {
                    "test2": "test"
                }  
            };
            var result = parser.parse(input);

            assert(JSON.stringify(input) === JSON.stringify(result));
        });
    });
});
