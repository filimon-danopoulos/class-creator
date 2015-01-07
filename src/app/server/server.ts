// <reference path="../../thirdparty/express/express.d.ts" />
// <reference path="../../thirdparty/node/node.d.ts" />

var express = require("express");

var app = express();
var port = process.env.PORT || 8080;

var router = express.Router();

router.get("/test", function(req, res) {
    res.send("test");    
});

app.use("/api", router);

app.listen(port);

console.log("listening on: http://127.0.0.1:"+port);
