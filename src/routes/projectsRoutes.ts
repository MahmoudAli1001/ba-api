import express from "express";
import launchedProjectController from "../controllers/launchedProjectController";
import { validate } from "../middlewares/validate";
import {
  createLaunchedProjectSchema,
  getLaunchedProjectsQuerySchema,
  updateLaunchedProjectSchema,
} from "../validators/launchedProjectValidator";
import { authenticate, authorize } from "../middlewares/auth";
import multer from "multer";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post(
  "/",
  authenticate,
  authorize(["admin"]),
  upload.single("image"),
  validate(createLaunchedProjectSchema),
  launchedProjectController.createLaunchedProject
);

router.get("/", validate(getLaunchedProjectsQuerySchema), launchedProjectController.getLaunchedProjects);

router.get("/:id", launchedProjectController.getLaunchedProjectById);
router.patch(
  "/:id",
  authenticate,
  authorize(["admin"]),
  upload.single("image"),
  validate(updateLaunchedProjectSchema),
  launchedProjectController.updateLaunchedProject
);
router.delete("/:id", authenticate, authorize(["admin"]), launchedProjectController.deleteLaunchedProject);

export default router;
