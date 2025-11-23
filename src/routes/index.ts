import { authRouter } from "#routes/auth.router.js";
import { Router } from "express";
const router = Router();

router.use("/auth", authRouter);
export const apiRouter = router;
