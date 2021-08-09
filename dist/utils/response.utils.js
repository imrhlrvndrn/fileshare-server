"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.successResponse = exports.errorResponse = void 0;
var errorResponse = function (res, _a) {
    var _b = _a.code, code = _b === void 0 ? 500 : _b, _c = _a.message, message = _c === void 0 ? 'Internal Server Error' : _c, _d = _a.status, status = _d === void 0 ? 'failed' : _d;
    return res.status(+code).json({
        statusCode: +code,
        message: message,
        status: status,
    });
};
exports.errorResponse = errorResponse;
var successResponse = function (res, _a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.code, code = _c === void 0 ? 200 : _c, _d = _b.success, success = _d === void 0 ? true : _d, _e = _b.data, data = _e === void 0 ? {} : _e, _f = _b.toast, toast = _f === void 0 ? { status: 'success', message: 'Successful operation' } : _f;
    return res.status(code).json({
        code: code,
        success: success,
        data: data,
        toast: toast,
    });
};
exports.successResponse = successResponse;
