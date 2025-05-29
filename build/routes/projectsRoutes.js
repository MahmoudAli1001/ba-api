"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const launchedProjectController_1 = __importDefault(require("../controllers/launchedProjectController"));
const validate_1 = require("../middlewares/validate");
const launchedProjectValidator_1 = require("../validators/launchedProjectValidator");
const auth_1 = require("../middlewares/auth");
const multer_1 = __importDefault(require("multer"));
const router = express_1.default.Router();
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
router.post("/", auth_1.authenticate, (0, auth_1.authorize)(["admin"]), upload.single("image"), (0, validate_1.validate)(launchedProjectValidator_1.createLaunchedProjectSchema), launchedProjectController_1.default.createLaunchedProject);
router.get("/", (0, validate_1.validate)(launchedProjectValidator_1.getLaunchedProjectsQuerySchema), launchedProjectController_1.default.getLaunchedProjects);
router.get("/:id", launchedProjectController_1.default.getLaunchedProjectById);
router.patch("/:id", auth_1.authenticate, (0, auth_1.authorize)(["admin"]), upload.single("image"), (0, validate_1.validate)(launchedProjectValidator_1.updateLaunchedProjectSchema), launchedProjectController_1.default.updateLaunchedProject);
router.delete("/:id", auth_1.authenticate, (0, auth_1.authorize)(["admin"]), launchedProjectController_1.default.deleteLaunchedProject);
exports.default = router;
