import express from "express";
import { authenticate } from "../middlewares/auth";
import multer from "multer";
import mediaController from "../controllers/mediaController";

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post("/", authenticate, upload.single("file"), mediaController.uploadFile);

export default router;
