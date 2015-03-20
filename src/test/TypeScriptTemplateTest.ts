import assert = require("assert");

import TypeScriptClassTemplate = require("../lib/generators/typescript/TypeScriptClassTemplate");
import TypeScriptConstantTemplate = require("../lib/generators/typescript/TypeScriptConstantTemplate");
import TypeScriptMemberTemplate = require("../lib/generators/typescript/TypeScriptMemberTemplate");

var validPlaceHolders = ["accessor", "construct", "name", "type"];


describe("TypeScriptClassTemplate ", function() {
    describe("getPlaceHolders", function() {
        it("should only return valid placeholders", function() {
            var template = new TypeScriptClassTemplate();
            var placeHolders = template.getPlaceHolders();
            var validPlaceHolders = ["className", "members"];
            for (var i = 0, l = placeHolders.length; i < l; i ++) {
                var current = placeHolders[i];
                assert(validPlaceHolders.indexOf(current) !== -1, current+" is not a valid placeholder");
            }
        });
    });
});

describe("TypeScriptConstantTemplate", function() {
    describe("getPlaceHolders", function() {
        it("should only return valid placeholders", function() {
            var template = new TypeScriptConstantTemplate();
            var placeHolders = template.getPlaceHolders();
            for (var i = 0, l = placeHolders.length; i < l; i ++) {
                var current = placeHolders[i];
                assert(validPlaceHolders.indexOf(current) !== -1, current+" is not a valid placeholder");
            }
        });
    });
});

describe("TypeScriptMemberTemplate", function() {
    describe("getPlaceHolders", function() {
        it("should only return valid placeholders", function() {
            var template = new TypeScriptMemberTemplate();
            var placeHolders = template.getPlaceHolders();
            for (var i = 0, l = placeHolders.length; i < l; i ++) {
                var current = placeHolders[i];
                assert(validPlaceHolders.indexOf(current) !== -1, current+" is not a valid placeholder");
            }
        });
    });
});
