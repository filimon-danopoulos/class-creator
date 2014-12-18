var assert = require("assert");
var StandardTokenizer = require("../app/tokenizers/StandardTokenizer");

describe("StandardTokenizer", function() {
    "use strict";
    var tokenizer = new StandardTokenizer();
    describe("tokenize", function() {      
        it("should return a private when the property starts with a _", function() {
            var input = { _TEST: "test" },
                result = tokenizer.tokenize(input);
                
            assert(result.length === 1);
            assert(result[0].accessor === "private");
        });   
        it("should return a public when property does't start with a _", function() {
            var input = { TEST: "1.0" },
                result = tokenizer.tokenize(input);
                
            assert(result.length === 1);
            assert(result[0].accessor === "public");
        }); 

        it("should return a constant when property is all upper case", function() {
            var input = { _TEST: "1.0" },
                result = tokenizer.tokenize(input);
                
            assert(result.length === 1);
            assert(result[0].construct === "constant");
        }); 
        it("should return a field when property starts a lower case letter", function() {
            var input = { _test: "test" },
                result = tokenizer.tokenize(input);
                
            assert(result.length === 1);
            assert(result[0].construct === "field");
        });
        it("should return a property when property starts with an upper case letter", function() {
            var input = { _Test: "test" },
                result = tokenizer.tokenize(input);
                
            assert(result.length === 1);
            assert(result[0].construct === "property");
        });

        it("should return a integer when property an integer value", function() {
            var input = { _TEST: 1 },
                result = tokenizer.tokenize(input);
                
            assert(result.length === 1);
            assert(result[0].type === "integer");
        });
        it("should return a string when property has a non-number string value", function() {
            var input = { TEST: "test" },
                result = tokenizer.tokenize(input);
                
            assert(result.length === 1);
            assert(result[0].type === "string");
        });
        it("should return a float when property has a float string value", function() {
            var input = { _test: "1.0" },
                result = tokenizer.tokenize(input);
                
            assert(result.length === 1);
            assert(result[0].type === "float");
        }); 
    });
});
