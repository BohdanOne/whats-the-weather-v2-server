"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var body_parser_1 = require("body-parser");
var location_1 = __importDefault(require("./routes/location"));
var weather_1 = __importDefault(require("./routes/weather"));
var app = express_1.default();
app
    .use(cors_1.default())
    .use(body_parser_1.json())
    .use('/location', location_1.default)
    .use('/weather', weather_1.default);
var PORT = process.env.PORT || 8080;
app.listen(PORT, function () { return console.log("WTW server listening at port " + PORT + "..."); });
