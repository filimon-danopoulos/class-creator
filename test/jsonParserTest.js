var assert = require("assert");

describe("jsonParser", function() {
    "use strict";
    var jsonParser = require("../parsers/jsonParser");
    describe("parse", function() {
        it("should return a constant when all letters are upper case", function() {
            var input = { TEST: "test"},
                result = jsonParser.parse(input);
            assert(result.length === 1);
            assert(result[0].construct === "constant");
        });
        it("should return a field when first letter is lower case", function() {
            var input = { tEsT: "test" },
                result = jsonParser.parse(input);
            assert(result.length === 1);
            assert(result[0].construct === "field");
        });
        it("should return a property when first letter is upper case", function() {
            var input = { TeSt: "test" },
                result = jsonParser.parse(input);
            assert(result.length === 1);
            assert(result[0].construct === "property");
        }); 
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
        it("should return a name consisting of all upper case when input is all upper case", function() {
            var input = { TEST: "test" },
                result = jsonParser.parse(input);
            assert(result.length === 1);
            assert(result[0].name === "TEST");
        });
        it("should return a name consisting of all upper case without a leading _ when called with all upper case and leading _", function() {
            var input = { _TEST: "test"},
                result = jsonParser.parse(input);
            assert(result.length === 1);
            assert(result[0].name === "TEST");
        });
        it("should return a name with leading upper case when called with leading upper case", function() {
            var input = { Test: "test" },
                result = jsonParser.parse(input);
            assert(result.length === 1);
            assert(result[0].name === "Test");
        });
        it("should reurn a name with leading upper case when it starts with _ and is followed by upper case", function() {
            var input = { _Test: "test"}, 
                result = jsonParser.parse(input);
            assert(result.length === 1);
            assert(result[0].name === "Test");
        });
        it("should return a name with leading lower case when called with leading lower case", function() {
            var input = { test: "test" },
                result = jsonParser.parse(input);
            assert(result.length === 1);
            assert(result[0].name === "test");
        });
        it("should reurn a name with leading lower case when it starts with _ and is followed by lower case", function() {
            var input = { _test: "test"}, 
                result = jsonParser.parse(input);
            assert(result.length === 1);
            assert(result[0].name === "test");
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
    });
});
