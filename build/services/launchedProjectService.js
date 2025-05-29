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
exports.LaunchedProjectService = void 0;
const LaunchedProject_1 = __importDefault(require("../models/LaunchedProject"));
class LaunchedProjectService {
    createLaunchedProject(createLaunchedProjectDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const newProject = new LaunchedProject_1.default(createLaunchedProjectDto);
            yield newProject.save();
            return this.createLaunchedProjectResponse(newProject);
        });
    }
    getLaunchedProjects(page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const total = yield LaunchedProject_1.default.countDocuments();
            const projects = yield LaunchedProject_1.default.find()
                .skip((page - 1) * limit)
                .limit(limit);
            return {
                projects: projects.map(this.createLaunchedProjectResponse),
                total,
                page,
                limit,
            };
        });
    }
    getLaunchedProjectById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const project = yield LaunchedProject_1.default.findById(id);
            if (!project) {
                throw new Error("Project not found");
            }
            return this.createLaunchedProjectResponse(project);
        });
    }
    updateLaunchedProject(id, updateLaunchedProjectDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const project = yield LaunchedProject_1.default.findByIdAndUpdate(id, updateLaunchedProjectDto, { new: true });
            if (!project) {
                throw new Error("Project not found");
            }
            return this.createLaunchedProjectResponse(project);
        });
    }
    deleteLaunchedProject(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield LaunchedProject_1.default.findByIdAndDelete(id);
            if (!result) {
                throw new Error("Project not found");
            }
        });
    }
    createLaunchedProjectResponse(project) {
        return {
            id: project._id.toString(),
            name: project.name,
            description: project.description,
            category: project.category,
            image: project.image,
            price: project.price,
            createdAt: project.createdAt
        };
    }
}
exports.LaunchedProjectService = LaunchedProjectService;
exports.default = new LaunchedProjectService();
