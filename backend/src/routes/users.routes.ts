import { Router } from "express";
import { me, listUsers } from "../controllers/users.controller";
import { authMiddleware, adminOnly } from "../middleware/auth.middleware";

const router = Router();

router.get("/me", authMiddleware, me);
router.get("/", authMiddleware, adminOnly, listUsers);

export default router;
