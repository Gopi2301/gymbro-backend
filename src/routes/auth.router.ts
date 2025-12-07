import { authController } from "#controllers/index.js";
import { validate } from "#middlewares/validate.middleware.js";
import { CoachSignupSchema, RefreshTokenSchema, SigninSchema, SignupSchema } from "#schemas/auth.schema.js";
import { Router } from "express";
const router = Router();

/**
 * @swagger
 * /api/v1/auth/signup:
 *   post:
 *     summary: Signup a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Signup'
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad request
 */
router.post("/signup", validate(SignupSchema), authController.signup);

/**
 * @swagger
 * /api/v1/auth/signin:
 *   post:
 *     summary: Signin an existing user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Signin'
 *     responses:
 *       200:
 *         description: User signed in successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.post("/signin", validate(SigninSchema), authController.signin);

/**
 * @swagger
 * /api/v1/auth/refresh:
 *   post:
 *     summary: Refresh the access token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RefreshToken'
 *     responses:
 *       200:
 *         description: Token refreshed successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.post("/refresh", validate(RefreshTokenSchema), authController.refresh);

/**
 * @swagger
 * /api/v1/auth/coach/signup:
 *   post:
 *     summary: Signup a new coach
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CoachSignup'
 *     responses:
 *       201:
 *         description: Coach created successfully
 *       400:
 *         description: Bad request
 */
router.post("/coach/signup", validate(CoachSignupSchema), authController.coachSignup);

export const authRouter = router;
