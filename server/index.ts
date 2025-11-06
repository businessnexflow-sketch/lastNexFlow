import express, { type Request, Response, NextFunction, type Express } from "express";
// Load environment variables from .env or env in development
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

// Load standard .env first
dotenv.config({ override: true });
// Additionally load root "env" file if it exists (committed format)
(() => {
  const altEnvPath = path.resolve(process.cwd(), "env");
  if (fs.existsSync(altEnvPath)) {
    dotenv.config({ path: altEnvPath, override: true });
  }
})();
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { testGmailSMTPConnection } from './services/email';
import { createServer } from "http";

// This is for Vercel
let handler: Express | undefined = undefined;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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
  await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    console.error(err);
    res.status(status).json({ message });
  });

  // only setup vite in development, after route setup
  if (app.get("env") === "development") {
    await setupVite(app, createServer(app));
  } else {
    serveStatic(app);
  }

  // Test Gmail SMTP connection on server startup
  testGmailSMTPConnection();

  // In Vercel, we export the app and don't listen on a port
  if (!handler) {
    handler = app;
  }

  // Listen on a port when not in Vercel's serverless invocation context
  const shouldListen = app.get("env") === "development" || process.env.FORCE_LISTEN === '1';
  if (shouldListen) {
    const preferredPort = parseInt(process.env.PORT || '5000', 10);
    const tryListen = (port: number, attemptsLeft: number) => {
      const server = createServer(app);
      server.once('error', (err: any) => {
        if ((err && err.code === 'EADDRINUSE') && attemptsLeft > 0) {
          const nextPort = port + 1;
          log(`port ${port} in use, retrying on ${nextPort}…`);
          tryListen(nextPort, attemptsLeft - 1);
        } else {
          throw err;
        }
      });
      server.listen(port, () => {
        log(`serving on port ${port}`);
      });
    };
    tryListen(preferredPort, 10);
  }
})();

export default async (req: Request, res: Response, next: NextFunction) => {
  if (!handler) {
    await registerRoutes(app);
    handler = app;
  }
  return handler(req, res, next);
};
