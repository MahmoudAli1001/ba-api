"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middlewares/auth");
const multer_1 = __importDefault(require("multer"));
const mediaController_1 = __importDefault(require("../controllers/mediaController"));
const router = express_1.default.Router();
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
router.post("/", auth_1.authenticate, upload.single("file"), mediaController_1.default.uploadFile);
exports.default = router;
