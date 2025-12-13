import { requireAuth, requireRole } from "#middlewares/auth.middleware.js";
import { validate, validateQuery } from "#middlewares/validate.middleware.js";
import { createExerciseSchema, exerciseQuerySchema } from "#schemas/exercise.schema.js";
import { Router } from "express";

import { createExercise, getExercise, getExerciseMeta } from "../controllers/exercise.controller.js";

const router = Router();

// Route for getting metadata (muscle groups, types) - MUST be before /:id or general / if there were parameterized routes conflicting, effectively specialized routes first
router.get("/meta", requireAuth,getExerciseMeta);

/**
 * @swagger
 * /api/v1/exercises/meta:
 *   get:
 *     summary: Get exercise metadata (muscle groups, types)
 *     responses:
 *       200:
 *         description: Object containing valid muscle groups and exercise types
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 muscleGroups:
 *                   type: array
 *                   items:
 *                     type: string
 *                 exerciseTypes:
 *                   type: array
 *                   items:
 *                     type: string
 */

router.get("/", validateQuery(exerciseQuerySchema), getExercise);
/**
* @swagger
* /api/v1/exercises/:
*   get:
*     summary: Get all exercises with optional filtering
*     parameters:
*       - name: primaryMuscle
*         in: query
*         required: false
*         schema:
*           type: string
*           enum: [chest, back, shoulders, biceps, triceps, quadriceps, hamstrings, glutes, calves, abs, forearms, traps, cardio_system, core]
*       - name: type
*         in: query
*         required: false
*         schema:
*           type: string
*           enum: [compound, isolation, cardio, plyometric, stretching]
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
* /api/v1/exercises/create:
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
