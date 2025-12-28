"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSwagger = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const environment_1 = require("./environment");
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Business Arabic API",
      version: "1.0.0",
      description: "A comprehensive API for Business Arabic learning platform",
      contact: {
        name: "API Support",
        email: "support@businessarabic.com",
      },
    },
    servers: [
      {
        url: `http://localhost:${environment_1.config.port}`,
        description: "Development server",
      },
      {
        url: "https://your-production-domain.com",
        description: "Production server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        Error: {
          type: "object",
          properties: {
            message: {
              type: "string",
            },
            statusCode: {
              type: "number",
            },
            status: {
              type: "string",
            },
          },
        },
        User: {
          type: "object",
          properties: {
            _id: {
              type: "string",
            },
            name: {
              type: "string",
            },
            email: {
              type: "string",
            },
            role: {
              type: "string",
              enum: ["user", "admin"],
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },
        Blog: {
          type: "object",
          properties: {
            _id: {
              type: "string",
            },
            title: {
              type: "string",
            },
            content: {
              type: "string",
            },
            image: {
              type: "string",
            },
            author: {
              type: "string",
            },
            slug: {
              type: "string",
            },
            tags: {
              type: "array",
              items: {
                type: "string",
              },
            },
            isPublished: {
              type: "boolean",
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },
        Post: {
          type: "object",
          properties: {
            _id: {
              type: "string",
            },
            content: {
              type: "string",
            },
            image: {
              type: "string",
            },
            author: {
              type: "string",
            },
            likes: {
              type: "array",
              items: {
                type: "string",
              },
            },
            comments: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  author: {
                    type: "string",
                  },
                  content: {
                    type: "string",
                  },
                  createdAt: {
                    type: "string",
                    format: "date-time",
                  },
                },
              },
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },
        IdeaClub: {
          type: "object",
          properties: {
            _id: {
              type: "string",
            },
            title: {
              type: "string",
            },
            description: {
              type: "string",
            },
            image: {
              type: "string",
            },
            author: {
              type: "string",
            },
            category: {
              type: "string",
            },
            tags: {
              type: "array",
              items: {
                type: "string",
              },
            },
            votes: {
              type: "array",
              items: {
                type: "string",
              },
            },
            status: {
              type: "string",
              enum: ["pending", "approved", "rejected"],
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },
        LaunchedProject: {
          type: "object",
          properties: {
            _id: {
              type: "string",
            },
            title: {
              type: "string",
            },
            description: {
              type: "string",
            },
            image: {
              type: "string",
            },
            projectUrl: {
              type: "string",
            },
            githubUrl: {
              type: "string",
            },
            technologies: {
              type: "array",
              items: {
                type: "string",
              },
            },
            features: {
              type: "array",
              items: {
                type: "string",
              },
            },
            isActive: {
              type: "boolean",
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },
        Plan: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              example: "64a3b2c4f91d2a001e5d1234",
            },
            title: {
              type: "string",
              example: "Basic Plan",
            },
            price: {
              type: "number",
              example: 29.99,
            },
            ideas: {
              type: "array",
              description: "List of ideas included in this plan",
              items: {
                type: "string",
              },
              example: ["Idea 1", "Idea 2", "Idea 3"],
            },
            image: {
              type: "string",
              nullable: true,
              example: "https://example.com/plan.jpg",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              example: "2023-07-01T12:00:00.000Z",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              example: "2023-07-10T15:30:00.000Z",
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/routes/*.ts"], // Path to the API routes
};
const specs = (0, swagger_jsdoc_1.default)(options);
const setupSwagger = (app) => {
  app.use(
    "/api-docs",
    swagger_ui_express_1.default.serve,
    swagger_ui_express_1.default.setup(specs, {
      explorer: true,
      customCss: ".swagger-ui .topbar { display: none }",
      customSiteTitle: "Business Arabic API Documentation",
    })
  );
};
exports.setupSwagger = setupSwagger;
exports.default = specs;
