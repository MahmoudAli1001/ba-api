import express from "express";
import feasibilityStudyController from "../controllers/feasibilityStudyController";
import { validate } from "../middlewares/validate";
import { authenticate } from "../middlewares/auth";
import { 
  createFeasibilityStudySchema, 
  updateFeasibilityStudySchema, 
  feasibilityStudyIdSchema,
  searchFeasibilityStudySchema
} from "../validators/feasibilityStudyValidator";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     FeasibilityStudy:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - image
 *         - price
 *         - category
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier
 *         name:
 *           type: string
 *           description: Name of the feasibility study
 *           example: "E-commerce Platform Study"
 *         description:
 *           type: string
 *           description: Detailed description of the study
 *           example: "Comprehensive feasibility study for launching an e-commerce platform targeting SMEs"
 *         image:
 *           type: string
 *           description: Image URL for the study
 *           example: "https://res.cloudinary.com/dwwuju96g/image/upload/v1754487500/business-arabic/ecommerce_study.jpg"
 *         price:
 *           type: string
 *           description: Price of the feasibility study
 *           example: "500"
 *         category:
 *           type: string
 *           description: Category of the study
 *           example: "Technology"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Creation timestamp
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Last update timestamp
 *     CreateFeasibilityStudy:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - image
 *         - price
 *         - category
 *       properties:
 *         name:
 *           type: string
 *           example: "E-commerce Platform Study"
 *         description:
 *           type: string
 *           example: "Comprehensive feasibility study for launching an e-commerce platform targeting SMEs"
 *         image:
 *           type: string
 *           example: "https://res.cloudinary.com/dwwuju96g/image/upload/v1754487500/business-arabic/ecommerce_study.jpg"
 *         price:
 *           type: string
 *           example: "500"
 *         category:
 *           type: string
 *           example: "Technology"
 */

/**
 * @swagger
 * /api/feasibility-studies:
 *   get:
 *     tags: [Feasibility Studies]
 *     summary: Get all feasibility studies
 *     description: Retrieve all feasibility studies sorted by creation date (newest first)
 *     responses:
 *       200:
 *         description: Feasibility studies retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 results:
 *                   type: number
 *                   example: 5
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/FeasibilityStudy'
 */
router.get("/", feasibilityStudyController.getAllFeasibilityStudies);

/**
 * @swagger
 * /api/feasibility-studies/search:
 *   get:
 *     tags: [Feasibility Studies]
 *     summary: Search feasibility studies
 *     description: Search feasibility studies by name, description, or category
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *           example: "technology"
 *         description: Search query
 *     responses:
 *       200:
 *         description: Search results
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 results:
 *                   type: number
 *                   example: 3
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/FeasibilityStudy'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 */
router.get("/search", feasibilityStudyController.searchFeasibilityStudies);

/**
 * @swagger
 * /api/feasibility-studies/category/{category}:
 *   get:
 *     tags: [Feasibility Studies]
 *     summary: Get feasibility studies by category
 *     description: Retrieve all feasibility studies in a specific category
 *     parameters:
 *       - in: path
 *         name: category
 *         required: true
 *         schema:
 *           type: string
 *           example: "Technology"
 *         description: Category name
 *     responses:
 *       200:
 *         description: Feasibility studies retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 results:
 *                   type: number
 *                   example: 2
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/FeasibilityStudy'
 */
router.get("/category/:category", feasibilityStudyController.getFeasibilityStudiesByCategory);

/**
 * @swagger
 * /api/feasibility-studies/{id}:
 *   get:
 *     tags: [Feasibility Studies]
 *     summary: Get feasibility study by ID
 *     description: Retrieve a specific feasibility study by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "60d5ecb74b24c72d88e4f1a5"
 *         description: Feasibility study ID
 *     responses:
 *       200:
 *         description: Feasibility study retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   $ref: '#/components/schemas/FeasibilityStudy'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */
router.get("/:id", validate(feasibilityStudyIdSchema), feasibilityStudyController.getFeasibilityStudyById);

/**
 * @swagger
 * /api/feasibility-studies:
 *   post:
 *     tags: [Feasibility Studies]
 *     summary: Create new feasibility study
 *     description: Create a new feasibility study (requires authentication)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateFeasibilityStudy'
 *     responses:
 *       201:
 *         description: Feasibility study created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "Feasibility study created successfully"
 *                 data:
 *                   $ref: '#/components/schemas/FeasibilityStudy'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */
router.post("/", authenticate, validate(createFeasibilityStudySchema), feasibilityStudyController.createFeasibilityStudy);

/**
 * @swagger
 * /api/feasibility-studies/{id}:
 *   put:
 *     tags: [Feasibility Studies]
 *     summary: Update feasibility study
 *     description: Update an existing feasibility study (requires authentication)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "60d5ecb74b24c72d88e4f1a5"
 *         description: Feasibility study ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated E-commerce Platform Study"
 *               description:
 *                 type: string
 *                 example: "Updated comprehensive feasibility study"
 *               image:
 *                 type: string
 *                 example: "https://res.cloudinary.com/dwwuju96g/image/upload/v1754487500/business-arabic/updated_study.jpg"
 *               price:
 *                 type: string
 *                 example: "600"
 *               category:
 *                 type: string
 *                 example: "Technology"
 *     responses:
 *       200:
 *         description: Feasibility study updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "Feasibility study updated successfully"
 *                 data:
 *                   $ref: '#/components/schemas/FeasibilityStudy'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */
router.put("/:id", authenticate, validate(feasibilityStudyIdSchema), validate(updateFeasibilityStudySchema), feasibilityStudyController.updateFeasibilityStudy);

/**
 * @swagger
 * /api/feasibility-studies/{id}:
 *   delete:
 *     tags: [Feasibility Studies]
 *     summary: Delete feasibility study
 *     description: Delete a feasibility study (requires authentication)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "60d5ecb74b24c72d88e4f1a5"
 *         description: Feasibility study ID
 *     responses:
 *       200:
 *         description: Feasibility study deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "Feasibility study deleted successfully"
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */
router.delete("/:id", authenticate, validate(feasibilityStudyIdSchema), feasibilityStudyController.deleteFeasibilityStudy);

export default router;
