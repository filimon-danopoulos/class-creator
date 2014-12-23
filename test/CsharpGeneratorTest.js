var assert = require("assert");
var CsharpGenerator = require("../app/generators/csharp/CsharpGenerator");

describe("CsharpGenerator", function () {
    var generator = new CsharpGenerator();
    describe("generate",  function() {
        it("should return a string representing a class, test 1", function() {
            var tokens = [{
                name: "Test", 
                type: "string", 
                construct: "property", 
                accessor: "public"
            }];
            var result = generator.generate("TestClass", tokens);
            var expected = [
                "public class TestClass {",
                    "public string Test { get; set; }",
                "}"
            ].join("\n");
            assert(result == expected);
        });
    });
});
