import { z } from 'zod';
const keyWordSchema = z.union([
  z.array(z.string()).length(0),
  z.array(z.string()).min(3, 'At least 3 tools are required'),
]);
export const projectTileSchema = z.object({
  title: z.string(),
  // description: z.string(),
  // keywords: z.array(z.string()).min(3),
  // document: z.string(),
});

export const projectDescriptionSchema = z.object({
  description: z.string(),
});

export const keyWordsSchema = z.object({
  keyword: keyWordSchema,
});
export const projectDocumentSchema = z.object({
  document: z.string(),
});

export type ProjectTile = z.infer<typeof projectTileSchema>;
export type ProjectDescription = z.infer<typeof projectDescriptionSchema>;
export type KeyWords = z.infer<typeof keyWordsSchema>;
export type ProjectDocument = z.infer<typeof projectDocumentSchema>;
