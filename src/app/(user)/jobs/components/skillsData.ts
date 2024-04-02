import { z } from 'zod';

const UserType = z.enum(['CLIENT', 'FREELANCER']);
const NullableUserType = UserType.optional();

export const skillsSchema = z.object({
 
skills: z.array(z.string()).min(3),

  // .refine((data) => data.length >= 3, {
  //   message: 'Array must contain at least 3 items',
  // }),

  // //   proofofWork: z.array(z.string()).nullable(),
  // //   appliedJobs: z.array(z.string()).nullable(),
  // userLocation: z.array(z.string()),

  // type: NullableUserType,

});

export type TypeSkillsSchema = z.infer<typeof skillsSchema>;
