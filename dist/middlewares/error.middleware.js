"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
var services_1 = require("../services");
var utils_1 = require("../utils/");
var errorHandler = function (error, req, res, next) {
    var data = { code: 500, status: 'failed', message: 'Internal server error' };
    if (error instanceof services_1.CustomError) {
        data = {
            code: error.code,
            status: error.status,
            message: error.message,
        };
    }
    return utils_1.errorResponse(res, data);
};
exports.errorHandler = errorHandler;
