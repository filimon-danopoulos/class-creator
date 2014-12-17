var assert = require("assert");
var StandardTokenizer = require("../app/tokenizers/StandardTokenizer");

describe("StandardTokenizer", function() {
    "use strict";
    var tokenizer = new StandardTokenizer();
    describe("tokenize", function() {      
        it("should return a private constant when property is all upper case and starts with a _", function() {
            var input = { _TEST: "test" },
                result = tokenizer.tokenize(input);
                
            assert(result.length === 1);
            assert(result[0].accessor === "private");
            assert(result[0].construct === "constant");
        });
        it("should return a public constant when property is all upper case", function() {
            var input = { TEST: "test" },
                result = tokenizer.tokenize(input);
                
            assert(result.length === 1);
            assert(result[0].accessor === "public");
            assert(result[0].construct === "constant");
        });       
        it("should return a private field when property starts with _ and lower case letter", function() {
            var input = { _test: "test" },
                result = tokenizer.tokenize(input);
                
            assert(result.length === 1);
            assert(result[0].accessor === "private");
            assert(result[0].construct === "field");
        });
        it("should return a public field when property starts with an lower case letter", function() {
            var input = { test: "test" },
                result = tokenizer.tokenize(input);
                
            assert(result.length === 1);
            assert(result[0].accessor === "public");
            assert(result[0].construct === "field");
        });
        it("should return a private property when property starts with _ and upper case letter", function() {
            var input = { _Test: "test" },
                result = tokenizer.tokenize(input);
                
            assert(result.length === 1);
            assert(result[0].accessor === "private");
            assert(result[0].construct === "property");
        });
        it("should return a public field for when property starts with an upper case letter", function() {
            var input = { Test: "test" },
                result = tokenizer.tokenize(input);
                
            assert(result.length === 1);
            assert(result[0].accessor === "public");
            assert(result[0].construct === "property");
        });
    });
});
