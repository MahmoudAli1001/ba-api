import { config } from "../config/environment";
const stripe = require("stripe")(config.stripe.SECRET_KEY);
import { Request, Response } from "express";
import payment from "../models/payment";

import Stripe from "stripe";
/**
 * Creates a Stripe Checkout session for a one-time payment.
 * @param {Request} req - The request object containing product details.
 * @param {Response} res - The response object to send the session URL.
 * @returns {Promise<void>}
 */

//create stripe web hook

import { AuthenticatedRequest } from "../middlewares/auth";
import createPaymentNumber from "./createPayNamber";

const createCheckoutSession = async (req: AuthenticatedRequest, res: Response) => {
  const domain = req.headers.origin;
  const userId = req.params?.id || req?.user?.id;
  const { serviceId, serviceType, name, description, image, price} =
    req.body;

  if (!serviceId || !serviceType) {
    return res
      .status(400)
      .json({ error: "serviceId and serviceType required" });
  }

  // if (!name || !description || !image || !price ) {
  //   return res.status(400).json({
  //     error: "Missing required fields",
  //   });
  // }
  const line_items = [
    {
      price_data: {
        currency: "aed",
        product_data: {
          name,
          description,
        
          images: [image],
        },
        unit_amount: price * 100,
      },

      quantity: 1,
    },
  ];

  try {
    const session = await stripe.checkout.sessions.create({
      line_items,
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:3000/canceled`,
    });

    // احفظ session في DB كـ pending
    if (!userId || !serviceId) {
      return res.status(400).json({ error: "userId and serviceId are required for payment creation" });
    }
    if (typeof userId !== "string" || typeof serviceId !== "string") {
      return res.status(400).json({ error: "userId and serviceId must be valid strings for payment creation" });
    }
    
    await payment.create({
      payNumber: createPaymentNumber(userId, serviceId),
      userId,
      serviceId,
      serviceType,
      amount: price,
      stripeSessionId: session.id,
      status: "pending",
    });

    // Return the session URL instead of redirecting
    res.status(200).json({
      url: session.url,
      id: session.id,
      message: "Checkout session created successfully",
    });
  } catch (error) {
    res
      .status(400)
      .json({ error: error, message: "Failed to create checkout session" });
  }
};

const stripeWebHook = async (req: Request, res: Response) => {
  const sig = req.headers["stripe-signature"];
  const endpointSecret = config.stripe.WEBHOOK_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err: any) {
    console.error("Webhook Error: " + err.message);
    return res.status(400).send("Webhook Error: " + err.message);
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object as Stripe.Checkout.Session;
      await payment.findOneAndUpdate(
        { stripeSessionId: session.id },
        { status: "completed" }
      );
      break;
    case "checkout.session.async_payment_failed":
      const failedSession = event.data.object as Stripe.Checkout.Session;
      await payment.findOneAndUpdate(
        { stripeSessionId: failedSession.id },
        { status: "failed" }
      );
      break;
    default:
      console.warn(`Unhandled event type: ${event.type}`);
  }

  res.json({ received: true });
};

// Test specific endpoint to simulate different payment scenarios
const createTestCheckoutSession = async (req: Request, res: Response) => {
  const domain = req.headers.origin;
  const { testScenario } = req.body;

  // Amount to simulate different test scenarios
  let amount = 2000; // Default $20.00

  // Use test amounts to simulate specific scenarios
  // See: https://docs.stripe.com/terminal/references/testing#physical-test-cards
  switch (testScenario) {
    case "card_decline":
      amount = 2000.02; // Test card decline
      break;
    case "insufficient_funds":
      amount = 2000.03; // Test insufficient funds
      break;
    case "processing_error":
      amount = 2000.05; // Test processing error
      break;
    default:
      amount = 2000; // Successful payment
  }

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "T-shirt",
              images: ["https://picsum.photos/200/300"],
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:3000/canceled`,
    });

    res.json({ url: session.url });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};



const createSubscriptionCheckoutSession = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const domain = req.headers.origin;
  const userId = req?.user?.id;
  const { serviceId, serviceType, name, description, image, price, category } = req.body;

  if (!serviceId || !serviceType) {
    return res.status(400).json({ error: "serviceId and serviceType required" });
  }
  if (!name || !description || !image || !price || !category) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  const line_items = [
    {
      price_data: {
        currency: "aed",
        product_data: {
          name,
          description,
          category,
          images: [image],
        },
        recurring: {
          interval: "month",
          interval_count: 1,
        },
        unit_amount: price,
      },
      quantity: 1,
    },
  ];

  try {
    const session = await stripe.checkout.sessions.create({
      line_items,
      payment_method_types: ["card"],
      mode: "subscription",
      success_url: `${domain}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${domain}/canceled`,
    });

    if (typeof userId !== "string" || typeof serviceId !== "string") {
      return res.status(400).json({ error: "userId and serviceId must be valid strings for payment creation" });
    }
    // احفظ session في DB كـ pending
    await payment.create({
      payNumber: createPaymentNumber(userId, serviceId),
      userId,
      serviceId,
      serviceType,
      amount: price,
      stripeSessionId: session.id,
      status: "pending",
    });

    res.status(200).json({
      url: session.url,
      id: session.id,
      message: "Subscription checkout session created successfully",
    });
  } catch (error) {
    res.status(400).json({ error: error, message: "Failed to create subscription checkout session" });
  }
};

export {
  createCheckoutSession,
  createTestCheckoutSession,
  createSubscriptionCheckoutSession,
    stripeWebHook
};
