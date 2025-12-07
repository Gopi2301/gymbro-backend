import { userController } from "#controllers/index.js";
import { requireAuth } from "#middlewares/auth.middleware.js";
import { Router } from "express";

const router = Router();

router.get("/:id", requireAuth, userController.getUser);

export const userRouter = router;
