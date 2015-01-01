// <reference path="../thirdparty/mocha/mocha.d.td" />
// <reference path="../app/contracts/index.d.ts" />
var assert = require("assert");
var StandardTokenizerHelper = require("../app/tokenizers/StandardTokenizerHelper");
describe("StandardTokinezerHelper", function () {
    var helper = new StandardTokenizerHelper();
    describe("getAccessor", function () {
        it("should return private if first char is _", function () {
            var result = helper.getAccessor("_test");
            assert(result === "private");
        });
        it("should return public if first char is not _", function () {
            var result = helper.getAccessor("test");
            assert(result === "public");
        });
    });
    describe("getConstruct", function () {
        it("should return constant when all chars are upper case", function () {
            var result = helper.getConstruct("TEST");
            assert(result === "constant");
        });
        it("should return constant when first char is _ and all other chars are upper case", function () {
            var result = helper.getConstruct("TEST");
            assert(result === "constant");
        });
        it("should return field when first char is lower case", function () {
            var result = helper.getConstruct("test");
            assert(result === "field");
        });
        it("should return field when first char is _ followed by lower case letter", function () {
            var result = helper.getConstruct("_test");
            assert(result === "field");
        });
        it("should return property when first char is upper case", function () {
            var result = helper.getConstruct("Test");
            assert(result === "property");
        });
        it("should return property when first char is _ followed upper case", function () {
            var result = helper.getConstruct("_Test");
            assert(result === "property");
        });
    });
    describe("getName", function () {
        it("should return all upper case when input is all upper case", function () {
            var result = helper.getName("TEST");
            assert(result === "TEST");
        });
        it("should return all upper case without a leading _ when input starts with _ followed by all upper case", function () {
            var result = helper.getName("_TEST_CASE");
            assert(result === "TEST_CASE");
        });
        it("should return string with leading upper case when input has leading upper case", function () {
            var result = helper.getName("Test");
            assert(result === "Test");
        });
        it("should return string with leading upper case input starts with _ and is followed by upper case", function () {
            var result = helper.getName("_Test");
            assert(result === "Test");
        });
        it("should return string with leading lower case when input has leading lower case", function () {
            var result = helper.getName("test");
            assert(result === "test");
        });
        it("should return string with leading lower case when input starts with _ and is followed by lower case", function () {
            var result = helper.getName("_test");
            assert(result === "test");
        });
    });
    describe("getType", function () {
        it("should return integer for an integer", function () {
            var result = helper.getType("test", 4);
            assert(result === "integer");
        });
        it("should return float for a string value that is a number with a decimal", function () {
            var result = helper.getType("test", "4.0");
            assert(result === "float");
        });
        it("should return string for a non-numeric string", function () {
            var result = helper.getType("test", "test");
            assert(result === "string");
        });
        it("should return boolean for a boolean", function () {
            var result = helper.getType("test", true);
            assert(result === "boolean");
        });
        it("should return array for an array", function () {
            var result = helper.getType("test", ["test"]);
            assert(result === "array");
        });
        it("should return an object name when an object is passed", function () {
            var result = helper.getType("test", {});
            assert(result === "test");
        });
        it("should return a custom class name without a leading _ an object is passed that has a leading _ in the name.", function () {
            var result = helper.getType("_TEST", {});
            assert(result === "TEST");
        });
    });
    describe("getTokensForObject", function () {
        it("should return the same number of tokens as there are properties", function () {
            var result = helper.getTokensForObject({
                test: "test",
                test2: "test"
            });
            assert(result.length === 2);
        });
        it("should return the right tokens for an object", function () {
            var input = {
                stringField: "Test",
                _privateFloatField: "4.0",
                IntProperty: 4,
                _PrivateBoolProperty: true,
                ARRAY_CONSTANT: [],
                _PRIVATE_OBJECT_CONSTANT: {}
            }, result = helper.getTokensForObject(input), expected = [{
                name: "stringField",
                type: "string",
                construct: "field",
                accessor: "public"
            }, {
                name: "privateFloatField",
                type: "float",
                construct: "field",
                accessor: "private"
            }, {
                name: "IntProperty",
                type: "integer",
                construct: "property",
                accessor: "public"
            }, {
                name: "PrivateBoolProperty",
                type: "boolean",
                construct: "property",
                accessor: "private"
            }, {
                name: "ARRAY_CONSTANT",
                type: "array",
                construct: "constant",
                accessor: "public"
            }, {
                name: "PRIVATE_OBJECT_CONSTANT",
                type: "PRIVATE_OBJECT_CONSTANT",
                construct: "constant",
                accessor: "private"
            }];
            assert(JSON.stringify(result) === JSON.stringify(expected));
        });
    });
    describe("getObjects", function () {
        it("should return nothing when no nested classes exist", function () {
            var input = { test: "test" }, result = helper.getObjects(input);
            assert(result.length === 0);
        });
        it("should return a result of length N when the input has N nested objects", function () {
            var input = {
                shouldNotBeReturned: "test",
                shouldBeReturned1: {},
                shouldBeReturned2: {
                    shoudlNotBeReturned: "test"
                }
            }, result = helper.getObjects(input);
            assert(result.length === 2);
        });
        it("should return all nested objects from the input", function () {
            var input = {
                shouldNotBeReturned: "test",
                shouldBeReturned1: {},
                shouldBeReturned2: {
                    shoudlNotBeReturned: "test"
                }
            }, result = helper.getObjects(input);
            assert(result.length === 2);
            assert(result[0].name === "shouldBeReturned1");
            assert(result[1].name === "shouldBeReturned2");
        });
        it("should return all the objects from the input, regardless of nesting", function () {
            var input = {
                shouldNotBeReturned: "test",
                shouldBeReturned1: {
                    shouldBeReturned2: {
                        shouldBeReturned3: {}
                    },
                    shouldNotBeReturned: "test"
                },
                shouldBeReturned4: {
                    shoudlNotBeReturned: "test"
                }
            }, result = helper.getObjects(input);
            assert(result.length === 4);
            assert(result[0].name === "shouldBeReturned1");
            assert(result[1].name === "shouldBeReturned2");
            assert(result[2].name === "shouldBeReturned3");
            assert(result[3].name === "shouldBeReturned4");
        });
    });
});
