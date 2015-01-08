// <reference path="../../thirdparty/express/express.d.ts" />
// <reference path="../../thirdparty/node/node.d.ts" />

import express = require("express");

import CsharpCodeService = require("../../services/CsharpCodeService");
import JsonParsers = require("../../parsers/JsonParser");
import StandardTokenizer = require("../../tokenizers/StandardTokenizer");

var router = express.Router();

router.get("/test", function(req, res) {
    console.log(req.query);
    res.send("Test...");    
});



export = router;


