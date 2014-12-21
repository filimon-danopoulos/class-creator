var assert = require("assert");

var CsharpCodeService = require("../app/services/CsharpCodeService");
var JsonParser = require("../app/parsers/JsonParser");
var StandardTokenizer = require("../app/tokenizers/StandardTokenizer");

describe("CsharpCodeService", function() {
    var service = new CsharpCodeService(
        new JsonParser(), 
        new StandardTokenizer()
    );
    describe("getCodeAsString", function() {
        it("should return all the classes as a single file", function() {
            var input = {
                IntTest: 5,
                _stringTest: "test",
                CONSTANT_TEST: "4.0",
                nestedTypeTest: {
                    _NestedString: "test"
                }
            };
            var result = service.getCodeAsString(input).replace(/\n/g, "");
            var expected = [
                "public class RootClass {",
                    "public int IntTest { get; set; }",
                    "private string stringTest;",
                    "public static readonly float CONSTANT_TEST;",
                    "public NestedTypeTest nestedTypeTest;",
                 "}",
                 "public class NestedTypeTest {",
                    "private string NestedString { get; set; }",
                 "}"
            ].join("");
            assert(result === expected);
        });
    });
    describe("getCodeAsStrings", function() {
        it("should return an array that contains all the classes in separate strings");
    });
    describe("getCodeAsFile", function() {
        it("should return a file that contains ");
    });
    describe("getCodeAsFiles", function() {
        it("should return an array that contains all the classes in separate files");
    });

});

