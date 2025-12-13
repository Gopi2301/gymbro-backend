-- GymBro Database Reset SQL
-- Run this to drop all existing tables and prepare for fresh migration

-- Drop all tables in the correct order (respecting foreign keys)
DROP TABLE IF EXISTS workout_sets CASCADE;
DROP TABLE IF EXISTS workout_logs CASCADE;
DROP TABLE IF EXISTS user_routines CASCADE;
DROP TABLE IF EXISTS routine_exercises CASCADE;
DROP TABLE IF EXISTS routine_splits CASCADE;
DROP TABLE IF EXISTS routines CASCADE;
DROP TABLE IF EXISTS exercises CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS coach CASCADE;
DROP TABLE IF EXISTS super_admin CASCADE;

-- Drop enums
DROP TYPE IF EXISTS muscle_group CASCADE;
DROP TYPE IF EXISTS exercise_type CASCADE;
DROP TYPE IF EXISTS equipment CASCADE;

-- Drop drizzle migrations to start fresh
DROP TABLE IF EXISTS drizzle.__drizzle_migrations CASCADE;
DROP SCHEMA IF EXISTS drizzle CASCADE;

-- Success message
SELECT '✅ All tables dropped successfully! Now run: npm run db:migrate' AS status;
