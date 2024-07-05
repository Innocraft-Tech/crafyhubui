import { z } from 'zod';
export const forgotPasswordSchema = z.object({
    newPassword: z.string(),
    confirmNewPassword: z.string(),
  });