var assert = require("assert");

var CsharpConstantTemplate = require("../app/generators/csharp/CsharpConstantTemplate");
var CsharpPropertyTemplate = require("../app/generators/csharp/CsharpPropertyTemplate");
var CsharpFieldTemplate = require("../app/generators/csharp/CsharpFieldTemplate");

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

