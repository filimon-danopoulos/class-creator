/// <reference path="../thirdparty/mocha/mocha.d.ts" />
/// <reference path="../lib/contracts/index.d.ts" />


import assert = require("assert");
import CsharpGeneratorHelper = require("../lib/generators/csharp/CsharpGeneratorHelper");
import CsharpClassTemplate = require("../lib/generators/csharp/CsharpClassTemplate");

describe("CsharpGeneratorHelper", function() {
    var helper = new CsharpGeneratorHelper();
    describe("getTemplate", function() {
        it("should return a CsharpClassTemplate instance", function () {
            var result = helper.getTemplate();
            assert(result instanceof CsharpClassTemplate);
        });
    });
    describe("generateMember", function() {
        it("should return a string representing a private member for a private token", function() {
            var input = { 
                    name: "test",
                    type: "string",
                    accessor: "private",
                    construct: "field"
                },
                result = helper.generateMember(input);
            assert(/^private .*?$/.test(result));
        });
        it("should return a string representing a public member for a public token", function() {
            var input = { 
                    name: "test",
                    type: "string",
                    accessor: "public",
                    construct: "field"
                },
                result = helper.generateMember(input);
            assert(/^public .*?$/.test(result)); 
        });

        it("should return a string representing a string member for a string token", function() {
            var input = { 
                    name: "test",
                    type: "string",
                    accessor: "private",
                    construct: "field"
                },
                result = helper.generateMember(input);
            assert(/^\w*? string .*?$/.test(result));
        });
        it("should return a string representing an int member for an integer token", function() {
            var input = { 
                    name: "test",
                    type: "integer",
                    accessor: "private",
                    construct: "field"
                },
                result = helper.generateMember(input);
            assert(/^\w*? int .*?$/.test(result));
        });
        it("should return a string representing a float for a float token", function() {
            var input = { 
                    name: "test",
                    type: "float",
                    accessor: "private",
                    construct: "field"
                },
                result = helper.generateMember(input);
            assert(/^\w*? float .*?$/.test(result));
        });
        it("should return a string representing a custom type for custom type token", function() {
            var input = { 
                    name: "test",
                    type: "Test",
                    accessor: "private",
                    construct: "field"
                },
                result = helper.generateMember(input);
            assert(/^\w*? Test .*?$/.test(result));
        });
        it("should return an object array for an array token", function() {
            var input = {
                    name: "test",
                    type: "array",
                    accessor: "private",
                    construct: "field"    
                }, 
                result = helper.generateMember(input);
             assert(/^\w*? object\[\] \w*?;$/.test(result));    
        });
        it("should return a bool for a boolean token", function() {
            var input = {
                    name: "test",
                    type: "boolean",
                    accessor: "private",
                    construct: "field"
                },
                result = helper.generateMember(input);
             assert(/\w*? bool \w*?/.test(result));       
        });

        it("should return a string representing a field for a field token", function(){
            var input = { 
                    name: "test",
                    type: "float",
                    accessor: "private",
                    construct: "field"
                },
                result = helper.generateMember(input);
            assert(/^\w*? .*? .*?;$/.test(result));
        });
        it("should return a string representing a property for a field property", function() {
            var input = { 
                    name: "test",
                    type: "float",
                    accessor: "private",
                    construct: "property"
                },
                result = helper.generateMember(input);
            assert(/^\w*? .*? .*? \{ get; set; \}$/.test(result));
        });
        it("should return a string representing a static readonly member for a constant token", function() {
            var input = { 
                    name: "test",
                    type: "float",
                    accessor: "private",
                    construct: "constant"
                },
                result = helper.generateMember(input);
            assert(/^\w*? static readonly .*?;$/.test(result));
        });
        it("should handle a token correctly, test case 1", function() {
            var input = {
                    name: "Test",
                    type: "string",
                    accessor: "private",
                    construct: "property"
                },
                result = helper.generateMember(input),
                expected = "private string Test { get; set; }";    
            assert(result === expected);
        });
    });
    describe("getType", function() {
        it("should return int for integer", function() {
            var result = helper.getType("integer");
            assert(result === "int");    
        });
        it("should return float for float", function() {
            var result = helper.getType("float");
            assert(result === "float");    
        });
        it("should return string for string", function() {
            var result = helper.getType("string");
            assert(result === "string");    
        });
        it("should return object[] for array", function() {
            var result = helper.getType("array");
            assert(result === "object[]");    
        });
        it("should return bool for boolean", function() {
            var result = helper.getType("boolean");
            assert(result === "bool");
        });
        it("should return a class name with leading upper case letter for input that starts with a lower case", function() {
            var result = helper.getType("test");
            assert(result === "Test");
        });
        it("should return a class name with leading upper case letter for input that starts with an upper case", function() {
            var result = helper.getType("Test");
            assert(result === "Test");
        });
    });
});
