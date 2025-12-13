import { and, eq } from "drizzle-orm";
import { Request, Response } from "express";

import { db } from "../db/index.js";
import { exercises } from "../db/schema.js"
import {  CreateExerciseInput, ExerciseQueryInput, exerciseTypeZodEnum, muscleGroupZodEnum } from "../schemas/exercise.schema.js"

export const getExerciseMeta = (req: Request, res: Response) => {
    const muscleGroups = muscleGroupZodEnum.options;
    const exerciseTypes = exerciseTypeZodEnum.options;
    
    res.status(200).json({
        exerciseTypes,
        muscleGroups
    });
}

export const getExercise = async (req: Request, res: Response) => {
    try {
        const { primaryMuscle, type } = req.query as ExerciseQueryInput;

        const whereConditions = [];
        if (primaryMuscle) {
            whereConditions.push(eq(exercises.primaryMuscle, primaryMuscle));
        }
        if (type) {
            whereConditions.push(eq(exercises.type, type));
        }

        const data = await db.select()
            .from(exercises)
            .where(and(...whereConditions));

        res.status(200).json(data);
    } catch (error) {
        console.error("Error fetching exercises FULL:", JSON.stringify(error, null, 2));
        console.error("Error message:", error instanceof Error ? error.message : String(error));
        res.status(500).json({ error: String(error), message: "Failed to fetch exercises" });
    }
}

export const createExercise = async (req:Request, res:Response ) => {
   const {description, equipment, name, primaryMuscle, secondaryMuscle, stabilizers, type, videoUrl} = req.body as CreateExerciseInput
   try {
       const exercise = await db.insert(exercises).values({
        description,
        equipment,
        name,
        primaryMuscle,
        secondaryMuscle,
        stabilizers,
        type,
        videoUrl,
        
       }).returning(); // Added returning() to get the inserted object back
       
       if(exercise.length > 0){
        res.status(201).json(exercise[0]) // Return the single object
       }else{
        res.status(400).json({
            message: "Exercise not created"
        })
       }
   } catch (error) {
       console.error("Error creating exercise:", error);
       res.status(500).json({ message: "Internal server error" });
   }
}