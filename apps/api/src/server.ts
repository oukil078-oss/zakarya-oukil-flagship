import compression from "compression";
import cors from "cors";
import express, { ErrorRequestHandler } from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import morgan from "morgan";
import { env } from "./lib/env.js";
import { prisma } from "./lib/prisma.js";
import { adminRouter } from "./routes/admin.js";
import { publicRouter } from "./routes/public.js";

const app = express();
app.set("trust proxy", 1);

app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use(compression());
app.use(express.json({ limit: "120kb" }));
app.use(morgan(env.NODE_ENV === "production" ? "combined" : "dev"));
app.use(cors({
  origin(origin, callback) {
    if (!origin) return callback(null, true);
    const allowed = env.FRONTEND_ORIGIN.split(",").map((v) => v.trim());
    if (allowed.includes(origin)) return callback(null, true);
    return callback(new Error("CORS origin rejected"));
  },
  credentials: false,
}));

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 8,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { message: "Too many contact attempts. Please try again later." },
});

app.get("/health", async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: "ok", database: "connected", service: "zakarya-oukil-api", timestamp: new Date().toISOString() });
  } catch {
    res.status(503).json({ status: "degraded", database: "unavailable" });
  }
});

app.use("/api/contact", contactLimiter);
app.use("/api", publicRouter);
app.use("/api/admin", adminRouter);

app.use((_req, res) => res.status(404).json({ message: "Route not found" }));

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (typeof err?.code === "string" && err.code.startsWith("P")) {
    return res.status(400).json({ message: "Database request failed", code: err.code });
  }
  if (err?.name === "ZodError") return res.status(400).json({ message: "Validation failed", issues: err.issues });
  const status = err?.status || 500;
  const message = status >= 500 ? "Internal server error" : err.message;
  if (env.NODE_ENV !== "production") console.error(err);
  return res.status(status).json({ message });
};
app.use(errorHandler);

app.listen(env.PORT, () => {
  console.log(`Zakarya API listening on :${env.PORT}`);
});
