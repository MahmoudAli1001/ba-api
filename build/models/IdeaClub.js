"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ideaClubSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    content: [
        {
            type: Map,
            of: mongoose_1.default.Schema.Types.Mixed,
        },
    ],
    category: { type: String, required: true },
}, { timestamps: true });
const IdeaClub = mongoose_1.default.model("IdeaClub", ideaClubSchema);
exports.default = IdeaClub;
