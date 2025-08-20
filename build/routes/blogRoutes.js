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
/**
 * @swagger
 * /api/blog:
 *   get:
 *     tags: [Blogs]
 *     summary: Get all blog posts
 *     description: Retrieve all published blog posts with pagination
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search term for title or content
 *     responses:
 *       200:
 *         description: List of blog posts
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Blog'
 *   post:
 *     tags: [Blogs]
 *     summary: Create a new blog post
 *     description: Create a new blog post (Admin only)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *                 example: "مقدمة في اللغة العربية للأعمال"
 *               content:
 *                 type: string
 *                 example: "محتوى المقال باللغة العربية..."
 *               image:
 *                 type: string
 *                 example: "https://cloudinary.com/image.jpg"
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["أعمال", "لغة", "تعليم"]
 *     responses:
 *       201:
 *         description: Blog created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   $ref: '#/components/schemas/Blog'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 */
router.get("/", (0, validate_1.validate)(blogValidator_1.getBlogsQuerySchema), blogController_1.default.getBlogs);
router.post("/", auth_1.authenticate, (0, auth_1.authorize)(["admin"]), (0, validate_1.validate)(blogValidator_1.createBlogSchema), blogController_1.default.createBlog);
/**
 * @swagger
 * /api/blog/{id}:
 *   get:
 *     tags: [Blogs]
 *     summary: Get blog post by ID
 *     description: Retrieve a specific blog post by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Blog post ID
 *     responses:
 *       200:
 *         description: Blog post details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   $ref: '#/components/schemas/Blog'
 *       404:
 *         description: Blog post not found
 *   patch:
 *     tags: [Blogs]
 *     summary: Update blog post
 *     description: Update a blog post (Admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Blog post ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               image:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *               isPublished:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Blog updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   $ref: '#/components/schemas/Blog'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 *       404:
 *         description: Blog post not found
 *   delete:
 *     tags: [Blogs]
 *     summary: Delete blog post
 *     description: Delete a blog post (Admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Blog post ID
 *     responses:
 *       204:
 *         description: Blog deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 *       404:
 *         description: Blog post not found
 */
router.get("/:id", blogController_1.default.getBlogById);
router.patch("/:id", auth_1.authenticate, (0, auth_1.authorize)(["admin"]), (0, validate_1.validate)(blogValidator_1.updateBlogSchema), blogController_1.default.updateBlog);
router.delete("/:id", auth_1.authenticate, (0, auth_1.authorize)(["admin"]), blogController_1.default.deleteBlog);
exports.default = router;
