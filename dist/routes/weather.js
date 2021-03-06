"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var weather_1 = require("../controllers/weather");
var router = express_1.Router();
router.post('/', weather_1.getCurrentWeather);
exports.default = router;
