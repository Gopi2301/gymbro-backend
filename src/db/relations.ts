import {
  coachTable,
  userRoutines,
  usersTable,
  workoutLogs,
  workoutSets,
} from "#db/schema.js";
import {
  exercises,
  routineExercises,
  routines,
  routineSplits,
} from "#schemas/exercise.schema.js";
import { relations } from "drizzle-orm";

// User Relations
export const userRelations = relations(usersTable, ({ many }) => ({
  routines: many(userRoutines),
  workoutLogs: many(workoutLogs),
}));

// Coach Relations  
export const coachRelations = relations(coachTable, ({ many }) => ({
  routines: many(routines),
}));

// Routine Relations (extended from exercise.schema.ts)
export const extendedRoutineRelations = relations(routines, ({ many, one }) => ({
  coach: one(coachTable, {
    fields: [routines.coachId],
    references: [coachTable.id],
  }),
  splits: many(routineSplits),
  userRoutines: many(userRoutines),
}));

// User-Routine Relations
export const userRoutineRelations = relations(userRoutines, ({ one }) => ({
  routine: one(routines, {
    fields: [userRoutines.routineId],
    references: [routines.id],
  }),
  user: one(usersTable, {
    fields: [userRoutines.userId],
    references: [usersTable.id],
  }),
}));

// Workout Log Relations
export const workoutLogRelations = relations(workoutLogs, ({ many, one }) => ({
  exercise: one(exercises, {
    fields: [workoutLogs.exerciseId],
    references: [exercises.id],
  }),
  routineExercise: one(routineExercises, {
    fields: [workoutLogs.routineExerciseId],
    references: [routineExercises.id],
  }),
  sets: many(workoutSets),
  user: one(usersTable, {
    fields: [workoutLogs.userId],
    references: [usersTable.id],
  }),
}));

// Workout Set Relations
export const workoutSetRelations = relations(workoutSets, ({ one }) => ({
  workoutLog: one(workoutLogs, {
    fields: [workoutSets.workoutLogId],
    references: [workoutLogs.id],
  }),
}));
