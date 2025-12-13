# GymBro Database Schema

## Entity Relationship Diagram (Text Format)

```
┌─────────────────┐
│  super_admin    │
├─────────────────┤
│ id (uuid) PK    │
│ email           │
│ name            │
│ role            │
│ createdAt       │
│ updatedAt       │
└────────┬────────┘
         │
         │ creates
         │
         ▼
┌─────────────────┐
│   exercises     │◄──────────────────┐
├─────────────────┤                   │
│ id (uuid) PK    │                   │
│ createdBy (uuid)│                   │
│ name            │                   │
│ description     │                   │
│ primaryMuscle   │                   │
│ secondaryMuscle │                   │
│ stabilizers     │                   │
│ type            │                   │
│ equipment       │                   │
│ videoUrl        │                   │
│ createdAt       │                   │
│ updatedAt       │                   │
└────────┬────────┘                   │
         │                            │
         │ used in                    │
         │                            │
         ▼                            │
┌─────────────────┐                   │
│routine_exercises│                   │
├─────────────────┤                   │
│ id (uuid) PK    │                   │
│ splitId (uuid)  │                   │
│ exerciseId(uuid)│───────────────────┘
│ sets            │
│ reps            │
│ restTimeSeconds │
│ rpeTarget       │
│ tempo           │
│ orderIndex      │
│ coachNotes      │
└────────▲────────┘
         │
         │ belongs to
         │
┌────────┴────────┐
│ routine_splits  │
├─────────────────┤
│ id (uuid) PK    │
│ routineId (uuid)│
│ name            │
│ dayOrder        │
│ isRestDay       │
└────────▲────────┘
         │
         │ part of
         │
┌────────┴────────┐
│    routines     │
├─────────────────┤
│ id (uuid) PK    │
│ coachId (uuid)  │◄─────────┐
│ name            │           │
│ description     │           │
│ difficultyLevel │           │
│ isPublic        │           │
│ isPremium       │           │
│ price           │           │
│ createdAt       │           │
│ updatedAt       │           │
└────────┬────────┘           │
         │                    │
         │                    │ created by
         │                    │
         │              ┌─────┴──────┐
         │              │   coach    │
         │              ├────────────┤
         │              │ id (uuid)PK│
         │              │ name       │
         │              │ work_email │
         │              │ gymName    │
         │              │ gymAddress │
         │              │ members    │
         │              │ role       │
         │              │phone_verif.│
         │              │ createdAt  │
         │              │ updatedAt  │
         │              └────────────┘
         │
         │ assigned to
         │
         ▼
┌─────────────────┐
│ user_routines   │
├─────────────────┤
│ id (uuid) PK    │
│ userId (uuid)   │◄─────────┐
│ routineId (uuid)│           │
│ assignedAt      │           │
│ startedAt       │           │
└─────────────────┘           │
                              │
                              │
                        ┌─────┴──────┐
                        │   users    │
                        ├────────────┤
                        │ id (uuid)PK│
                        │ email      │
                        │ name       │
                        │ age        │
                        │ role       │
                        │email_verif.│
                        │phone_verif.│
                        │ createdAt  │
                        │ updatedAt  │
                        └─────┬──────┘
                              │
                              │ logs workouts
                              │
                              ▼
                        ┌─────────────────┐
                        │  workout_logs   │
                        ├─────────────────┤
                        │ id (uuid) PK    │
                        │ userId (uuid)   │
                        │ exerciseId      │ (nullable - for standalone tracking)
                        │routineExerciseId│ (nullable - for routine tracking)
                        │ completedAt     │
                        │ notes           │
                        └────────┬────────┘
                                 │
                                 │ contains
                                 │
                                 ▼
                        ┌─────────────────┐
                        │  workout_sets   │
                        ├─────────────────┤
                        │ id (uuid) PK    │
                        │ workoutLogId    │
                        │ setNumber       │
                        │ reps            │
                        │ weight          │
                        │ rpe             │
                        └─────────────────┘
```

## Key Relationships

### One-to-Many

- `super_admin` → `exercises` (one admin creates many exercises)
- `coach` → `routines` (one coach creates many routines)
- `routines` → `routine_splits` (one routine has many splits)
- `routine_splits` → `routine_exercises` (one split has many exercises)
- `exercises` → `routine_exercises` (one exercise used in many routine exercises)
- `users` → `user_routines` (one user can have many routines)
- `routines` → `user_routines` (one routine can be assigned to many users)
- `users` → `workout_logs` (one user has many workout logs)
- `workout_logs` → `workout_sets` (one log has many sets)

### Optional Relationships

- `workout_logs.exerciseId` - Set when user tracks standalone exercise
- `workout_logs.routineExerciseId` - Set when user follows a routine

## Cascade Delete Behavior

- Delete `routine` → Deletes all `routine_splits` and `routine_exercises`
- Delete `routine_split` → Deletes all `routine_exercises` in that split
- Delete `exercise` → Deletes all `routine_exercises` using it
- Delete `user` → Deletes all `user_routines` and `workout_logs`
- Delete `workout_log` → Deletes all `workout_sets`
- Delete `exercise` → Sets `workout_logs.exerciseId` to NULL
- Delete `routine_exercise` → Sets `workout_logs.routineExerciseId` to NULL

## Enums

### muscle_group

`chest`, `back`, `shoulders`, `biceps`, `triceps`, `quadriceps`, `hamstrings`, `glutes`, `calves`, `abs`, `forearms`, `traps`, `cardio_system`

### exercise_type

`compound`, `isolation`, `cardio`, `plyometric`, `stretching`

### equipment

`barbell`, `dumbbell`, `kettlebell`, `medicine ball`, `plate`, `rope`, `sled`, `tire`, `weight plate`, `body weight`, `other`

### difficulty_level (routines)

`beginner`, `intermediate`, `advanced`
