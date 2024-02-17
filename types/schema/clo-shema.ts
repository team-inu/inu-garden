import * as z from 'zod';

export const CreateCloSchema = z.object({
  id: z.string(),
  name: z
    .string({ required_error: 'required' })
    .min(1, { message: 'required' }),
  description: z
    .string({ required_error: 'required' })
    .min(1, { message: 'required' }),
});

export type CreateCloType = z.infer<typeof CreateCloSchema>;

export const CreateCloDefaultValues: CreateCloType = {
  id: '',
  name: '',
  description: '',
};
