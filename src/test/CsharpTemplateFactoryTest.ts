// <reference path="../thirdparty/mocha/mocha.d.td" />
// <reference path="../app/contracts/index.d.ts" />


var assert = require("assert");
var CsharpTemplateFactory = require("../app/generators/csharp/CsharpTemplateFactory");
var CsharpPropertyTemplate = require("../app/generators/csharp/CsharpPropertyTemplate");
var CsharpFieldTemplate = require("../app/generators/csharp/CsharpFieldTemplate");
var CsharpConstantTemplate = require("../app/generators/csharp/CsharpConstantTemplate");

describe("CsharpTemplateFactory", function() {
    var factory = new CsharpTemplateFactory();
    describe("getTemplate", function() {
        it("should return a CsharpPropertyTemplate for a token that is a property", function() {
            var result = factory.getTemplate({
                name: "test",
                type: "string",
                accessor: "private",
                construct: "property"
            });
            assert(result instanceof CsharpPropertyTemplate);
        });
        it("should return a CsharpFieldTemplate for a token that is a field", function() {
            var result = factory.getTemplate({
                name: "test",
                type: "string",
                accessor: "private",
                construct: "field"
            });
            assert(result instanceof CsharpFieldTemplate);
        });
        it("should return a CsharpConstantTemplate for a token that is a constant", function() {
            var result = factory.getTemplate({
                name: "TEST", 
                type: "string",
                accessor: "private",
                construct: "constant"
            });
            assert(result instanceof CsharpConstantTemplate);
        });
    });    
});
