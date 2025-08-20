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
exports.IdeaClubController = void 0;
const ideaClubService_1 = __importDefault(require("../services/ideaClubService"));
const imageService_1 = __importDefault(require("../services/imageService"));
class IdeaClubController {
    createIdeaClub(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { file } = req;
                const createIdeaClubDto = req.body;
                const ideaContent = yield JSON.parse(createIdeaClubDto.content);
                let image;
                if (file) {
                    image = yield imageService_1.default.uploadImage(file);
                }
                const result = yield ideaClubService_1.default.createIdeaClub(Object.assign(Object.assign({}, createIdeaClubDto), { content: ideaContent }));
                res.status(201).json(result);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getIdeaClubs(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { page, limit, category, keyword } = req.query;
                const categoryStr = typeof category === 'string' ? category : '';
                const keywordStr = typeof keyword === 'string' ? keyword : '';
                const result = yield ideaClubService_1.default.getIdeaClubs(Number(page) || 1, Number(limit) || 10, categoryStr, keywordStr);
                res.status(200).json(result);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getIdeaClubById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const result = yield ideaClubService_1.default.getIdeaClubById(id);
                res.status(200).json(result);
            }
            catch (error) {
                next(error);
            }
        });
    }
    updateIdeaClub(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const updateIdeaClubDto = {
                    content: JSON.parse(req.body.content),
                    name: req.body.name,
                    description: req.body.description,
                    category: req.body.category,
                };
                console.log({ updateIdeaClubDto });
                const result = yield ideaClubService_1.default.updateIdeaClub(id, updateIdeaClubDto);
                res.status(200).json(result);
            }
            catch (error) {
                next(error);
            }
        });
    }
    deleteIdeaClub(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const ideas = yield ideaClubService_1.default.deleteIdeaClub(id);
                res.status(200).send(ideas);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.IdeaClubController = IdeaClubController;
exports.default = new IdeaClubController();
