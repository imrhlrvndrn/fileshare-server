"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cors_1 = __importDefault(require("cors"));
var dotenv_1 = __importDefault(require("dotenv"));
var express_1 = __importDefault(require("express"));
// config
var config_1 = require("./config");
// importing routes
var routes_1 = require("./routes");
// importing middlwares
var middlewares_1 = require("./middlewares");
var services_1 = require("./services");
services_1.Cloudinary.configure();
dotenv_1.default.config();
var app = express_1.default();
config_1.connectDB();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(cors_1.default({ origin: ['http://localhost:3000'] }));
// routes
app.use('/api/files', routes_1.fileRoutes);
// error handling
app.use(middlewares_1.errorHandler);
app.listen(config_1.PORT, function () { return console.log("Server running on PORT " + config_1.PORT); });
