"use strict";
// src/middlewares/auth.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = exports.authenticate = void 0;
const jwt_1 = require("../utils/jwt");
const User_1 = __importDefault(require("../models/User"));
const authenticate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
        if (!token) {
            throw new Error("Please authenticate.");
        }
        const decoded = (0, jwt_1.verifyToken)(token);
        const user = yield User_1.default.findById(decoded === null || decoded === void 0 ? void 0 : decoded.userId);
        if (!user) {
            throw new Error("Please authenticate.");
        }
        req.user = { id: user._id.toString(), role: user.role };
        next();
    }
    catch (error) {
        res.status(401).send({ error: "Please authenticate." });
    }
});
exports.authenticate = authenticate;
const authorize = (roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).send({ error: "Please authenticate." });
        }
        if (!roles.includes(req.user.role)) {
            return res.status(403).send({ error: "Not authorized to access this resource." });
        }
        next();
    };
};
exports.authorize = authorize;
