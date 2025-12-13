-- ============================================
-- Exercise Schema Migration - Manual Apply
-- ============================================
-- Run this in Supabase SQL Editor to create only the exercise-related tables
-- This avoids conflicts with existing tables (users, coach, super_admin)

-- Step 1: Create ENUM types
CREATE TYPE "public"."equipment" AS ENUM(
    'barbell', 'dumbbell', 'kettlebell', 'medicine ball', 'plate', 
    'rope', 'sled', 'tire', 'weight plate', 'body weight', 'other'
);

CREATE TYPE "public"."exercise_type" AS ENUM(
    'compound', 'isolation', 'cardio', 'plyometric', 'stretching'
);

CREATE TYPE "public"."muscle_group" AS ENUM(
    'chest', 'back', 'shoulders', 'biceps', 'triceps', 'quadriceps', 
    'hamstrings', 'glutes', 'calves', 'abs', 'forearms', 'traps', 'cardio_system'
);

-- Step 2: Create exercises table
CREATE TABLE "exercises" (
    "created_at" timestamp DEFAULT now(),
    "description" text,
    "equipment" "equipment" NOT NULL,
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    "name" varchar NOT NULL,
    "primary_muscle" "muscle_group" NOT NULL,
    "secondary_muscle" jsonb,
    "stabilizers" jsonb,
    "type" "exercise_type" NOT NULL,
    "updated_at" timestamp DEFAULT now(),
    "video_url" text
);

-- Step 3: Create routines table
CREATE TABLE "routines" (
    "coach_id" uuid NOT NULL,
    "created_at" timestamp DEFAULT now(),
    "description" text,
    "difficulty_level" varchar,
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    "is_premium" boolean DEFAULT false,
    "is_public" boolean DEFAULT false,
    "name" varchar(255) NOT NULL,
    "price" numeric(10, 2)
);

-- Step 4: Create routine_splits table
CREATE TABLE "routine_splits" (
    "day_order" integer DEFAULT 1 NOT NULL,
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    "is_rest_day" boolean DEFAULT false,
    "name" varchar(255) NOT NULL,
    "routine_id" uuid NOT NULL
);

-- Step 5: Create routine_exercises table
CREATE TABLE "routine_exercises" (
    "coach_notes" text,
    "exercise_id" uuid,
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    "order_index" integer NOT NULL,
    "reps" varchar(50) NOT NULL,
    "rest_time_seconds" integer,
    "rpe_target" integer,
    "sets" integer NOT NULL,
    "splid_id" uuid,
    "tempo" varchar(50)
);

-- Step 6: Add foreign key constraints
ALTER TABLE "routine_exercises" 
    ADD CONSTRAINT "routine_exercises_exercise_id_exercises_id_fk" 
    FOREIGN KEY ("exercise_id") 
    REFERENCES "public"."exercises"("id") 
    ON DELETE cascade 
    ON UPDATE no action;

ALTER TABLE "routine_exercises" 
    ADD CONSTRAINT "routine_exercises_splid_id_routine_splits_id_fk" 
    FOREIGN KEY ("splid_id") 
    REFERENCES "public"."routine_splits"("id") 
    ON DELETE cascade 
    ON UPDATE no action;

ALTER TABLE "routine_splits" 
    ADD CONSTRAINT "routine_splits_routine_id_routines_id_fk" 
    FOREIGN KEY ("routine_id") 
    REFERENCES "public"."routines"("id") 
    ON DELETE cascade 
    ON UPDATE no action;

-- ============================================
-- Migration Complete!
-- ============================================
-- After running this, you should have:
-- - 3 ENUM types (equipment, exercise_type, muscle_group)
-- - 4 new tables (exercises, routines, routine_splits, routine_exercises)
-- - 3 foreign key relationships with CASCADE delete
