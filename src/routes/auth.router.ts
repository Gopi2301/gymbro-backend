import { validate } from '#middlewares/validate.midddleware.js';
import {Router} from 'express';
import { authController } from '#controllers/index.js';
import { SignupSchema } from '#schemas/auth.schema.js';
const router = Router();

router.post('/signup', validate(SignupSchema), authController.signup);

export const authRouter = router