import compression from "compression";
import cors from "cors";
import express, { Request, Response, NextFunction } from "express";

import { config } from "./config/environment";
import globalErrorHandler from "./controllers/errorController";
import morganMiddleware from "./middlewares/loggingMiddleware";
import authRoutes from "./routes/authRoutes";
import mediaRoute from "./routes/mediaRoutes";
import usersRoutes from "./routes/userRoutes";
import blogRoutes from "./routes/blogRoutes";
import ideasRoutes from "./routes/ideasRoutes";
import projectsRoutes from "./routes/projectsRoutes";

import AppError from "./utils/appError";

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  })
);

app.use(morganMiddleware);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    status: "OK",
    message: "Server is running",
    timestamp: new Date().toISOString(),
    environment: config.nodeEnv,
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/blog", compression(), blogRoutes);
app.use("/api/media", mediaRoute);
app.use("/api/ideas", compression(), ideasRoutes);
app.use("/api/projects", compression(), projectsRoutes);

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

export default app;
