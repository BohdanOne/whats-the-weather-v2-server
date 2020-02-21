"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var express_1 = __importDefault(require("express"));
var body_parser_1 = require("body-parser");
var errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
var locations_1 = __importDefault(require("./routes/locations"));
var app = express_1.default();
app.use(body_parser_1.json());
app.use('/locations', locations_1.default);
app.use(errorHandler_1.default);
var PORT = process.env.PORT || 3000;
app.listen(PORT, function () { return console.log("WTW server listening at port " + PORT + "..."); });
