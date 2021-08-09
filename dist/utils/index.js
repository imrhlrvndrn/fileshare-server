"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformOriginalName = exports.successResponse = exports.errorResponse = void 0;
var response_utils_1 = require("./response.utils");
Object.defineProperty(exports, "errorResponse", { enumerable: true, get: function () { return response_utils_1.errorResponse; } });
Object.defineProperty(exports, "successResponse", { enumerable: true, get: function () { return response_utils_1.successResponse; } });
var transformOriginalName = function (name) {
    var splittedName = name.split('.');
    var result = splittedName
        .slice(0, splittedName.length - 1)
        .join('.') + "-" + Date.now() + "." + splittedName.slice(splittedName.length - 1);
    return result;
};
exports.transformOriginalName = transformOriginalName;
