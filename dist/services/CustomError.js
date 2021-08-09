"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var CustomError = /** @class */ (function (_super) {
    __extends(CustomError, _super);
    function CustomError(code, status, message) {
        var _this = _super.call(this) || this;
        _this.code = code;
        _this.status = status;
        _this.message = message;
        return _this;
    }
    CustomError.alreadyExists = function (errorMessage, status) {
        if (errorMessage === void 0) { errorMessage = 'Resource already exists'; }
        if (status === void 0) { status = 'failed'; }
        return new CustomError(209, status, errorMessage);
    };
    CustomError.notFound = function (errorMessage, status) {
        if (errorMessage === void 0) { errorMessage = 'Resource not found'; }
        if (status === void 0) { status = 'failed'; }
        return new CustomError(404, status, errorMessage);
    };
    CustomError.invalidCredentials = function (errorMessage, status) {
        if (errorMessage === void 0) { errorMessage = 'Invalid credentails'; }
        if (status === void 0) { status = 'failed'; }
        return new CustomError(401, status, errorMessage);
    };
    CustomError.unAuthorized = function (errorMessage) {
        if (errorMessage === void 0) { errorMessage = "Unauthorized. Access denied"; }
        return new CustomError(401, 'failed', errorMessage);
    };
    CustomError.badRequest = function (errorMessage) {
        if (errorMessage === void 0) { errorMessage = "Bad Request"; }
        return new CustomError(400, 'failed', errorMessage);
    };
    CustomError.serverError = function (errorMessage) {
        if (errorMessage === void 0) { errorMessage = "Internal server error"; }
        return new CustomError(500, 'failed', errorMessage);
    };
    return CustomError;
}(Error));
exports.default = CustomError;
