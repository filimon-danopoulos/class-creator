/// <reference path="../thirdparty/mocha/mocha.d.ts" />
/// <reference path="../lib/contracts/index.d.ts" />
 
import assert = require("assert");

import CsharpCodeService = require("../lib/services/CsharpCodeService");
import JsonParser = require("../lib/parsers/JsonParser");
import StandardTokenizer = require("../lib/tokenizers/StandardTokenizer");

describe("CsharpCodeService", function() {
    var service = new CsharpCodeService(
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
                    "public class RootClass {",
                        "public string testString;",
                        "private int testInt;",
                        "public static readonly bool TEST_BOOL;",
                        "private object[] TestArray { get; set; }",
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
                "public class RootClass {",
                    "public int IntTest { get; set; }",
                    "private string stringTest;",
                    "public static readonly float CONSTANT_TEST;",
                    "public NestedTypeTest nestedTypeTest;",
                    "public object[] array;",
                    "private static readonly bool PRIVATE_BOOL_CONST;",
                 "}",
                 "public class NestedTypeTest {",
                    "private string NestedString { get; set; }",
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
                "public class RootClass {",
                    "public string testString;",
                    "private int testInt;",
                    "public static readonly bool TEST_BOOL;",
                    "private object[] TestArray { get; set; }",
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
                "public class RootClass {",
                    "public int IntTest { get; set; }",
                    "private string stringTest;",
                    "public static readonly float CONSTANT_TEST;",
                    "public NestedTypeTest nestedTypeTest;",
                    "public object[] array;",
                    "private static readonly bool PRIVATE_BOOL_CONST;",
                 "}"].join(""),
                 ["public class NestedTypeTest {",
                    "private string NestedString { get; set; }",
                 "}"].join("")
            ];
            assert(JSON.stringify(result) === JSON.stringify(expected));
    
        });
    })
});
