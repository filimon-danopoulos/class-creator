var assert = require("assert");
var CsharpGeneratorHelper = require("../app/generators/CsharpGeneratorHelper");
var CsharpClassTemplate = require("../app/generators/CsharpClassTemplate");

describe("CsharpGeneratorHelper", function() {
    describe("getTemplate", function() {
        it("should return a CsharpClassTemplate instance");
    });
    describe("generateMember", function() {
        it("should return a string representing a private property for a private property token");
        it("should return a string representing a public property for a public property token");
        it("should return a string representing a private field for a private field token");
        it("should return a string representing a public field for a private field token");
        it("should return a string representing a private constant for a private constant token");
        it("should return a string representing a public constant for public constant token");
    });
});
