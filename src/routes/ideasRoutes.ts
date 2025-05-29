import express from "express";
import IdeaClubController from "../controllers/ideaClubController";
import { validate } from "../middlewares/validate";
import { createIdeaClubSchema, getIdeaClubQuerySchema, updateIdeaClubSchema } from "../validators/ideaClubValidator";
import { authenticate, authorize } from "../middlewares/auth";
import multer from "multer";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post(
  "/",
  authenticate,
  authorize(["admin"]),
  upload.single("image"),
  validate(createIdeaClubSchema),
  IdeaClubController.createIdeaClub
);
router.get("/", validate(getIdeaClubQuerySchema), IdeaClubController.getIdeaClubs);

router.get("/:id", IdeaClubController.getIdeaClubById);
router.patch(
  "/:id",
  authenticate,
  authorize(["admin"]),
  upload.single("image"),
  validate(updateIdeaClubSchema),
  IdeaClubController.updateIdeaClub
);
router.delete("/:id", authenticate, authorize(["admin"]), IdeaClubController.deleteIdeaClub);

export default router;
