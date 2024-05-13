import { z } from 'zod';

export const profileUpdateSchema = z.object({
    profilePic: z.string(),
    userName: z.string().min(3).max(20),
    about:z.string().min(3).max(100),
    location:z.string().min(3).max(50),
    timeZone:z.string().min(3).max(50),
    extendHours:z.string().min(3).max(50),
    addLanguages:z.string().min(3).max(50),
    proffessionalTitle:z.string().min(3).max(50),
    companyName:z.string().min(3).max(50),
  });
  export type TypeprofileUpdateSchema = z.infer<typeof profileUpdateSchema>;