"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var https_1 = __importDefault(require("https"));
var models_1 = require("../models");
var config_1 = require("../config");
var services_1 = require("../services");
var utils_1 = require("../utils");
var fileShare_template_1 = require("../templates/fileShare.template");
var fileController = {
    upload: function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var uploadedFile, original_name, secure_url, format, bytes, newFile, savedFile, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log({
                        body: req.body,
                        file: req.file,
                    });
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    if (!req.file)
                        return [2 /*return*/, services_1.CustomError.badRequest('Please select a valid file')];
                    return [4 /*yield*/, services_1.Cloudinary.upload(req, next)];
                case 2:
                    uploadedFile = _a.sent();
                    if (!uploadedFile)
                        return [2 /*return*/, services_1.CustomError.badRequest('Please select a valid file')];
                    original_name = req.file.originalname;
                    secure_url = uploadedFile.secure_url, format = uploadedFile.format, bytes = uploadedFile.bytes;
                    newFile = new models_1.File({
                        file_name: "" + utils_1.transformOriginalName(original_name),
                        url: secure_url,
                        format: format,
                        size: bytes,
                    });
                    return [4 /*yield*/, newFile.save()];
                case 3:
                    savedFile = _a.sent();
                    return [2 /*return*/, utils_1.successResponse(res, {
                            data: {
                                file: {
                                    _id: savedFile.id,
                                    download_url: config_1.CLIENT_URL + "/download/" + savedFile.id,
                                },
                            },
                            toast: {
                                message: 'File uploaded successfully',
                                status: 'success',
                            },
                        })];
                case 4:
                    error_1 = _a.sent();
                    console.error(error_1);
                    return [2 /*return*/, next(error_1)];
                case 5: return [2 /*return*/];
            }
        });
    }); },
    getFileById: function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var fileId, returnedFile, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    fileId = req.params.fileId;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, models_1.File.findById(fileId)];
                case 2:
                    returnedFile = _a.sent();
                    if (!returnedFile)
                        return [2 /*return*/, next(services_1.CustomError.notFound("File doesn't exist"))];
                    return [2 /*return*/, utils_1.successResponse(res, {
                            data: {
                                file: returnedFile,
                            },
                        })];
                case 3:
                    error_2 = _a.sent();
                    console.error(error_2);
                    return [2 /*return*/, next(error_2)];
                case 4: return [2 /*return*/];
            }
        });
    }); },
    downloadFileById: function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var fileId, returnedFile, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    fileId = req.params.fileId;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, models_1.File.findById(fileId)];
                case 2:
                    returnedFile = _a.sent();
                    if (!returnedFile)
                        return [2 /*return*/, next(services_1.CustomError.notFound("File doesn't exist"))];
                    https_1.default.get(returnedFile.url, function (fileStream) { return fileStream.pipe(res); });
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _a.sent();
                    console.error(error_3);
                    return [2 /*return*/, next(error_3)];
                case 4: return [2 /*return*/];
            }
        });
    }); },
    shareViaEmail: function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, emailFrom, emailTo, fileId, returnedFile, transporter, file_name, size, fileSize, downloadUrl, mailOptions, messageId, error_4;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, emailFrom = _a.emailFrom, emailTo = _a.emailTo, fileId = _a.fileId;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 5, , 6]);
                    return [4 /*yield*/, models_1.File.findById(fileId)];
                case 2:
                    returnedFile = _b.sent();
                    if (!returnedFile)
                        return [2 /*return*/, next(services_1.CustomError.notFound("File doesn't exist. Please reupload and try again"))];
                    transporter = services_1.Nodemailer.createTransporter();
                    file_name = returnedFile.file_name, size = returnedFile.size;
                    fileSize = "" + (size / 1000000).toFixed(2);
                    downloadUrl = config_1.CLIENT_URL + "/download/" + fileId;
                    mailOptions = {
                        from: emailFrom,
                        to: emailTo,
                        subject: "FileShare | " + emailFrom + " Shared a file with you",
                        text: "This file was shared using FileShare",
                        html: fileShare_template_1.generateFileShareTemplate({
                            emailFrom: emailFrom,
                            emailTo: emailTo,
                            downloadUrl: downloadUrl,
                            fileName: file_name,
                            fileSize: fileSize,
                        }),
                    };
                    return [4 /*yield*/, services_1.Nodemailer.sendEmail(transporter, mailOptions)];
                case 3:
                    messageId = _b.sent();
                    if (!messageId)
                        return [2 /*return*/, next(services_1.CustomError.serverError("Couldn't send the file via email. Please try again"))];
                    returnedFile.sender = emailFrom;
                    returnedFile.receiver = emailTo;
                    return [4 /*yield*/, returnedFile.save()];
                case 4:
                    _b.sent();
                    return [2 /*return*/, utils_1.successResponse(res, {
                            data: {
                                message: 'File shared via email',
                            },
                        })];
                case 5:
                    error_4 = _b.sent();
                    console.error(error_4);
                    return [2 /*return*/, next(error_4)];
                case 6: return [2 /*return*/];
            }
        });
    }); },
};
exports.default = fileController;
