var assert = require("assert");
var StandardTokenizerHelper = require("../app/tokenizers/StandardTokenizerHelper").StandardTokenizerHelper;

describe("StandardTokinezerHelper", function() {
    var helper = new StandardTokenizerHelper();
    describe("getAccessor", function() {
        it("should return private if first char is _", function() {
            var result = helper.getAccessor("_test");
            assert(result === "private");
        });
        it("should return public if first char is not _", function() {
           var result = helper.getAccessor("test");
           assert(result === "public"); 
        });
    });
    describe("getConstruct", function() { 
        it("should return constant when all chars are upper case", function() {
            var result = helper.getConstruct("TEST");
            assert(result === "constant");
        }); 
        it("should return constant when first char is _ and all other chars are upper case", function() {
            var result = helper.getConstruct("TEST");
            assert(result === "constant");
        });
        it("should return field when first char is lower case", function() {
            var result = helper.getConstruct("test");
            assert(result === "field");
        });
        it("should return field when first char is _ followed by lower case letter", function() {
            var result = helper.getConstruct("_test");
            assert(result === "field");
        });
        it("should return property when first char is upper case", function() {
            var result = helper.getConstruct("Test");
            assert(result === "property");
        });
        it("should return property when first char is _ followed upper case", function() {
            var result = helper.getConstruct("_Test");
            assert(result === "property");
        });
    });
    describe("getName", function() {
        it("should return all upper case when input is all upper case", function() {
            var result = helper.getName("TEST");
            assert(result === "TEST");
        });
        it("should return all upper case without a leading _ when input starts with _ followed by all upper case", function() {
            var result = helper.getName("_TEST");
            assert(result === "TEST");
        });
        it("should return string with leading upper case when input has leading upper case", function() {
            var result = helper.getName("Test");
            assert(result === "Test");
        });
        it("should return string with leading upper case input starts with _ and is followed by upper case", function() {
            var result = helper.getName("_Test");
            assert(result === "Test");
        });
        it("should return string with leading lower case when input has leading lower case", function() {
            var result = helper.getName("test");
            assert(result === "test");
        });
        it("should return string with leading lower case when input starts with _ and is followed by lower case", function() {
            var result = helper.getName("_test");
            assert(result === "test");
        });
    });
    describe("getType", function() {
        it("should return integer for an integer", function() {
            var result = helper.getType("test", 4);
            assert(result === "integer");
        });
        it("should return float for a string value that is a number with a decimal", function() {
            var result = helper.getType("test", "4.0");    
            assert(result === "float");
        });
        it("should return string for a non-numeric string", function() {
            var result = helper.getType("test", "test");
            assert(result === "string");    
        });
        it("should return array for an array", function() {
            var result = helper.getType("test", ["test"]);    
            assert(result === "array");
        });
        it("should return an object name when an object is passed", function() {
            var result = helper.getType("test", {});
            assert(result === "test");
        }); 
    });
});
  
