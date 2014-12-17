var assert = require("assert");
var CsharpGeneratorHelper = require("../app/generators/CsharpGeneratorHelper");
var CsharpClassTemplate = require("../app/generators/CsharpClassTemplate");

describe("CsharpGeneratorHelper", function() {
    var helper = new CsharpGeneratorHelper();
    describe("getTemplate", function() {
        it("should return a CsharpClassTemplate instance", function () {
            var result = helper.getTemplate();
            assert(result instanceof CsharpClassTemplate);
        });
    });
    describe("generateMember", function() {
        it("should return a string representing a private property for a private property token", function() {
            var input = { 
                    name: "Test",
                    type: "string",
                    accessor: "private",
                    construct: "property"
                },
                result = helper.generateMember(input);
            assert(result.indexOf("{ get; set; }") !== -1, "result should have get and set");
            result = result.replace(/ \{.*?\}/, '').split(" ");
            assert(result.length === 3, "result should have three parts");
            assert(result[0] === "private", "first part should be an accessor");
            assert(result[1] === "string", "second part should be a type");
            assert(result[2] === "Test", "third part should be a name");
        });
        it("should return a string representing a public property for a public property token", function() {
            var input = { 
                    name: "Test",
                    type: "string",
                    accessor: "public",
                    construct: "property"
                },
                result = helper.generateMember(input);
            assert(result.indexOf("{ get; set; }") !== -1, "result should have get and set");
            result = result.replace(/ \{.*?\}/, '').split(" ");
            assert(result.length === 3, "result should have three parts");
            assert(result[0] === "public", "first part should be an accessor");
            assert(result[1] === "string", "second part should be a type");
            assert(result[2] === "Test", "third part should be a name");
        });
        it("should return a string representing a private field for a private field token", function() {
            var input = { 
                    name: "Test",
                    type: "string",
                    accessor: "private",
                    construct: "field"
                },
                result = helper.generateMember(input);
            assert(result.slice(-1) === ";", "result should end in ;");
            result = result.slice(0,-1).split(" ");
            assert(result.length === 3, "result should have three parts");
            assert(result[0] === "private", "first part should be an accessor");
            assert(result[1] === "string", "second part should be a type");
            assert(result[2] === "Test", "third part should be a name");
        });
        it("should return a string representing a public field for a public field token", function() {
            var input = { 
                    name: "Test",
                    type: "string",
                    accessor: "public",
                    construct: "field"
                },
                result = helper.generateMember(input);
            assert(result.slice(-1) === ";", "result should end in ;");
            result = result.slice(0,-1).split(" ");
            assert(result.length === 3, "result should have three parts");
            assert(result[0] === "public", "first part should be an accessor");
            assert(result[1] === "string", "second part should be a type");
            assert(result[2] === "Test", "third part should be a name");
        });
        it("should return a string representing a private constant for a private constant token");
        it("should return a string representing a public constant for public constant token");
    });
});
