"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const http = require("http");
const bodyparser = require("body-parser");
const cors = require("cors");
const routes_1 = require("./api/routes");
const app = express();
const server = http.createServer(app);
const port = 9000;
app.use(bodyparser.json());
app.use(cors());
new routes_1.WithdrawalRoutes(app);
server.listen(port, () => {
    console.log(`server listening on port ${port}`);
});
//# sourceMappingURL=app.js.map