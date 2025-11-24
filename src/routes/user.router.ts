import { Request, Response, Router } from "express";

import { requireAuth } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/profile", requireAuth, (req: Request, res: Response) => {
  res.status(200).json({
    message: "Profile retrieved successfully",
    user: req.user,
  });
});

export const userRouter = router;
