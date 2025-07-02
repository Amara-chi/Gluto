//server/index.ts
import dotenv from 'dotenv';
dotenv.config();
import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { connectDB } from "./db"; // Import MongoDB connection

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Request logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  // Connect to MongoDB before setting up routes
  try {
    await connectDB();
    log("Successfully connected to MongoDB");
  } catch (error) {
    log(`Failed to connect to MongoDB: ${error}`, "error");
    process.exit(1);
  }

  const server = await registerRoutes(app);

  // Error handling middleware
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    log(`Error: ${status} - ${message}`, "error");
  });

  // Setup Vite in development, serve static files in production
  if (app.get("env") === "development") {
    await setupVite(app, server);
    log("Vite development server initialized");
  } else {
    serveStatic(app);
    log("Serving static production files");
  }

  // Start the server
  const port = process.env.PORT || 5000;
  server.listen(port, () => {
  log(`Server running on port ${port}`);
  log(`Environment: ${app.get("env")}`);
});
})();

// Handle unhandled promise rejections
process.on("unhandledRejection", (err: Error) => {
  log(`Unhandled Rejection: ${err.message}`, "error");
});

// Handle uncaught exceptions
process.on("uncaughtException", (err: Error) => {
  log(`Uncaught Exception: ${err.message}`, "error");
  process.exit(1);
});