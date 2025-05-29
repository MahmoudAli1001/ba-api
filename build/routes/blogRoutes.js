"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const blogController_1 = __importDefault(require("../controllers/blogController"));
const validate_1 = require("../middlewares/validate");
const blogValidator_1 = require("../validators/blogValidator");
const auth_1 = require("../middlewares/auth");
const router = express_1.default.Router();
router.post("/", auth_1.authenticate, (0, auth_1.authorize)(["admin"]), (0, validate_1.validate)(blogValidator_1.createBlogSchema), blogController_1.default.createBlog);
router.get("/", (0, validate_1.validate)(blogValidator_1.getBlogsQuerySchema), blogController_1.default.getBlogs);
router.get("/:id", blogController_1.default.getBlogById);
router.patch("/:id", auth_1.authenticate, (0, auth_1.authorize)(["admin"]), (0, validate_1.validate)(blogValidator_1.updateBlogSchema), blogController_1.default.updateBlog);
router.delete("/:id", auth_1.authenticate, (0, auth_1.authorize)(["admin"]), blogController_1.default.deleteBlog);
exports.default = router;
