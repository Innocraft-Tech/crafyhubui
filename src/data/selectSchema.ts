import { z } from 'zod';
const selectSchema = z.object({
  Frequency: z
      .string({
        required_error: "Please select an email to display.",
      })
      
  })
  export type TypeSelectSchema = z.infer<typeof selectSchema>;