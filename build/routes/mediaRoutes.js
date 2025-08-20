"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middlewares/auth");
const uploadFile_1 = require("../middlewares/uploadFile");
const mediaController_1 = __importDefault(require("../controllers/mediaController"));
const router = express_1.default.Router();
/**
 * @swagger
 * /api/media:
 *   post:
 *     tags: [Media]
 *     summary: Upload a file
 *     description: Upload an image file to Cloudinary
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - file
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Image file to upload (JPG, PNG, etc.)
 *     responses:
 *       201:
 *         description: File uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "https://res.cloudinary.com/your-cloud/image/upload/v1234567890/business-arabic-api/image.jpg"
 *       400:
 *         description: Invalid file format or missing file
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       413:
 *         description: File too large (max 5MB)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/", auth_1.authenticate, uploadFile_1.upload.single("file"), mediaController_1.default.uploadFile);
exports.default = router;
