import { z } from 'zod';

export const projectSchema = z.object({
  title: z.string(),
  description: z.string(),
  keywords: z.array(z.string()).min(3),
  document: z.string(),
});
