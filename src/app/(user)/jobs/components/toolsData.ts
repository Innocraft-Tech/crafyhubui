import { z } from 'zod';

const UserType = z.enum(['CLIENT', 'FREELANCER']);
const NullableUserType = UserType.optional();

export const toolsSchema = z.object({
  // tools: z.array(z.string()).min(3),
  requiredSkills: z.array(z.string()).min(3),
  jobTitle: z.string(),
  // // minRate: z.string(),
  // // maxRate: z.string(),
  jobDescription: z.string(),
  // // timeZone: z.string(),
  languages: z.array(z.string()).min(1),

  // .refine((data) => data.length >= 3, {
  //   message: 'Array must contain at least 3 items',
  // }),

  // //   proofofWork: z.array(z.string()).nullable(),
  // //   appliedJobs: z.array(z.string()).nullable(),
  // userLocation: z.array(z.string()),

  // type: NullableUserType,
});

export type TypeToolsSchema = z.infer<typeof toolsSchema>;
