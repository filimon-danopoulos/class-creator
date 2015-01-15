/// <reference path="../thirdparty/express/express.d.ts" />
/// <reference path="../thirdparty/node/node.d.ts" />

import express = require("express");
import CsharpRouter = require("./routers/CsharpRouter");
import TypeScript = require("./routers/TypeScriptRouter");

var app = express();
var port = process.env.PORT || 8080;

app.use("/api/csharp", CsharpRouter);
app.use("/api/typescript", TypeScript);

app.listen(port);

console.log("Up and listening on: http://127.0.0.1:"+port);
