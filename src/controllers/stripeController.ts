import { createCheckoutSession, createTestCheckoutSession,createSubscriptionCheckoutSession } from '../utils/stripe';
import { Request, Response } from 'express';

export const handleCreateCheckoutSession = (req: Request, res: Response) => {
  return createCheckoutSession(req, res);
};

export const handleCreateTestCheckoutSession = (req: Request, res: Response) => {
  return createTestCheckoutSession(req, res);
};

export const handleCreateSubscriptionCheckoutSession = (req: Request, res: Response) => {
  return createSubscriptionCheckoutSession(req, res);
};
