import { z } from "zod";

export const SignupSchema = z.object({
  email: z.email("Invalid email address"),
  name: z.string().min(4, "Name is required"),
  password: z
    .string()
    .min(8, "Password must be atleast 8 characters")
    .regex(/^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9]+$/, "Password must be alphanumeric and contain at least one number"),
  role: z.enum(["user", "coach"]),
});

export const SigninSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Password must be atleast 8 characters"),
});

export type SigninInput = z.infer<typeof SigninSchema>;
export type SignupInput = z.infer<typeof SignupSchema>;

export const RefreshTokenSchema = z.object({
  refresh_token: z.string().min(1, "Refresh token is required"),
});

export const CoachSignupSchema = z.object({
  gymAddress: z.string().min(4, "Gym address is required"),
  gymName: z.string().min(4, "Gym name is required"),
  members: z.string().min(1, "Members is required"),
  name: z.string().min(4, "Name is required"),
  password: z.string().min(8, "Password must be atleast 8 characters"),
  role: z.string().min(4, "Role is required"),
  work_email: z.email("Invalid email address"),
});

export type CoachSignupInput = z.infer<typeof CoachSignupSchema>;
export type RefreshTokenInput = z.infer<typeof RefreshTokenSchema>;

export const SuperAdminSignupSchema = z.object({
  email: z.email("Invalid email address"),
  name: z.string().min(4, "Name is required"),
  password: z.string().min(8, "Password must be atleast 8 characters"),
  role: z.string().min(4, "Role is required"),
});

export type SuperAdminSignupInput = z.infer<typeof SuperAdminSignupSchema>;
