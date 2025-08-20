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
const uploadFile_1 = require("../middlewares/uploadFile");
const router = express_1.default.Router();
router.post("/", auth_1.authenticate, (0, auth_1.authorize)(["admin"]), uploadFile_1.upload.single("image"), (0, validate_1.validate)(launchedProjectValidator_1.createLaunchedProjectSchema), launchedProjectController_1.default.createLaunchedProject);
router.get("/", (0, validate_1.validate)(launchedProjectValidator_1.getLaunchedProjectsQuerySchema), launchedProjectController_1.default.getLaunchedProjects);
router.get("/:id", launchedProjectController_1.default.getLaunchedProjectById);
router.patch("/:id", auth_1.authenticate, (0, auth_1.authorize)(["admin"]), uploadFile_1.upload.single("image"), (0, validate_1.validate)(launchedProjectValidator_1.updateLaunchedProjectSchema), launchedProjectController_1.default.updateLaunchedProject);
router.delete("/:id", auth_1.authenticate, (0, auth_1.authorize)(["admin"]), launchedProjectController_1.default.deleteLaunchedProject);
exports.default = router;
