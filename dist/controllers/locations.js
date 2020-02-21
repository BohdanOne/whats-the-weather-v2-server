"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var API_KEY = process.env.OPENCAGE_API_KEY;
var BASE_URL = 'https://api.opencagedata.com/geocode/v1/';
var getLocation = function (req, res, next) {
    var _a = req.body, lat = _a.lat, long = _a.long;
    var query = encodeURI(lat + "," + long);
    return axios_1.default
        .get(BASE_URL + "/json?q=" + query + "&key=" + API_KEY)
        .then(function (response) { return response.data; })
        .then(function (data) {
        if (data.results[0].components.town) {
            res.status(200).json({ location: data.results[0].components.town });
        }
        else {
            res.status(200).json({ location: data.results[0].components.city });
        }
    })
        .catch(function (e) {
        throw new Error('Could not get location.');
    });
};
exports.default = getLocation;
