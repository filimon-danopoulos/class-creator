// <reference path="../thirdparty/mocha/mocha.d.td" />
// <reference path="../app/contracts/index.d.ts" />

import assert = require("assert");

import TypeScriptClassTemplate = require("../app/generators/typescript/TypeScriptClassTemplate");
import TypeScriptConstantTemplate = require("../app/generators/typescript/TypeScriptConstantTemplate");

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
