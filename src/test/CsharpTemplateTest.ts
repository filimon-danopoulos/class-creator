// <reference path="../thirdparty/mocha/mocha.d.td" />
// <reference path="../app/contracts/index.d.ts" />

import assert = require("assert");

import CsharpConstantTemplate = require("../app/generators/csharp/CsharpConstantTemplate");
import CsharpPropertyTemplate = require("../app/generators/csharp/CsharpPropertyTemplate");
import CsharpFieldTemplate = require("../app/generators/csharp/CsharpFieldTemplate");
import CsharpClassTemplate = require("../app/generators/csharp/CsharpClassTemplate");

var validPlaceHolders = ["accessor", "construct", "name", "type"];

describe("CsharpConstantTemplate", function() {
    describe("getPlaceHolders", function() {
        it("should only return valid placeholders", function() {
            var template = new CsharpConstantTemplate();
            var placeHolders = template.getPlaceHolders();
            for (var i = 0, l = placeHolders.length; i < l; i ++) {
                var current = placeHolders[i];
                assert(validPlaceHolders.indexOf(current) !== -1, current+" is not a valid placeholder");
            }
        });    
    });

});

describe("CsharpPropertyTemplate ", function() {
    describe("getPlaceHolders", function() {
        it("should only return valid placeholders", function() {
            var template = new CsharpPropertyTemplate ();
            var placeHolders = template.getPlaceHolders();
            for (var i = 0, l = placeHolders.length; i < l; i ++) {
                var current = placeHolders[i];
                assert(validPlaceHolders.indexOf(current) !== -1, current+" is not a valid placeholder");
            }
        });    
    });

});

describe("CsharpFieldTemplate ", function() {
    describe("getPlaceHolders", function() {
        it("should only return valid placeholders", function() {
            var template = new CsharpFieldTemplate ();
            var placeHolders = template.getPlaceHolders();
            for (var i = 0, l = placeHolders.length; i < l; i ++) {
                var current = placeHolders[i];
                assert(validPlaceHolders.indexOf(current) !== -1, current+" is not a valid placeholder");
            }
        });    
    });

});

describe("CsharpClassTemplate ", function() {
    describe("getPlaceHolders", function() {
        it("should only return valid placeholders", function() {
            var template = new CsharpClassTemplate();
            var placeHolders = template.getPlaceHolders();
            var validPlaceHolders = ["className", "members"];
            for (var i = 0, l = placeHolders.length; i < l; i ++) {
                var current = placeHolders[i];
                assert(validPlaceHolders.indexOf(current) !== -1, current+" is not a valid placeholder");
            }
        });    
    });

});

