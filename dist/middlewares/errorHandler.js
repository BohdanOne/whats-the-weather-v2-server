"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var errorHandler = function (error, req, res, next) {
    console.log('Error Handler catched:', error.message);
    res.status(500).json({ message: "error.message" });
};
exports.default = errorHandler;
