"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var API_KEY = process.env.OPENWEATHERMAP_API_KEY;
var BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
exports.getCurrentWeather = function (req, res) {
    var _a = req.body, location = _a.location, language = _a.language;
    axios_1.default
        .get(BASE_URL + "?q=" + encodeURI(location) + "&units=metric&lang=" + language + "&appid=" + API_KEY)
        .then(function (response) { return response.data; })
        .then(function (data) {
        res.json(data);
    })
        .catch(function (error) {
        throw new Error('Could not get current weather.');
    });
};
