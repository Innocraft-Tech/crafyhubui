import { z } from 'zod';

export const signUpSchema = z.object({
  email: z.string().min(1, 'Input is not valid').email(),
  password: z.string().min(3).max(20),
});

export type TypeSignUpSchema = z.infer<typeof signUpSchema>;
