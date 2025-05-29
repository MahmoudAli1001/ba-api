import express from "express";
import UserController from "../controllers/userController";
import { validate } from "../middlewares/validate";
import { createUserSchema, updateUserSchema } from "../validators/userValidator";
import { authenticate, authorize } from "../middlewares/auth";

const router = express.Router();

router.post("/", authenticate, authorize(["admin"]), validate(createUserSchema), UserController.createUser);
router.get("/", authenticate, authorize(["admin"]), UserController.getUsers);
router.get("/me", authenticate, UserController.getProfile);
router.get("/:id", authenticate, authorize(["admin"]), UserController.getUserById);
router.patch("/:id", authenticate, authorize(["admin"]), validate(updateUserSchema), UserController.updateUser);
router.delete("/:id", authenticate, authorize(["admin"]), UserController.deleteUser);

export default router;
