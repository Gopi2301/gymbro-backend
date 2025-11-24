import { authRouter } from "#routes/auth.router.js";
import { userRouter } from "#routes/user.router.js";
import { Router } from "express";
const router = Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);
export const apiRouter = router;
