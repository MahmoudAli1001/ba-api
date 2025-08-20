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
const uploadFile_1 = require("../middlewares/uploadFile");
const router = express_1.default.Router();
router.post("/", auth_1.authenticate, uploadFile_1.upload.single("image"), (0, validate_1.validate)(postValidator_1.createPostSchema), postController_1.default.createPost);
router.get("/", postController_1.default.getPosts);
router.get("/:id", postController_1.default.getPostById);
router.patch("/:id", auth_1.authenticate, uploadFile_1.upload.single("image"), (0, validate_1.validate)(postValidator_1.updatePostSchema), postController_1.default.updatePost);
router.delete("/:id", auth_1.authenticate, postController_1.default.deletePost);
exports.default = router;
