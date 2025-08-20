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
exports.LaunchedProjectController = void 0;
const launchedProjectService_1 = __importDefault(require("../services/launchedProjectService"));
const cloudinaryUpload_1 = __importDefault(require("../utils/cloudinaryUpload"));
const appError_1 = __importDefault(require("../utils/appError"));
class LaunchedProjectController {
    createLaunchedProject(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let createLaunchedProjectDto = req.body;
                const file = req.file;
                if (!file) {
                    throw new appError_1.default("File is required", 400);
                }
                const uploadResult = yield (0, cloudinaryUpload_1.default)(file, "projects");
                createLaunchedProjectDto.image = uploadResult.secure_url;
                const result = yield launchedProjectService_1.default.createLaunchedProject(createLaunchedProjectDto);
                res.status(201).json(result);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getLaunchedProjects(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { page, limit, keyword } = req.query;
                const keywordStr = typeof keyword === 'string' ? keyword : '';
                const result = yield launchedProjectService_1.default.getLaunchedProjects(Number(page) || 1, Number(limit) || 10, keywordStr);
                res.status(200).json(result);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getLaunchedProjectById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const result = yield launchedProjectService_1.default.getLaunchedProjectById(id);
                res.status(200).json(result);
            }
            catch (error) {
                next(error);
            }
        });
    }
    updateLaunchedProject(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const file = req.file;
                const updateLaunchedProjectDto = req.body;
                if (file) {
                    const uploadResult = yield (0, cloudinaryUpload_1.default)(file, "projects");
                    updateLaunchedProjectDto.image = uploadResult.secure_url;
                }
                const result = yield launchedProjectService_1.default.updateLaunchedProject(id, updateLaunchedProjectDto);
                res.status(200).json(result);
            }
            catch (error) {
                next(error);
            }
        });
    }
    deleteLaunchedProject(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield launchedProjectService_1.default.deleteLaunchedProject(id);
                res.status(204).send();
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.LaunchedProjectController = LaunchedProjectController;
exports.default = new LaunchedProjectController();
