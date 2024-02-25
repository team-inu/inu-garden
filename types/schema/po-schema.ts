import * as z from 'zod';

export type GetPoList = {
  id: string;
  code: string;
  description: string;
  name: string;
};

export const CreatePoSchema = z.object({
  code: z
    .string({ required_error: 'required' })
    .min(1, { message: 'required' }),
  name: z
    .string({ required_error: 'required' })
    .min(1, { message: 'required' }),
  description: z
    .string({ required_error: 'required' })
    .min(1, { message: 'required' }),
});

export type CreatePoType = z.infer<typeof CreatePoSchema>;

export type ImportedPoType = Partial<CreatePoType>;

export const CreatePoDefaultValues: CreatePoType = {
  code: '',
  name: '',
  description: '',
};

export const CreateManyPoSchema = z.object({
  po: z.array(CreatePoSchema),
});

export type CreateManyPoType = z.infer<typeof CreateManyPoSchema>;

export const CreateManyPoDefaultValues: CreateManyPoType = {
  po: [],
};
