var assert = require("assert");
var StandardTokenizer = require("../app/tokenizers/StandardTokenizer");

describe("StandardTokenizer", function() {
    "use strict";
    var tokenizer = new StandardTokenizer();
    describe("tokenize", function() {      
        it("should return a private constant string is all upper case and starts with a _ and has a non-number string value", function() {
            var input = { _TEST: "test" },
                result = tokenizer.tokenize(input);
                
            assert(result.length === 1);
            assert(result[0].accessor === "private");
            assert(result[0].construct === "constant");
            assert(result[0].type === "string");
        });
        it("should return a private constant float when property is all upper case and starts with a _ and has a float string value", function() {
            var input = { _TEST: "1.0" },
                result = tokenizer.tokenize(input);
                
            assert(result.length === 1);
            assert(result[0].accessor === "private");
            assert(result[0].construct === "constant");
            assert(result[0].type === "float");
        });
        it("should return a private constant integer when property is all upper case and starts with a _ and has an integer value", function() {
            var input = { _TEST: 1 },
                result = tokenizer.tokenize(input);
                
            assert(result.length === 1);
            assert(result[0].accessor === "private");
            assert(result[0].construct === "constant");
            assert(result[0].type === "integer");
        });
        
        it("should return a public constant string when property is all upper case and has a non-number string value", function() {
            var input = { TEST: "test" },
                result = tokenizer.tokenize(input);
                
            assert(result.length === 1);
            assert(result[0].accessor === "public");
            assert(result[0].construct === "constant");
            assert(result[0].type === "string");
        });   
        it("should return a public constant float when property is all upper case and has a float string value", function() {
            var input = { TEST: "1.0" },
                result = tokenizer.tokenize(input);
                
            assert(result.length === 1);
            assert(result[0].accessor === "public");
            assert(result[0].construct === "constant");
            assert(result[0].type === "float");
        });    
        it("should return a public constant integer when property is all upper case and has an integer value", function() {
            var input = { TEST: 1 },
                result = tokenizer.tokenize(input);
                
            assert(result.length === 1);
            assert(result[0].accessor === "public");
            assert(result[0].construct === "constant");
            assert(result[0].type === "integer");
        });              
        
        it("should return a private field string when property starts with _ and lower case letter and has a non-number string value", function() {
            var input = { _test: "test" },
                result = tokenizer.tokenize(input);
                
            assert(result.length === 1);
            assert(result[0].accessor === "private");
            assert(result[0].construct === "field");
            assert(result[0].type === "string");
        });
        it("should return a private field float when property starts with _ and lower case letter and has a float string value", function() {
            var input = { _test: "1.0" },
                result = tokenizer.tokenize(input);
                
            assert(result.length === 1);
            assert(result[0].accessor === "private");
            assert(result[0].construct === "field");
            assert(result[0].type === "float");
        }); 
        it("should return a private field integer when property starts with _ and lower case letter and has an integer value", function() {
            var input = { _test: 1 },
                result = tokenizer.tokenize(input);
                
            assert(result.length === 1);
            assert(result[0].accessor === "private");
            assert(result[0].construct === "field");
            assert(result[0].type === "integer");
        });
        
        
        it("should return a public field string when property starts with an lower case letter and has a non-number string value", function() {
            var input = { test: "test" },
                result = tokenizer.tokenize(input);
                
            assert(result.length === 1);
            assert(result[0].accessor === "public");
            assert(result[0].construct === "field");
            assert(result[0].type === "string");
        });
        it("should return a public field float when property starts with an lower case letter and has a float string value", function() {
            var input = { test: "1.0" },
                result = tokenizer.tokenize(input);
                
            assert(result.length === 1);
            assert(result[0].accessor === "public");
            assert(result[0].construct === "field");
            assert(result[0].type === "float");
        });
        it("should return a public field integer when property starts with an lower case letter and has an integer value", function() {
            var input = { test: 1 },
                result = tokenizer.tokenize(input);
                
            assert(result.length === 1);
            assert(result[0].accessor === "public");
            assert(result[0].construct === "field");
            assert(result[0].type === "integer");
        });
        
        it("should return a private property string when property starts with _ and upper case letter and has a non-number string value", function() {
            var input = { _Test: "test" },
                result = tokenizer.tokenize(input);
                
            assert(result.length === 1);
            assert(result[0].accessor === "private");
            assert(result[0].construct === "property");
            assert(result[0].type === "string");
        });
        it("should return a private property float when property starts with _ and upper case letter and has a float string value", function() {
            var input = { _Test: "1.0" },
                result = tokenizer.tokenize(input);
                
            assert(result.length === 1);
            assert(result[0].accessor === "private");
            assert(result[0].construct === "property");
            assert(result[0].type === "float");
        });
        it("should return a private property integer when property starts with _ and upper case letter and has an integer value", function() {
            var input = { _Test: 1 },
                result = tokenizer.tokenize(input);
                
            assert(result.length === 1);
            assert(result[0].accessor === "private");
            assert(result[0].construct === "property");
            assert(result[0].type === "integer");
        });
        
        
        it("should return a public property string for when property starts with an upper case letter and has a non-number string value", function() {
            var input = { Test: "test" },
                result = tokenizer.tokenize(input);
                
            assert(result.length === 1);
            assert(result[0].accessor === "public");
            assert(result[0].construct === "property");
            assert(result[0].type === "string");
        });
        it("should return a public property string for when property starts with an upper case letter and has an integer value", function() {
            var input = { Test: 1 },
                result = tokenizer.tokenize(input);
                
            assert(result.length === 1);
            assert(result[0].accessor === "public");
            assert(result[0].construct === "property");
            assert(result[0].type === "integer");
        });
        it("should return a public property string for when property starts with an upper case letter and has a float string value", function() {
            var input = { Test: "1.0" },
                result = tokenizer.tokenize(input);
                
            assert(result.length === 1);
            assert(result[0].accessor === "public");
            assert(result[0].construct === "property");
            assert(result[0].type === "float");
        });
    });
});
