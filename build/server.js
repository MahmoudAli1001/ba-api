"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const database_1 = require("./config/database");
const environment_1 = require("./config/environment");
const logger_1 = __importDefault(require("./utils/logger"));
const PORT = environment_1.config.port;
process.on('uncaughtException', (err) => {
    console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    logger_1.default.error('UNCAUGHT EXCEPTION! Occurred 💥 Shutting down...', {
        error: err,
    });
    console.log(err.name, err.message);
    process.exit(1);
});
// Connect to database
(0, database_1.connectDatabase)().then(() => {
    logger_1.default.info('Database connected successfully');
});
const server = app_1.default.listen(PORT, () => {
    logger_1.default.info(`Server in ${environment_1.config.nodeEnv} mode started successfully using port ${PORT}`);
    console.log(`Server running in ${environment_1.config.nodeEnv} mode on port ${PORT}`);
});
process.on('unhandledRejection', (err) => {
    console.log('UNHANDLED REJECTION! 💥 Shutting down...');
    logger_1.default.error('UNHANDLED REJECTION! Occurred 💥 Server Shutting down...', {
        error: err,
    });
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});
process.on('SIGTERM', () => {
    console.info('SIGTERM signal received.');
    console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
    server.close(() => {
        console.log('💥 Process terminated!');
        process.exit(0);
    });
});
