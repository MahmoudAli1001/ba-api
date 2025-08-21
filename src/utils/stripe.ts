import { config } from "../config/environment";
const stripe = require("stripe")(config.stripe.SECRET_KEY);
import { Request, Response } from "express";

// price_data:{
//   currency: "usd",
//   product_data: {
//     name: "T-shirt",
//     images: ["https://example.com/t-shirt.png"],
//   },
//   unit_amount: 2000,
// }

const createCheckoutSession = async (req: Request, res: Response) => {
  const domain = req.headers.origin;



const { name, description, image, price, category } = req.body; 
if (!name || !description || !image || !price || !category) {
    return res.status(400).json({
      error: "Missing required fields: name, description, image, price, category",
    });
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
      unit_amount: price,
    },
  
    quantity: 1, 
  },
];

  try {
    const session = await stripe.checkout.sessions.create({
      line_items,
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `${domain}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${domain}/canceled`,
    });

    // Return the session URL instead of redirecting
    res
      .status(200)
      .json({
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
      success_url: `${domain}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${domain}/canceled`,
    });

    res.json({ url: session.url });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

const createSubscriptionCheckoutSession = async (req: Request, res: Response) => {
  const domain = req.headers.origin;

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Pro Membership",
              description: "Monthly subscription for Pro features",
              images: ["https://picsum.photos/200/300"],
            },
            recurring: {
              interval: "month",
              interval_count: 1,
            },
            unit_amount: 1500, // $15.00/month
          },
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${domain}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${domain}/canceled`,
    });

    res.json({ url: session.url });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export { createCheckoutSession, createTestCheckoutSession, createSubscriptionCheckoutSession };
