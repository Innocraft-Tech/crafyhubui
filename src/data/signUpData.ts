import { z } from 'zod';

const UserType = z.enum(['CLIENT', 'FREELANCER']);
const NullableUserType = UserType.optional();

export const signUpSchema = z.object({
  email: z.string().min(1, 'Input is not valid').email(),
  firstName: z.string(),
  lastName: z.string(),
  // profilePicture: z.string(),
  // userName: z.string(),
  password: z.string().min(3).max(20),
  tools: z.array(z.string()).min(3),

  // //   proofofWork: z.array(z.string()).nullable(),
  // //   appliedJobs: z.array(z.string()).nullable(),
  // userLocation: z.array(z.string()),
  userLocation: z.string(),
  type: NullableUserType,
});

export type TypeSignUpSchema = z.infer<typeof signUpSchema>;
