var assert = require("assert");
var StandardTokenizer = require("../app/tokenizers/StandardTokenizer");

describe("StandardTokenizer", function() {
    "use strict";
    var tokenizer = new StandardTokenizer();
    describe("tokenize", function() {      
        it("should return a private when the property starts with a _", function() {
            var input = { _TEST: "test" },
                result = tokenizer.tokenize(input);

            assert(result.length === 1, "should only get a single result");
            var rootClass = result[0];
            assert(rootClass.className === "rootClass", "the className should be rootClass");
            assert(rootClass.tokens.length === 1, "it should have one token");
            var token = rootClass.tokens[0];
            assert(token.accessor === "private", "it should have the right accessor");
        });   
        it("should return a public when property doesn't start with a _", function() {
            var input = { TEST: "1.0" },
                result = tokenizer.tokenize(input);

            assert(result.length === 1, "should only get a single result");
            var rootClass = result[0];
            assert(rootClass.className === "rootClass", "the className should be rootClass");
            assert(rootClass.tokens.length === 1, "it should have one token");
            var token = rootClass.tokens[0];
            assert(token.accessor === "public", "it should have the right accessor");
        }); 

        it("should return a constant when property is all upper case", function() {
            var input = { _TEST: "1.0" },
                result = tokenizer.tokenize(input);
                
            assert(result.length === 1, "should only get a single result");
            var rootClass = result[0];
            assert(rootClass.className === "rootClass", "the className should be rootClass");
            assert(rootClass.tokens.length === 1, "it should have one token");
            var token = rootClass.tokens[0];
            assert(token.construct === "constant", "it should have the right construct");
        }); 
        it("should return a field when property starts a lower case letter", function() {
            var input = { _test: "test" },
                result = tokenizer.tokenize(input);
               
            assert(result.length === 1, "should only get a single result");
            var rootClass = result[0];
            assert(rootClass.className === "rootClass", "the className should be rootClass");
            assert(rootClass.tokens.length === 1, "it should have one token");
            var token = rootClass.tokens[0];
            assert(token.construct === "field", "it should have the right construct");
        });
        it("should return a property when property starts with an upper case letter", function() {
            var input = { _Test: "test" },
                result = tokenizer.tokenize(input);
                
            assert(result.length === 1, "should only get a single result");
            var rootClass = result[0];
            assert(rootClass.className === "rootClass", "the className should be rootClass");
            assert(rootClass.tokens.length === 1, "it should have one token");
            var token = rootClass.tokens[0];
            assert(token.construct === "property", "it should have the right construct");
        });

        it("should return a integer when property an integer value", function() {
            var input = { _TEST: 1 },
                result = tokenizer.tokenize(input);
            
            assert(result.length === 1, "should only get a single result");
            var rootClass = result[0];
            assert(rootClass.className === "rootClass", "the className should be rootClass");
            assert(rootClass.tokens.length === 1, "it should have one token");
            var token = rootClass.tokens[0];
            assert(token.type === "integer", "it should have the right type");
        });
        it("should return a string when property has a non-number string value", function() {
            var input = { TEST: "test" },
                result = tokenizer.tokenize(input);
             
            assert(result.length === 1, "should only get a single result");
            var rootClass = result[0];
            assert(rootClass.className === "rootClass", "the className should be rootClass");
            assert(rootClass.tokens.length === 1, "it should have one token");
            var token = rootClass.tokens[0];
            assert(token.type === "string", "it should have the right type");
        });
        it("should return a float when property has a float string value", function() {
            var input = { _test: "1.0" },
                result = tokenizer.tokenize(input);
              
            assert(result.length === 1, "should only get a single result");
            var rootClass = result[0];
            assert(rootClass.className === "rootClass", "the className should be rootClass");
            assert(rootClass.tokens.length === 1, "it should have one token");
            var token = rootClass.tokens[0];
            assert(token.type === "float", "it should have the right type");
        }); 

        it("should handle a json input as expected, test 1");
    });
});
