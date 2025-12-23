import { Router } from "express";
import { createOrder, listOrders, getOrder, updateOrder } from "../controllers/orders.controller";
import { authMiddleware, adminOnly } from "../middleware/auth.middleware";

const router = Router();

router.post("/", authMiddleware, createOrder);
router.get("/", authMiddleware, adminOnly, listOrders);
router.get("/:id", authMiddleware, getOrder);
router.put("/:id", authMiddleware, adminOnly, updateOrder);

export default router;
