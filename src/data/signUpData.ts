import { z } from 'zod';

const UserType = z.enum(['CLIENT', 'FREELANCER']);
const NullableUserType = UserType.optional();

export const signUpSchema = z
  .object({
    email: z.string().min(1, 'Input is not valid').email(),
    firstName: z.string(),
    lastName: z.string(),
    profilePicture: z.string(),
    companyName: z.string(),
    // userName: z.string(),
    password: z.string().min(3).max(20),
    tools: z.array(z.string()),
    // tools: z.array(z.string()).min(3),

    // .refine((data) => data.length >= 3, {
    //   message: 'Array must contain at least 3 items',
    // }),

    // //   proofofWork: z.array(z.string()).nullable(),
    // //   appliedJobs: z.array(z.string()).nullable(),
    // userLocation: z.array(z.string()),
    userLocation: z.string(),
    role: z.string(),
    // type: NullableUserType,
    isClient: z.boolean(),
    isIndividual: z.boolean(),
  })
  .refine((data) => !data.isClient && data.tools.length > 2, {
    message: 'Skills must contain at least 3 items',
    path: ['tools'],
  });

export type TypeSignUpSchema = z.infer<typeof signUpSchema>;
