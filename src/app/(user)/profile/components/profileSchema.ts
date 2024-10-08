import { z } from 'zod';

const perHourValueSchema = z.union([
  z.tuple([z.number(), z.number()]),
  z.array(z.number()).length(0),
]);

const toolsSchema = z.union([
  z.array(z.string()).length(0),
  z.array(z.string()).min(3, 'At least 3 tools are required'),
]);

export const userInfoSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
});

export const rateSchema = z.object({
  perHourValue: perHourValueSchema,
});

export const skillSchema = z.object({
  tools: toolsSchema,
});

export const bioSchema = z.object({
  bio: z.string(),
});

export const timezoneSchema = z.object({
  timezone: z.string(),
});
export const addOneLinerSchema = z.object({
  oneLiner: z.string().min(1, 'One liner is required'),
});

export const addToolsSchema = z.object({
  tools: toolsSchema,
});

export const addBioSchema = z.object({
  bio: z.string(),
});

export type UserInfo = z.infer<typeof userInfoSchema>;

export type RateInfo = z.infer<typeof rateSchema>;

export type SkillInfo = z.infer<typeof skillSchema>;

export type BioInfo = z.infer<typeof bioSchema>;

export type TimezoneInfo = z.infer<typeof timezoneSchema>;

export type AddOneLinerInfo = z.infer<typeof addOneLinerSchema>;
