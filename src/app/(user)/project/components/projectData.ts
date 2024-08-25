import { z } from 'zod';

export const projectSchema = z.object({
  document: z.string(),
  title: z.string(),
  description: z.string(),
  keywords: z.array(z.string()).min(3),
});

export type ProjectData = z.infer<typeof projectSchema>;
