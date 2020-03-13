"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var forecast_1 = require("../controllers/forecast");
var router = express_1.Router();
router.post('/', forecast_1.getForecast);
exports.default = router;
