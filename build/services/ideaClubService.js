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
exports.IdeaClubService = void 0;
const IdeaClub_1 = __importDefault(require("../models/IdeaClub"));
const appError_1 = __importDefault(require("../utils/appError"));
class IdeaClubService {
    createIdeaClub(createIdeaClubDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const newIdea = new IdeaClub_1.default(createIdeaClubDto);
            yield newIdea.save();
            return this.createIdeaClubResponse(newIdea);
        });
    }
    getIdeaClubs(page, limit, category, keyword) {
        return __awaiter(this, void 0, void 0, function* () {
            // Build dynamic filter
            const filter = {};
            if (category && typeof category === "string" && category !== "all") {
                filter.category = category;
            }
            if (keyword && typeof keyword === "string" && keyword.trim() !== "") {
                const regex = new RegExp(keyword, "i");
                filter.$or = [{ name: { $regex: regex } }, { description: { $regex: regex } }];
            }
            const categories = yield IdeaClub_1.default.distinct("category");
            const total = yield IdeaClub_1.default.countDocuments(filter);
            const ideas = yield IdeaClub_1.default.find(filter)
                .skip((page - 1) * limit)
                .limit(limit);
            return {
                ideas: ideas.map(this.createIdeaClubResponse),
                categories,
                total,
                page,
                limit,
            };
        });
    }
    getIdeaClubById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const idea = yield IdeaClub_1.default.findById(id);
            if (!idea) {
                throw new appError_1.default("Idea not found", 400);
            }
            return this.createIdeaClubResponse(idea);
        });
    }
    updateIdeaClub(id, updateIdeaClubDto) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log({ updateIdeaClubDto });
            const idea = yield IdeaClub_1.default.findByIdAndUpdate(id, updateIdeaClubDto, { new: true });
            if (!idea) {
                throw new appError_1.default("Idea not found", 400);
            }
            yield idea.save({ validateModifiedOnly: true });
            return this.createIdeaClubResponse(idea);
        });
    }
    deleteIdeaClub(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const ideas = yield IdeaClub_1.default.findByIdAndDelete(id);
            if (!ideas) {
                throw new appError_1.default("Idea not found", 400);
            }
            return this.createIdeaClubResponse(ideas);
        });
    }
    createIdeaClubResponse(idea) {
        return {
            id: idea._id.toString(),
            name: idea.name,
            description: idea.description,
            category: idea.category,
            content: idea.content,
            createdAt: idea.createdAt,
            updatedAt: idea.updatedAt,
        };
    }
}
exports.IdeaClubService = IdeaClubService;
exports.default = new IdeaClubService();
