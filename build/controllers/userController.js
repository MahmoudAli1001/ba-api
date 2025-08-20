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
exports.UserController = void 0;
const userService_1 = __importDefault(require("../services/userService"));
class UserController {
    createUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createUserDto = req.body;
                const result = yield userService_1.default.createUser(createUserDto);
                res.status(201).json(result);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getUsers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { page, limit, fullName } = req.query;
                const result = yield userService_1.default.getUsers(Number(page) || 1, Number(limit) || 10, fullName || "");
                res.status(200).json(result);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getProfile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // @ts-ignore
                const { id } = req.user;
                const result = yield userService_1.default.getProfile(id);
                res.status(200).json(result);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getUserById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const result = yield userService_1.default.getUserById(id);
                res.status(200).json(result);
            }
            catch (error) {
                next(error);
            }
        });
    }
    updateUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const updateUserDto = req.body;
                const result = yield userService_1.default.updateUser(id, updateUserDto);
                res.status(200).json(result);
            }
            catch (error) {
                next(error);
            }
        });
    }
    deleteUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield userService_1.default.deleteUser(id);
                res.status(204).send();
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.UserController = UserController;
exports.default = new UserController();
