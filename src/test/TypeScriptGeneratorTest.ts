/// <reference path="../thirdparty/mocha/mocha.d.ts" />
/// <reference path="../app/contracts/index.d.ts" />

import assert = require("assert");
import TypeScriptGenerator = require("../app/generators/typescript/TypeScriptGenerator");

describe("TypeScriptGenerator", function () {
    var generator = new TypeScriptGenerator();
    describe("generate",  function() {
        it("should return a string representing a class, test 1", function() {
            var tokens = [{
                name: "Test", 
                type: "string", 
                construct: "property", 
                accessor: "public"
            }, {
                name: "stringTest", 
                type: "integer", 
                construct: "field", 
                accessor: "private"    
            }];
            var result = generator.generate("TestClass", tokens);
            var expected = [
                "class TestClass {",
                    "public Test:string;",
                    "private stringTest:number;",
                "}"
            ].join("\n");
            assert(result == expected);
        });
    });
});
