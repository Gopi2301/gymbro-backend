CREATE TYPE "public"."equipment" AS ENUM('barbell', 'dumbbell', 'kettlebell', 'medicine ball', 'plate', 'rope', 'sled', 'tire', 'weight plate', 'body weight', 'other');--> statement-breakpoint
CREATE TYPE "public"."exercise_type" AS ENUM('compound', 'isolation', 'cardio', 'plyometric', 'stretching');--> statement-breakpoint
CREATE TYPE "public"."muscle_group" AS ENUM('chest', 'back', 'shoulders', 'biceps', 'triceps', 'quadriceps', 'hamstrings', 'glutes', 'calves', 'abs', 'forearms', 'traps', 'cardio_system');--> statement-breakpoint
CREATE TABLE "coach" (
	"created_at" timestamp DEFAULT now(),
	"gymAddress" varchar(255) NOT NULL,
	"gymName" varchar(255) NOT NULL,
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"members" varchar(255) NOT NULL,
	"name" varchar(255) NOT NULL,
	"phone_verified" boolean DEFAULT false NOT NULL,
	"role" varchar(255) NOT NULL,
	"updated_at" timestamp DEFAULT now(),
	"work_email" varchar(255) NOT NULL,
	CONSTRAINT "coach_work_email_unique" UNIQUE("work_email")
);
--> statement-breakpoint
CREATE TABLE "exercises" (
	"created_at" timestamp DEFAULT now(),
	"created_by" uuid,
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
--> statement-breakpoint
CREATE TABLE "routine_exercises" (
	"coach_notes" text,
	"exercise_id" uuid,
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"order_index" integer NOT NULL,
	"reps" varchar(50) NOT NULL,
	"rest_time_seconds" integer,
	"rpe_target" integer,
	"sets" integer NOT NULL,
	"split_id" uuid,
	"tempo" varchar(50)
);
--> statement-breakpoint
CREATE TABLE "routine_splits" (
	"day_order" integer DEFAULT 1 NOT NULL,
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"is_rest_day" boolean DEFAULT false,
	"name" varchar(255) NOT NULL,
	"routine_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "routines" (
	"coach_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"description" text,
	"difficulty_level" varchar,
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"is_premium" boolean DEFAULT false,
	"is_public" boolean DEFAULT false,
	"name" varchar(255) NOT NULL,
	"price" numeric(10, 2),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "super_admin" (
	"created_at" timestamp DEFAULT now(),
	"email" varchar(255) NOT NULL,
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"role" varchar(255) DEFAULT 'superadmin' NOT NULL,
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "super_admin_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "user_routines" (
	"assigned_at" timestamp DEFAULT now(),
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"routine_id" uuid NOT NULL,
	"started_at" timestamp,
	"user_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"age" integer,
	"created_at" timestamp DEFAULT now(),
	"email" varchar(255) NOT NULL,
	"email_verified" boolean DEFAULT false NOT NULL,
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"phone_verified" boolean DEFAULT false NOT NULL,
	"role" varchar(255) NOT NULL,
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "workout_logs" (
	"completed_at" timestamp DEFAULT now(),
	"exercise_id" uuid,
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"notes" varchar(500),
	"routine_exercise_id" uuid,
	"user_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "workout_sets" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"reps" integer NOT NULL,
	"rpe" integer,
	"set_number" integer NOT NULL,
	"weight" integer,
	"workout_log_id" uuid NOT NULL
);
--> statement-breakpoint
ALTER TABLE "routine_exercises" ADD CONSTRAINT "routine_exercises_exercise_id_exercises_id_fk" FOREIGN KEY ("exercise_id") REFERENCES "public"."exercises"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "routine_exercises" ADD CONSTRAINT "routine_exercises_split_id_routine_splits_id_fk" FOREIGN KEY ("split_id") REFERENCES "public"."routine_splits"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "routine_splits" ADD CONSTRAINT "routine_splits_routine_id_routines_id_fk" FOREIGN KEY ("routine_id") REFERENCES "public"."routines"("id") ON DELETE cascade ON UPDATE no action;