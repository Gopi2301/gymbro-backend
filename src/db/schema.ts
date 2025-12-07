import { boolean, integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  age: integer("age"),
  email: varchar("email", { length: 255 }).notNull().unique(),
  email_verified: boolean("email_verified").notNull().default(false),
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name", { length: 255 }).notNull(),
  phone_verified: boolean("phone_verified").notNull().default(false),
  role: varchar("role", { length: 255 }).notNull(),
});

export const coachTable = pgTable("coach", {
  gymAddress: varchar("gymAddress", { length: 255 }).notNull(),
  gymName: varchar("gymName", { length: 255 }).notNull(),
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  members: varchar("members", { length: 255 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  phone_verified: boolean("phone_verified").notNull().default(false),
  role: varchar("role", { length: 255 }).notNull(),
  work_email: varchar("work_email", { length: 255 }).notNull().unique(),
});
