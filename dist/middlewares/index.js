"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.uploadFile = void 0;
var multer_middleware_1 = require("./multer.middleware");
Object.defineProperty(exports, "uploadFile", { enumerable: true, get: function () { return multer_middleware_1.uploadFile; } });
var error_middleware_1 = require("./error.middleware");
Object.defineProperty(exports, "errorHandler", { enumerable: true, get: function () { return error_middleware_1.errorHandler; } });
