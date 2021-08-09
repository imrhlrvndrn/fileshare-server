"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SENDINBLUE_SMTP_LOGIN = exports.SENDINBLUE_SMTP_PASSWORD = exports.SENDINBLUE_SMTP_PORT = exports.SENDINBLUE_SMTP_SERVER = exports.CLOUDINARY_API_CLOUD_NAME = exports.CLOUDINARY_API_SECRET = exports.CLOUDINARY_API_KEY = exports.MONGODB_URI = exports.CLIENT_URL = exports.PORT = exports.connectDB = void 0;
var env_1 = __importDefault(require("./env"));
var db_1 = require("./db");
Object.defineProperty(exports, "connectDB", { enumerable: true, get: function () { return db_1.connectDB; } });
exports.PORT = env_1.default.PORT, exports.CLIENT_URL = env_1.default.CLIENT_URL, exports.MONGODB_URI = env_1.default.MONGODB_URI, exports.CLOUDINARY_API_KEY = env_1.default.CLOUDINARY_API_KEY, exports.CLOUDINARY_API_SECRET = env_1.default.CLOUDINARY_API_SECRET, exports.CLOUDINARY_API_CLOUD_NAME = env_1.default.CLOUDINARY_API_CLOUD_NAME, exports.SENDINBLUE_SMTP_SERVER = env_1.default.SENDINBLUE_SMTP_SERVER, exports.SENDINBLUE_SMTP_PORT = env_1.default.SENDINBLUE_SMTP_PORT, exports.SENDINBLUE_SMTP_PASSWORD = env_1.default.SENDINBLUE_SMTP_PASSWORD, exports.SENDINBLUE_SMTP_LOGIN = env_1.default.SENDINBLUE_SMTP_LOGIN;
