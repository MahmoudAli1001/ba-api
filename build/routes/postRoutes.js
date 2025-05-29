"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const postController_1 = __importDefault(require("../controllers/postController"));
const validate_1 = require("../middlewares/validate");
const postValidator_1 = require("../validators/postValidator");
const auth_1 = require("../middlewares/auth");
const multer_1 = __importDefault(require("multer"));
const router = express_1.default.Router();
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
router.post("/", auth_1.authenticate, upload.single("image"), (0, validate_1.validate)(postValidator_1.createPostSchema), postController_1.default.createPost);
router.get("/", postController_1.default.getPosts);
router.get("/:id", postController_1.default.getPostById);
router.patch("/:id", auth_1.authenticate, upload.single("image"), (0, validate_1.validate)(postValidator_1.updatePostSchema), postController_1.default.updatePost);
router.delete("/:id", auth_1.authenticate, postController_1.default.deletePost);
exports.default = router;
