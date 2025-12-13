import { requireAuth, requireRole } from "#middlewares/auth.middleware.js";
import { validate } from "#middlewares/validate.middleware.js";
import { createExerciseSchema, exerciseQuerySchema } from "#schemas/exercise.schema.js";
import { Router } from "express";

import { createExercise, getExercise } from "../controllers/exercise.controller.js";

const router = Router();

router.get("/", validate(exerciseQuerySchema), getExercise);
/**
* @swagger
* /api/v1/exercise/:
*   get:
*     summary: Get all exercises
*     parameters:
*       - name: primaryMuscle
*         in: query
*         required: false
*         schema:
*           type: string
*       - name: type
*         in: query
*         required: false
*         schema:
*           type: string
*     responses:
*       200:
*         description: List of exercises
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Exercise'

 */
router.post("/create", requireAuth, requireRole(["superadmin"]), validate(createExerciseSchema), createExercise);
/**
* @swagger
* /api/v1/exercise/create:
*   post:
*     summary: Create a new exercise
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Exercise'
*     parameters:
*       - name: Authorization
*         in: header
*         required: true
*         schema:
*           type: string
*     responses:
*       201:
*         description: Exercise created successfully
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Exercise'
 */

export const exerciseRouter = router;
