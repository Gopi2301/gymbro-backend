import { z } from 'zod';

export const SignupSchema = z.object({
  email: z.email('Invalid email address'),
  password: z.string().min(8, 'Password must be atleast 8 characters'),
  name: z.string().min(4, 'Name is required'),
});

export type SignupInput = z.infer<typeof SignupSchema>;