import express from "express";
import PostController from "../controllers/postController";
import { validate } from "../middlewares/validate";
import { createPostSchema, updatePostSchema } from "../validators/postValidator";
import { authenticate } from "../middlewares/auth";
import multer from "multer";

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post("/", authenticate, upload.single("image"), validate(createPostSchema), PostController.createPost);
router.get("/", PostController.getPosts);
router.get("/:id", PostController.getPostById);
router.patch("/:id", authenticate, upload.single("image"), validate(updatePostSchema), PostController.updatePost);
router.delete("/:id", authenticate, PostController.deletePost);

export default router;
