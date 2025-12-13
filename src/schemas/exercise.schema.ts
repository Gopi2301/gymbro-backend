import { relations } from "drizzle-orm";
import { boolean, decimal, integer, jsonb, pgEnum, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import z from "zod";

// Drizzle ORM enums for database schema
export const muscleGroupEnum = pgEnum('muscle_group',[
    'chest', 'back', 'shoulders', 'biceps', 'triceps', 'quadriceps','hamstrings', 'glutes', 'calves', 'abs', 'forearms', 'traps', 'cardio_system', 'core'
])

export const exerciseTypeEnum = pgEnum('exercise_type', [
'compound',
'isolation',
'cardio',
'plyometric',
'stretching'
])

export const equipmentEnum = pgEnum('equipment', [
    'barbell', 'dumbbell', 'kettlebell', 'medicine ball', 'plate', 'rope', 'sled', 'tire', 'weight plate', 'body weight', 'other'
])

// Zod enums for validation (mirroring the Drizzle enums)
export const muscleGroupZodEnum = z.enum([
    'chest', 'back', 'shoulders', 'biceps', 'triceps', 'quadriceps','hamstrings', 'glutes', 'calves', 'abs', 'forearms', 'traps','core', 'cardio_system'
])

export const exerciseTypeZodEnum = z.enum([
    'compound',
    'isolation',
    'cardio',
    'plyometric',
    'stretching'
])

export const equipmentZodEnum = z.enum([
    'barbell', 'dumbbell', 'kettlebell', 'medicine ball', 'plate', 'rope', 'sled', 'tire', 'weight plate', 'body weight', 'other'
])

// Type exports
export type equipmentType = z.infer<typeof equipmentZodEnum>;
export type exerciseType = z.infer<typeof exerciseTypeZodEnum>;
export type muscleGroupType = z.infer<typeof muscleGroupZodEnum>;

// Zod schema for validating exercise queries
export const exerciseQuerySchema = z.object({
  equipment: equipmentZodEnum.optional(),
  primaryMuscle: muscleGroupZodEnum.optional(), // Made optional for filtering
  secondaryMuscle: muscleGroupZodEnum.optional(),
  stabilizers: muscleGroupZodEnum.optional(),
  type: exerciseTypeZodEnum.optional(), // Made optional for filtering
})

export type ExerciseQueryInput = z.infer<typeof exerciseQuerySchema>;

export const createExerciseSchema = z.object({
  description: z.string().optional(),
  equipment: equipmentZodEnum,
  name: z.string().min(1),
  primaryMuscle: muscleGroupZodEnum,
  secondaryMuscle: z.preprocess((val) => (typeof val === 'string' ? [val] : val), z.array(muscleGroupZodEnum).optional()),
  stabilizers: z.preprocess((val) => (typeof val === 'string' ? [val] : val), z.array(muscleGroupZodEnum).optional()),
  type: exerciseTypeZodEnum,
  videoUrl: z.string().optional(),
});

export type CreateExerciseInput = z.infer<typeof createExerciseSchema>;

export const exercises = pgTable('exercises', {
   createdAt: timestamp('created_at').defaultNow(),
   createdBy: uuid('created_by'), // Super admin who created this exercise
   description:text('description'),
   equipment:equipmentEnum('equipment').notNull(),
   id: uuid('id').defaultRandom().primaryKey(),
   name:varchar('name').notNull(),
   primaryMuscle:muscleGroupEnum('primary_muscle').notNull(),
   secondaryMuscle:jsonb('secondary_muscle').$type <string[]>(),
   stabilizers: jsonb('stabilizers').$type <string[]>(),
   type:exerciseTypeEnum('type').notNull(),
   updatedAt: timestamp('updated_at').defaultNow().$onUpdateFn(() => new Date()),
   videoUrl: text('video_url'),
})  

export const routines = pgTable('routines', {
  coachId: uuid('coach_id').notNull(), // Will add reference after importing coachTable
  createdAt: timestamp('created_at').defaultNow(),
  description: text('description'),
  difficultyLevel: varchar('difficulty_level', { enum: ['beginner', 'intermediate', 'advanced'] }),
  id: uuid('id').defaultRandom().primaryKey(),
  isPremium: boolean('is_premium').default(false),
  isPublic: boolean('is_public').default(false),
  name: varchar('name', { length: 255 }).notNull(), 
  price: decimal('price', { precision: 10, scale: 2 }),
  updatedAt: timestamp('updated_at').defaultNow().$onUpdateFn(() => new Date()),
})

export const routineSplits = pgTable('routine_splits',{
    dayOrder: integer('day_order').notNull().default(1),
    id: uuid('id').defaultRandom().primaryKey(),
    isRestDay: boolean('is_rest_day').default(false),
    name: varchar('name', { length: 255 }).notNull(),
    routineId: uuid('routine_id').references(()=> routines.id, {onDelete: 'cascade'}).notNull(),
})

export const routineExercises = pgTable('routine_exercises',{
    coachNotes: text('coach_notes'),
    exerciseId: uuid('exercise_id').references(()=> exercises.id, {onDelete:'cascade'}),
    id: uuid('id').defaultRandom().primaryKey(),
    orderIndex: integer('order_index').notNull(),
    reps:varchar('reps', {length:50}).notNull(),
    restTimeSeconds:integer('rest_time_seconds'),
    rpeTarget:integer('rpe_target'),
    sets: integer('sets').notNull(),
    splitId: uuid('split_id').references(()=> routineSplits.id, {onDelete:'cascade'}),
    tempo:varchar('tempo', {length:50})
})

export const routineRelations = relations(routines, ({many}) => ({
    splits: many(routineSplits),
    // Note: coach relation will be added when we import coachTable to avoid circular dependency
}))

export const splitsRelations = relations(routineSplits,({many, one})=>({
    exercises: many(routineExercises),
    routine: one(routines,{
        fields: [routineSplits.routineId],
        references: [routines.id]
    })
}))

export const routineExerciseRelations = relations(routineExercises,({one})=>({
    exercise: one(exercises,{
        fields: [routineExercises.exerciseId],
        references: [exercises.id]
    }),
    split: one(routineSplits,{  
        fields: [routineExercises.splitId],
        references: [routineSplits.id]
    })
}))