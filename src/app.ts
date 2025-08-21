import compression from "compression";
import cors from "cors";
import express, { Request, Response, NextFunction } from "express";

import { config } from "./config/environment";
import { setupSwagger } from "./config/swagger";
import globalErrorHandler from "./controllers/errorController";
import morganMiddleware from "./middlewares/loggingMiddleware";
import authRoutes from "./routes/authRoutes";
import mediaRoutes from "./routes/mediaRoutes";
import usersRoutes from "./routes/userRoutes";
import blogRoutes from "./routes/blogRoutes";
import ideasRoutes from "./routes/ideasRoutes";
import projectsRoutes from "./routes/projectsRoutes";
import feasibilityStudyRoutes from "./routes/feasibilityStudyRoutes";
import stripeRoutes from "./routes/stripeRoutes";

import AppError from "./utils/appError";

const app = express();

// Setup Swagger documentation
setupSwagger(app);

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  })
);

app.use(morganMiddleware);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root route
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome to Business Arabic API",
    version: "1.0.0",
    status: "running",
    endpoints: {
      health: "/health",
      auth: "/api/auth",
      users: "/api/users", 
      blog: "/api/blog",
      media: "/api/media",
      ideas: "/api/ideas",
      projects: "/api/projects",
      feasibilityStudies: "/api/feasibility-studies"
    },
    documentation: {
      swagger: "/api-docs",
      github: "https://github.com/Mohammedramadan99/ba-api"
    },
    timestamp: new Date().toISOString()
  });
});

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
app.use("/api/media", mediaRoutes);
app.use("/api/ideas", compression(), ideasRoutes);
app.use("/api/projects", compression(), projectsRoutes);
app.use("/api/feasibility-studies", compression(), feasibilityStudyRoutes);
app.use("/api/stripe", stripeRoutes);


// Stripe success and cancel endpoints
app.get("/success", (req: Request, res: Response) => {
  const sessionId = req.query.session_id;
  res.status(200).send(`<h2>Payment successful!</h2><p>Session ID: ${sessionId || "N/A"}</p>`);
});

app.get("/canceled", (req: Request, res: Response) => {
  res.status(200).send("<h2>Payment canceled.</h2>");
});

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

export default app;
