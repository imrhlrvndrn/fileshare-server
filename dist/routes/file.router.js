"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var controllers_1 = require("../controllers");
var middlewares_1 = require("../middlewares");
var router = express_1.default.Router();
var upload = controllers_1.fileController.upload, getFileById = controllers_1.fileController.getFileById, downloadFileById = controllers_1.fileController.downloadFileById, shareViaEmail = controllers_1.fileController.shareViaEmail;
router.route('/upload').post(middlewares_1.uploadFile.single('uploadedFile'), upload);
router.route('/:fileId').get(getFileById);
router.route('/:fileId/download').get(downloadFileById);
router.route('/email').post(shareViaEmail);
exports.default = router;
