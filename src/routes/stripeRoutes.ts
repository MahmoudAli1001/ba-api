import { Router } from 'express';
import { handleCreateCheckoutSession, handleCreateSubscriptionCheckoutSession, handleCreateTestCheckoutSession } from '../controllers/stripeController';

const router = Router();

// POST /create-checkout-session
/**
 * @swagger
 * /api/stripe/create-checkout-session:
 *   post:
 *     summary: Create a Stripe Checkout session
 *     tags: [Stripe]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               priceId:
 *                 type: string
 *                 example: price_1234
 *               quantity:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Checkout session created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 url:
 *                   type: string
 *                   example: https://checkout.stripe.com/pay/cs_test_123
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *
 * /api/stripe/create-subscription-checkout-session:
 *   post:
 *     summary: Create a Stripe Subscription Checkout session
 *     tags: [Stripe]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               interval:
 *                 type: string
 *                 enum: [month, year]
 *                 example: month
 *               unit_amount:
 *                 type: integer
 *                 example: 1500
 *               name:
 *                 type: string
 *                 example: Pro Membership
 *               description:
 *                 type: string
 *                 example: Monthly subscription for Pro features
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["https://picsum.photos/200/300"]
 *     responses:
 *       200:
 *         description: Subscription checkout session created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 url:
 *                   type: string
 *                   example: https://checkout.stripe.com/pay/cs_test_sub_789
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *
 * /api/stripe/create-test-checkout-session:
 *   post:
 *     summary: Create a Stripe test Checkout session for different scenarios
 *     tags: [Stripe]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               testScenario:
 *                 type: string
 *                 enum: [success, card_decline, insufficient_funds, processing_error]
 *                 example: success
 *     responses:
 *       200:
 *         description: Test checkout session created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 url:
 *                   type: string
 *                   example: https://checkout.stripe.com/pay/cs_test_456
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 */

router.post('/create-checkout-session', handleCreateCheckoutSession);

// POST /create-test-checkout-session
router.post('/create-test-checkout-session', handleCreateTestCheckoutSession);

// POST /create-subscription-checkout-session
router.post('/create-subscription-checkout-session', handleCreateSubscriptionCheckoutSession);

export default router;
