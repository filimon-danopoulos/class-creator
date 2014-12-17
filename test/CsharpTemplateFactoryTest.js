var assert = require("assert");
var CsharpTemplateFactory = require("../app/generators/CsharpTemplateFactory");
var CsharpPropertyTemplate = require("../app/generators/CsharpPropertyTemplate");
var CsharpFieldTemplate = require("../app/generators/CsharpFieldTemplate");

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
        it("should return a CsharpConstantTemplate for a token that is a constant");
    });    
});
