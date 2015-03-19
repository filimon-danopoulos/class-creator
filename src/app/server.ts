import express = require("express");
import path = require('path');

import CsharpRouter = require("./routers/CsharpRouter");
import TypeScript = require("./routers/TypeScriptRouter");

var app = express();
var port = process.env.PORT || 8181;

app.use("/api/csharp", CsharpRouter);
app.use("/api/typescript", TypeScript);

console.log(path.join(__dirname,"public"));
app.use(express.static(path.join(__dirname,"public/")));

app.listen(port);

console.log("Server  is up and listening on: http://127.0.0.1:"+port);
