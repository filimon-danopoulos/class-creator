var assert = require("assert");

describe("jsonParser", function() {
    "use strict";
    var jsonParser = require("../app/parsers/jsonParser");
    describe("parse", function() {      
        it("should return a private constant when property is all upper case and starts with a _", function() {
            var input = { _TEST: "test" },
                result = jsonParser.parse(input);
                
            assert(result.length === 1);
            assert(result[0].accessor === "private");
            assert(result[0].construct === "constant");
        });
        it("should return a public constant when property is all upper case", function() {
            var input = { TEST: "test" },
                result = jsonParser.parse(input);
                
            assert(result.length === 1);
            assert(result[0].accessor === "public");
            assert(result[0].construct === "constant");
        });       
        it("should return a private field when property starts with _ and lower case letter", function() {
            var input = { _test: "test" },
                result = jsonParser.parse(input);
                
            assert(result.length === 1);
            assert(result[0].accessor === "private");
            assert(result[0].construct === "field");
        });
        it("should return a public field when property starts with an lower case letter", function() {
            var input = { test: "test" },
                result = jsonParser.parse(input);
                
            assert(result.length === 1);
            assert(result[0].accessor === "public");
            assert(result[0].construct === "field");
        });
        it("should return a private property when property starts with _ and upper case letter", function() {
            var input = { _Test: "test" },
                result = jsonParser.parse(input);
                
            assert(result.length === 1);
            assert(result[0].accessor === "private");
            assert(result[0].construct === "property");
        });
        it("should return a public field for when property starts with an upper case letter", function() {
            var input = { Test: "test" },
                result = jsonParser.parse(input);
                
            assert(result.length === 1);
            assert(result[0].accessor === "public");
            assert(result[0].construct === "property");
        });
    });
    describe("helpers", function() {
        describe("getAccessor", function() {
            it("should return private if first char is _", function() {
                var result = jsonParser.helpers.getAccessor("_test");
                assert(result === "private");
            });
            it("should return public if first char is not _", function() {
               var result = jsonParser.helpers.getAccessor("test");
               assert(result === "public"); 
            });
        });
        describe("getConstruct", function() { 
            it("should return constant when all chars are upper case", function() {
                var result = jsonParser.helpers.getConstruct("TEST");
                assert(result === "constant");
            }); 
            it("should return constant when first char is _ and all other chars are upper case", function() {
                var result = jsonParser.helpers.getConstruct("TEST");
                assert(result === "constant");
            });
            it("should return field when first char is lower case", function() {
                var result = jsonParser.helpers.getConstruct("test");
                assert(result === "field");
            });
            it("should return field when first char is _ followed by lower case letter", function() {
                var result = jsonParser.helpers.getConstruct("_test");
                assert(result === "field");
            });
            it("should return property when first char is upper case", function() {
                var result = jsonParser.helpers.getConstruct("Test");
                assert(result === "property");
            });
            it("should return property when first char is _ followed upper case", function() {
                var result = jsonParser.helpers.getConstruct("_Test");
                assert(result === "property");
            });
        });
        describe("getName", function() {
            it("should return all upper case when input is all upper case", function() {
                var result = jsonParser.helpers.getName("TEST");
                assert(result === "TEST");
            });
            it("should return all upper case without a leading _ when input starts with _ followed by all upper case", function() {
                var result = jsonParser.helpers.getName("_TEST");
                assert(result === "TEST");
            });
            it("should return string with leading upper case when input has leading upper case", function() {
                var result = jsonParser.helpers.getName("Test");
                assert(result === "Test");
            });
            it("should return string with leading upper case input starts with _ and is followed by upper case", function() {
                var result = jsonParser.helpers.getName("_Test");
                assert(result === "Test");
            });
            it("should return string with leading lower case when input has leading lower case", function() {
                var result = jsonParser.helpers.getName("test");
                assert(result === "test");
            });
            it("should return string with leading lower case when input starts with _ and is followed by lower case", function() {
                var result = jsonParser.helpers.getName("_test");
                assert(result === "test");
            });
        });
    });
});
