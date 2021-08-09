"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
var fileSchema = new Schema({
    file_name: { type: String, required: true },
    url: { type: String, required: true },
    size: { type: Number, required: true },
    format: { type: String, required: true },
    sender: { type: String },
    receiver: { type: String },
}, { timestamps: true });
exports.default = mongoose_1.default.model('File', fileSchema);
