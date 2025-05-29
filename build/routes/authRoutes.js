"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = __importDefault(require("../controllers/authController"));
const validate_1 = require("../middlewares/validate");
const authValidator_1 = require("../validators/authValidator");
const router = express_1.default.Router();
router.post("/signup", (0, validate_1.validate)(authValidator_1.signUpSchema), authController_1.default.signUp);
router.post("/signin", (0, validate_1.validate)(authValidator_1.signInSchema), authController_1.default.signIn);
exports.default = router;
