import { Request, Response } from "express";

import { db } from "../db/index.js";
import { exercises } from "../db/schema.js"
import {  CreateExerciseInput, exerciseType } from "../schemas/exercise.schema.js"

export const getExercise = (type:exerciseType) => {
    return type
}

export const createExercise = async (req:Request, res:Response ) => {
   const {description, equipment, name, primaryMuscle, secondaryMuscle, stabilizers, type, videoUrl} = req.body as CreateExerciseInput
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
    res.status(201).json(exercise)
   }else{
    res.status(400).json({
        message: "Exercise not created"
    })
   }
}