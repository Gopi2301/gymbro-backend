import { authController } from "#controllers/index.js";
import { validate } from "#middlewares/validate.middleware.js";
import { SigninSchema, SignupSchema } from "#schemas/auth.schema.js";
import { Router } from "express";
const router = Router();

router.post("/signup", validate(SignupSchema), authController.signup);
router.post("/signin", validate(SigninSchema), authController.signin);
export const authRouter = router;
