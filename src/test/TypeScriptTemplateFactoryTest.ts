// <reference path="../thirdparty/mocha/mocha.d.td" />
// <reference path="../app/contracts/index.d.ts" />


import assert = require("assert");
import TypeScriptTemplateFactory = require("../app/generators/typescript/TypeScriptTemplateFactory");
import TypeScriptMemberTemplate = require("../app/generators/typescript/TypeScriptMemberTemplate");
import TypeScriptConstantTemplate = require("../app/generators/typescript/TypeScriptConstantTemplate");

describe("TypeScriptTemplateFactory", function() {
    var factory = new TypeScriptTemplateFactory();
    describe("getTemplate", function() {
        it("should return a TypeScriptMemberTemplate for a token that is a property", function() {
            var result = factory.getTemplate({
                name: "test",
                type: "string",
                accessor: "private",
                construct: "property"
            });
            assert(result instanceof TypeScriptMemberTemplate);
        });
        it("should return a TypeScriptMemberTemplate for a token that is a field", function() {
            var result = factory.getTemplate({
                name: "test",
                type: "string",
                accessor: "private",
                construct: "field"
            });
            assert(result instanceof TypeScriptMemberTemplate);
        });
        it("should return a TypeScriptConstantTemplate for a token that is a constant", function() {
            var result = factory.getTemplate({
                name: "TEST", 
                type: "string",
                accessor: "private",
                construct: "constant"
            });
            assert(result instanceof TypeScriptConstantTemplate);
        });
    });    
});
