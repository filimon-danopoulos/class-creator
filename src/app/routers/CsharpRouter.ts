/// <reference path="../../thirdparty/express/express.d.ts" />
/// <reference path="../../thirdparty/node/node.d.ts" />

import express = require("express");

import CsharpCodeService = require("../../lib/services/CsharpCodeService");
import JsonParser = require("../../lib/parsers/JsonParser");
import StandardTokenizer = require("../../lib/tokenizers/StandardTokenizer");

var router = express.Router();
var service = new CsharpCodeService(new JsonParser(), new StandardTokenizer());

router.get("/test", function(req, res) {
    if (!("json" in req.query)) {
        res.send("Invalid input");
        return;
    }
    var input = <{[key:string]: any}> JSON.parse(req.query.json);
    var code = service.getCodeAsString(input);
    res.send(code);    
});



export = router;


