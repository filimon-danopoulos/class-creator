/// <reference path="../thirdparty/mocha/mocha.d.ts" />
/// <reference path="../lib/contracts/index.d.ts" />

import assert = require("assert");

import TypeScriptCodeService = require("../lib/services/TypeScriptCodeService");
import JsonParser = require("../lib/parsers/JsonParser");
import StandardTokenizer = require("../lib/tokenizers/StandardTokenizer");

describe("TypeScriptCodeService", function() {
    var service = new TypeScriptCodeService(
        new JsonParser(), 
        new StandardTokenizer()
    );
    describe("getCodeAsString", function() {
        it("should return a class when called with a single class", function() {
            var input:{[key:string]:any} = {
                    testString: "Test",
                    _testInt: 2,
                    TEST_BOOL: true,
                    _TestArray: []    
                }, 
                result = service.getCodeAsString(input).replace(/\n/g, ""),
                expected = [
                    "class RootClass {",
                        "public testString:string;",
                        "private testInt:number;",
                        "public static TEST_BOOL:boolean;",
                        "private TestArray:any[];",
                    "}"
                ].join("");
             assert(result === expected);
        });
        it("should return a single string containing all the classes when called with nested classes", function() {
            var input:{[key:string]:any} = {
                IntTest: 5,
                _stringTest: "test",
                CONSTANT_TEST: "4.0",
                nestedTypeTest: {
                    _NestedString: "test"
                },
                array: [],
                _PRIVATE_BOOL_CONST: true
            };
            var result = service.getCodeAsString(input).replace(/\n/g, "");
            var expected = [
                "class RootClass {",
                    "public IntTest:number;",
                    "private stringTest:string;",
                    "public static CONSTANT_TEST:number;",
                    "public nestedTypeTest:NestedTypeTest;",
                    "public array:any[];",
                    "private static PRIVATE_BOOL_CONST:boolean;",
                 "}",
                 "class NestedTypeTest {",
                    "private NestedString:string;",
                 "}"
            ].join("");
            assert(result === expected);
        });
    });
    describe("getCodeAsStrings", function() {
        it("should return an array of length one when called with a single class", function() {
            var input:{[key:string]:any} = {
                    Test: "test"
                },
                result = service.getCodeAsStrings(input);
            assert(result.length === 1);
        });
        it("should return an array that contains a single class when called with a single class", function() {
            var input:{[key:string]:any} = {
                testString: "Test",
                _testInt: 2,
                TEST_BOOL: true,
                _TestArray: []    
            }, 
            result = service.getCodeAsStrings(input).map(function(x) { return x.replace(/\n/g, "")}),
            expected = [[
                "class RootClass {",
                    "public testString:string;",
                    "private testInt:number;",
                    "public static TEST_BOOL:boolean;",
                    "private TestArray:any[];",
                "}"
            ].join("")];
            assert(JSON.stringify(result) === JSON.stringify(expected));
        });
        it("should return an array that contains all the classes from the input in separate strings", function() {
            var input:{[key:string]:any} = {
                IntTest: 5,
                _stringTest: "test",
                CONSTANT_TEST: "4.0",
                nestedTypeTest: {
                    _NestedString: "test"
                },
                array: [],
                _PRIVATE_BOOL_CONST: true
            };
            var result = service.getCodeAsStrings(input).map(function(x) { return x.replace(/\n/g, "")});
            var expected = [[
                "class RootClass {",
                    "public IntTest:number;",
                    "private stringTest:string;",
                    "public static CONSTANT_TEST:number;",
                    "public nestedTypeTest:NestedTypeTest;",
                    "public array:any[];",
                    "private static PRIVATE_BOOL_CONST:boolean;",
                 "}"].join(""),
                 ["class NestedTypeTest {",
                    "private NestedString:string;",
                 "}"].join("")
            ];
            assert(JSON.stringify(result) === JSON.stringify(expected));
    
        });
    })
});
