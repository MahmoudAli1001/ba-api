"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("../controllers/userController"));
const validate_1 = require("../middlewares/validate");
const userValidator_1 = require("../validators/userValidator");
const auth_1 = require("../middlewares/auth");
const router = express_1.default.Router();
router.post("/", auth_1.authenticate, (0, auth_1.authorize)(["admin"]), (0, validate_1.validate)(userValidator_1.createUserSchema), userController_1.default.createUser);
router.get("/", auth_1.authenticate, (0, auth_1.authorize)(["admin"]), userController_1.default.getUsers);
router.get("/me", auth_1.authenticate, userController_1.default.getProfile);
router.get("/:id", auth_1.authenticate, (0, auth_1.authorize)(["admin"]), userController_1.default.getUserById);
router.patch("/:id", auth_1.authenticate, (0, auth_1.authorize)(["admin"]), (0, validate_1.validate)(userValidator_1.updateUserSchema), userController_1.default.updateUser);
router.delete("/:id", auth_1.authenticate, (0, auth_1.authorize)(["admin"]), userController_1.default.deleteUser);
exports.default = router;
