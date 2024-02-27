import * as z from 'zod';

const optionSchema = z.object({
  label: z.string(),
  value: z.string(),
  disable: z.boolean().optional(),
});

export type OptionaType = z.infer<typeof optionSchema>;
