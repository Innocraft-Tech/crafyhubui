import { z } from 'zod';

function isValidUrl(value: string) {
  const urlRegex = /^(?:(?:https?|ftp):\/\/)?(?:www\.)?[^\s.]+\.[^\s]{2,}$/i;
  return !value || urlRegex.test(value);
}

export const signUpSchema = z
  .object({
    email: z.string().min(1, 'Input is not valid').email(),
    firstName: z.string(),
    lastName: z.string(),
    profilePicture: z.string(),
    companyName: z.string(),
    password: z.string().min(3).max(20),
    tools: z.array(z.string()),
    userLocation: z.string(),
    role: z.string(),
    isClient: z.boolean(),
    isIndividual: z.boolean(),
    socialLinks: z
      .array(
        z
          .string()
          .trim()
          .refine((value) => isValidUrl(value), {
            message: 'Invalid Url',
          })
          .optional(),
      )
      .default([]),
  })
  .refine((data) => data.isClient || (data.tools && data.tools.length >= 3), {
    message: 'Skills must contain at least 3 items',
    path: ['tools'],
  });

export type TypeSignUpSchema = z.infer<typeof signUpSchema>;
