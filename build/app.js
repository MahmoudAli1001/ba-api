"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const environment_1 = require("./config/environment");
const swagger_1 = require("./config/swagger");
const errorController_1 = __importDefault(require("./controllers/errorController"));
const loggingMiddleware_1 = __importDefault(require("./middlewares/loggingMiddleware"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const mediaRoutes_1 = __importDefault(require("./routes/mediaRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const blogRoutes_1 = __importDefault(require("./routes/blogRoutes"));
const ideasRoutes_1 = __importDefault(require("./routes/ideasRoutes"));
const projectsRoutes_1 = __importDefault(require("./routes/projectsRoutes"));
const appError_1 = __importDefault(require("./utils/appError"));
const app = (0, express_1.default)();
// Setup Swagger documentation
(0, swagger_1.setupSwagger)(app);
app.use((0, cors_1.default)({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
}));
app.use(loggingMiddleware_1.default);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Root route
app.get("/", (req, res) => {
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
            projects: "/api/projects"
        },
        documentation: {
            swagger: "/api-docs",
            github: "https://github.com/Mohammedramadan99/ba-api"
        },
        timestamp: new Date().toISOString()
    });
});
app.get("/health", (req, res) => {
    res.status(200).json({
        status: "OK",
        message: "Server is running",
        timestamp: new Date().toISOString(),
        environment: environment_1.config.nodeEnv,
    });
});
app.use("/api/auth", authRoutes_1.default);
app.use("/api/users", userRoutes_1.default);
app.use("/api/blog", (0, compression_1.default)(), blogRoutes_1.default);
app.use("/api/media", mediaRoutes_1.default);
app.use("/api/ideas", (0, compression_1.default)(), ideasRoutes_1.default);
app.use("/api/projects", (0, compression_1.default)(), projectsRoutes_1.default);
app.all("*", (req, res, next) => {
    next(new appError_1.default(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(errorController_1.default);
exports.default = app;
