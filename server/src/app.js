"use strict";
exports.__esModule = true;
var express_1 = require("express"); //= require('express');
var app = express_1["default"]();
var port = 3000;
app.get('/', function (req, res) {
    res.send('The sedulous hyena ate the antelope!');
});
app.listen(port, function () {
    //   if (err) {
    //     return console.error(err);
    //   }
    return console.log("server is listening on " + port);
});
