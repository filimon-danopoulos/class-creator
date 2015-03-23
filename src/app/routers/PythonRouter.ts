import express = require("express");

import PythonCodeService = require("../../lib/services/PythonCodeService");
import JsonParser = require("../../lib/parsers/JsonParser");
import StandardTokenizer = require("../../lib/tokenizers/StandardTokenizer");

var router = express.Router();
var service = new PythonCodeService(new JsonParser(), new StandardTokenizer());

router.get("/string", function(req, res) {
    if (!("json" in req.query)) {
        res.send("Invalid input");
        return;
    }
    var input = <{[key:string]: any}> JSON.parse(req.query.json);
    var code = service.getCodeAsString(input);
    res.send(code);
});



export = router;
