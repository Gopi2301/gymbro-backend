import { boolean, integer, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

// Export exercise-related tables and enums
export {
  equipmentEnum,
  equipmentZodEnum,
  type ExerciseQueryInput,
  exerciseQuerySchema,
  exercises,
  exerciseTypeEnum,
  exerciseTypeZodEnum,
  muscleGroupEnum,
  muscleGroupZodEnum,
  routineExerciseRelations,
  routineExercises,
  routineRelations,
  routines,
  routineSplits,
  splitsRelations,
} from "#schemas/exercise.schema.js";

// Export types separately
export type { equipmentType, exerciseType, muscleGroupType } from "#schemas/exercise.schema.js";

export const usersTable = pgTable("users", {
  age: integer("age"),
  createdAt: timestamp("created_at").defaultNow(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  email_verified: boolean("email_verified").notNull().default(false),
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  phone_verified: boolean("phone_verified").notNull().default(false),
  role: varchar("role", { length: 255 }).notNull(),
  updatedAt: timestamp("updated_at").defaultNow().$onUpdateFn(() => new Date()),
});

export const coachTable = pgTable("coach", {
  createdAt: timestamp("created_at").defaultNow(),
  gymAddress: varchar("gymAddress", { length: 255 }).notNull(),
  gymName: varchar("gymName", { length: 255 }).notNull(),
  id: uuid("id").defaultRandom().primaryKey(),
  members: varchar("members", { length: 255 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  phone_verified: boolean("phone_verified").notNull().default(false),
  role: varchar("role", { length: 255 }).notNull(),
  updatedAt: timestamp("updated_at").defaultNow().$onUpdateFn(() => new Date()),
  work_email: varchar("work_email", { length: 255 }).notNull().unique(),
});

export const superAdminTable = pgTable("super_admin", {
  createdAt: timestamp("created_at").defaultNow(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  role: varchar("role", { length: 255 }).notNull().default("superadmin"),
  updatedAt: timestamp("updated_at").defaultNow().$onUpdateFn(() => new Date()),
});

// User-Routine relationship (users picking routines)
export const userRoutines = pgTable("user_routines", {
  assignedAt: timestamp("assigned_at").defaultNow(),
  id: uuid("id").defaultRandom().primaryKey(),
  routineId: uuid("routine_id").notNull(), // FK defined in relations
  startedAt: timestamp("started_at"),
  userId: uuid("user_id").notNull(), // FK defined in relations
});

// Workout logs for tracking user progress
export const workoutLogs = pgTable("workout_logs", {
  completedAt: timestamp("completed_at").defaultNow(),
  exerciseId: uuid("exercise_id"), // FK defined in relations
  id: uuid("id").defaultRandom().primaryKey(),
  notes: varchar("notes", { length: 500 }),
  routineExerciseId: uuid("routine_exercise_id"), // FK defined in relations
  userId: uuid("user_id").notNull(), // FK defined in relations
});

// Individual sets within a workout log
export const workoutSets = pgTable("workout_sets", {
  id: uuid("id").defaultRandom().primaryKey(),
  reps: integer("reps").notNull(),
  rpe: integer("rpe"), // Rate of Perceived Exertion
  setNumber: integer("set_number").notNull(),
  weight: integer("weight"), // in kg or lbs
  workoutLogId: uuid("workout_log_id").notNull(), // FK defined in relations
});

