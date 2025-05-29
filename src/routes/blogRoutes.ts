import express from "express";
import BlogController from "../controllers/blogController";
import { validate } from "../middlewares/validate";
import { createBlogSchema, updateBlogSchema, getBlogsQuerySchema } from "../validators/blogValidator";
import { authenticate, authorize } from "../middlewares/auth";

const router = express.Router();

router.post("/", authenticate, authorize(["admin"]), validate(createBlogSchema), BlogController.createBlog);
router.get("/", validate(getBlogsQuerySchema), BlogController.getBlogs);
router.get("/:id", BlogController.getBlogById);
router.patch("/:id", authenticate, authorize(["admin"]), validate(updateBlogSchema), BlogController.updateBlog);
router.delete("/:id", authenticate, authorize(["admin"]), BlogController.deleteBlog);

export default router;