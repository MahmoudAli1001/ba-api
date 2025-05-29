"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ideaClubController_1 = __importDefault(require("../controllers/ideaClubController"));
const validate_1 = require("../middlewares/validate");
const ideaClubValidator_1 = require("../validators/ideaClubValidator");
const auth_1 = require("../middlewares/auth");
const multer_1 = __importDefault(require("multer"));
const router = express_1.default.Router();
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
router.post("/", auth_1.authenticate, (0, auth_1.authorize)(["admin"]), upload.single("image"), (0, validate_1.validate)(ideaClubValidator_1.createIdeaClubSchema), ideaClubController_1.default.createIdeaClub);
router.get("/", (0, validate_1.validate)(ideaClubValidator_1.getIdeaClubQuerySchema), ideaClubController_1.default.getIdeaClubs);
router.get("/:id", ideaClubController_1.default.getIdeaClubById);
router.patch("/:id", auth_1.authenticate, (0, auth_1.authorize)(["admin"]), upload.single("image"), (0, validate_1.validate)(ideaClubValidator_1.updateIdeaClubSchema), ideaClubController_1.default.updateIdeaClub);
router.delete("/:id", auth_1.authenticate, (0, auth_1.authorize)(["admin"]), ideaClubController_1.default.deleteIdeaClub);
exports.default = router;
