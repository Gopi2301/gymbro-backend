import { z } from "zod";

export const SignupSchema = z.object({
  email: z.email("Invalid email address"),
  name: z.string().min(4, "Name is required"),
  password: z.string().min(8, "Password must be atleast 8 characters")
  .regex(
      /^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9]+$/,
      "Password must be alphanumeric and contain at least one number"
    ),
  role: z.enum(["user", "coach"]),
});


export const SigninSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Password must be atleast 8 characters")
})


export type SigninInput = z.infer<typeof SigninSchema>;
export type SignupInput = z.infer<typeof SignupSchema>;

