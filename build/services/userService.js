"use strict";
// src/services/userService.ts
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
exports.UserService = void 0;
const User_1 = __importDefault(require("../models/User"));
class UserService {
    createUser(createUserDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password, fullName, role } = createUserDto;
            const existingUser = yield User_1.default.findOne({ email });
            if (existingUser) {
                throw new Error("User already exists");
            }
            const newUser = new User_1.default({
                email,
                password,
                fullName,
                role: role || "user",
            });
            yield newUser.save();
            return this.createUserResponse(newUser);
        });
    }
    getUsers(page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const total = yield User_1.default.countDocuments();
            const users = yield User_1.default.find()
                .skip((page - 1) * limit)
                .limit(limit);
            return {
                users: users.map(this.createUserResponse),
                total,
                page,
                limit,
            };
        });
    }
    getProfile(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.default.findById(id);
            if (!user) {
                throw new Error("User not found");
            }
            return this.createUserResponse(user);
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.default.findById(id);
            if (!user) {
                throw new Error("User not found");
            }
            return this.createUserResponse(user);
        });
    }
    updateUser(id, updateUserDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.default.findByIdAndUpdate(id, updateUserDto, { new: true });
            if (!user) {
                throw new Error("User not found");
            }
            return this.createUserResponse(user);
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield User_1.default.findByIdAndDelete(id);
            if (!result) {
                throw new Error("User not found");
            }
        });
    }
    createUserResponse(user) {
        return {
            id: user._id.toString(),
            email: user.email,
            fullName: user.fullName,
            role: user.role,
            createdAt: user.createdAt,
        };
    }
}
exports.UserService = UserService;
exports.default = new UserService();
