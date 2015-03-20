import assert = require("assert");
import TypeScriptGeneratorHelper = require("../lib/generators/typescript/TypeScriptGeneratorHelper");
import TypeScriptClassTemplate = require("../lib/generators/typescript/TypeScriptClassTemplate");

describe("TypeScriptGeneratorHelper", function() {
    var helper = new TypeScriptGeneratorHelper();
    describe("getTemplate", function() {
        it("should return a TypeScriptClassTemplate instance", function () {
            var result = helper.getTemplate();
            assert(result instanceof TypeScriptClassTemplate);
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
            assert(/^.*?\:string;$/.test(result));
        });
        it("should return a string representing an number member for an integer token", function() {
            var input = {
                    name: "test",
                    type: "integer",
                    accessor: "private",
                    construct: "field"
                },
                result = helper.generateMember(input);
            assert(/^.*?\:number;$/.test(result));
        });
        it("should return a string representing a number for a float token", function() {
            var input = {
                    name: "test",
                    type: "float",
                    accessor: "private",
                    construct: "field"
                },
                result = helper.generateMember(input);
            assert(/^.*?\:number;$/.test(result));
        });
        it("should return a string representing a custom type for custom type token", function() {
            var input = {
                    name: "test",
                    type: "Test",
                    accessor: "private",
                    construct: "field"
                },
                result = helper.generateMember(input);
            assert(/^.*?\:Test;$/.test(result));
        });
        it("should return a string representing an any array for an array token", function() {
            var input = {
                    name: "test",
                    type: "array",
                    accessor: "private",
                    construct: "field"
                },
                result = helper.generateMember(input);
             assert(/^.*?\:any\[\];$/.test(result));
        });
        it("should return a string representing a boolean for a boolean token", function() {
            var input = {
                    name: "test",
                    type: "boolean",
                    accessor: "private",
                    construct: "field"
                },
                result = helper.generateMember(input);
             assert(/.*?\:boolean;/.test(result));
        });
        it("should return a string representing a member for a field token", function(){
            var input = {
                    name: "test",
                    type: "float",
                    accessor: "private",
                    construct: "field"
                },
                result = helper.generateMember(input);
            assert(/^\w*? .*?\:.*?;$/.test(result));
        });
        it("should return a string representing a member for a field property", function() {
            var input = {
                    name: "test",
                    type: "float",
                    accessor: "private",
                    construct: "property"
                },
                result = helper.generateMember(input);
            assert(/^\w*? .*?\:.*?;$/.test(result));
        });
        it("should return a string representing a member for a constant token", function() {
            var input = {
                    name: "test",
                    type: "float",
                    accessor: "private",
                    construct: "constant"
                },
                result = helper.generateMember(input);
            assert(/^\w*? .*?\:.*?;$/.test(result));
        });
        it("should handle a property token correctly", function() {
            var input = {
                    name: "Test",
                    type: "string",
                    accessor: "private",
                    construct: "property"
                },
                result = helper.generateMember(input),
                expected = "private Test:string;";
            assert(result === expected);
        });
        it("should handle a field token correctly", function() {
            var input = {
                    name: "test",
                    type: "integer",
                    accessor: "public",
                    construct: "field"
                },
                result = helper.generateMember(input),
                expected = "public test:number;";
            assert(result === expected);
        });
        it("should handle a constant token correctly", function() {
            var input = {
                    name: "TEST",
                    type: "float",
                    accessor: "private",
                    construct: "constant"
                },
                result = helper.generateMember(input),
                expected = "private static TEST:number;";
            assert(result === expected);
        });
    });
    describe("getType", function() {
        it("should return number for integer", function() {
            var result = helper.getType("integer");
            assert(result === "number");
        });
        it("should return number for float", function() {
            var result = helper.getType("float");
            assert(result === "number");
        });
        it("should return string for string", function() {
            var result = helper.getType("string");
            assert(result === "string");
        });
        it("should return any[] for array", function() {
            var result = helper.getType("array");
            assert(result === "any[]");
        });
        it("should return boolean for boolean", function() {
            var result = helper.getType("boolean");
            assert(result === "boolean");
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
