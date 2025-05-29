import express from "express";
import AuthController from "../controllers/authController";
import { validate } from "../middlewares/validate";
import { signUpSchema, signInSchema } from "../validators/authValidator";

const router = express.Router();

router.post("/signup", validate(signUpSchema), AuthController.signUp);
router.post("/signin", validate(signInSchema), AuthController.signIn);

export default router;
