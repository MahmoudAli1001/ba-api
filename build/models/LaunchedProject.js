"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const launchedProjectSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: String, required: true, min: 0 },
    category: { type: String, required: true },
}, { timestamps: true });
const LaunchedProject = mongoose_1.default.model("LaunchedProject", launchedProjectSchema);
exports.default = LaunchedProject;
