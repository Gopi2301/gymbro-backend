import { authRouter } from "#routes/auth.router.js";
import { exerciseRouter } from "#routes/exercise.router.js";
import { userRouter } from "#routes/user.router.js";
import { Router } from "express";
const router = Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/exercises", exerciseRouter);
export const apiRouter = router;

// Forced restart trigger
