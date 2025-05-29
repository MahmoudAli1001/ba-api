// src/middlewares/auth.ts

import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import User from "../models/User";

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
}

export const authenticate = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new Error("Please authenticate.");
    }

    const decoded = verifyToken(token);
    const user = await User.findById(decoded?.userId);

    if (!user) {
      throw new Error("Please authenticate.");
    }

    req.user = { id: user._id.toString(), role: user.role };
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate." });
  }
};

export const authorize = (roles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).send({ error: "Please authenticate." });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).send({ error: "Not authorized to access this resource." });
    }

    next();
  };
};
