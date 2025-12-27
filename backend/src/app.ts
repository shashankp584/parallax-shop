import express from "express";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import authRoutes from "./routes/auth.routes";
import productsRoutes from "./routes/products.routes";
import ordersRoutes from "./routes/orders.routes";
import usersRoutes from "./routes/users.routes";
import uploadsRoutes from "./routes/uploads.routes";
import { errorHandler } from "./middleware/error.middleware";

const app = express();
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:8080",
  "http://localhost:8081",
];

app.use(helmet());
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow non-browser clients (Postman, curl)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(null, false);
    },
    credentials: true,
  })
);

app.use(express.json({ limit: "5mb" }));

app.use(
  rateLimit({
    windowMs: 60 * 1000,
    max: 200,
  })
);

// routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/uploads", uploadsRoutes);

app.use(errorHandler);

export default app;
