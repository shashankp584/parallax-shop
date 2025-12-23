import { Router } from "express";
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/products.controller";
import { authMiddleware, adminOnly } from "../middleware/auth.middleware";

const router = Router();

router.get("/", getProducts);
router.get("/:id", getProduct);
router.post("/", authMiddleware, adminOnly, createProduct);
router.put("/:id", authMiddleware, adminOnly, updateProduct);
router.delete("/:id", authMiddleware, adminOnly, deleteProduct);

export default router;
