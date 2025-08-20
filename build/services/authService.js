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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const User_1 = __importDefault(require("../models/User"));
const appError_1 = __importDefault(require("../utils/appError"));
const jwt_1 = require("../utils/jwt");
class AuthService {
    signUp(signUpDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password, fullName, role } = signUpDto;
            const existingUser = yield User_1.default.findOne({ email });
            if (existingUser) {
                throw new appError_1.default("User already exists", 400);
            }
            const newUser = new User_1.default({
                email,
                password,
                fullName,
                role: role || "user",
            });
            yield newUser.save();
            const token = (0, jwt_1.generateToken)(newUser._id.toString());
            return this.createAuthResponse(newUser, token);
        });
    }
    signIn(signInDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = signInDto;
            const user = yield User_1.default.findOne({ email });
            if (!user) {
                throw new appError_1.default("User not found", 404);
            }
            const isPasswordValid = yield user.comparePassword(password);
            if (!isPasswordValid) {
                throw new appError_1.default("Invalid credentials", 400);
            }
            const token = (0, jwt_1.generateToken)(user._id.toString());
            return this.createAuthResponse(user, token);
        });
    }
    createAuthResponse(user, token) {
        return {
            user: {
                id: user._id.toString(),
                email: user.email,
                fullName: user.fullName,
                role: user.role,
            },
            token,
        };
    }
}
exports.AuthService = AuthService;
exports.default = new AuthService();
