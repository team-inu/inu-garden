import * as z from 'zod';

// base

export const PoSchema = z.object({
  id: z.string(),
  code: z.string(),
  name: z.string(),
  description: z.string(),
});

// response

export type GetPoResponse = z.infer<typeof PoSchema>;

// column

export type PoColumn = z.infer<typeof PoSchema>;

// form

export const CreatePoFormSchema = z.object({
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

export const CreateManyPoSchema = z.object({
  po: z.array(CreatePoFormSchema),
});

export type CreatePoForm = z.infer<typeof CreatePoFormSchema>;
export type CreateManyPoForm = z.infer<typeof CreateManyPoSchema>;

// payload

// default values

export const CreatePoFormDefaultValues: CreatePoForm = {
  code: '',
  name: '',
  description: '',
};

export const CreateManyPoFormDefaultValues: CreateManyPoForm = {
  po: [],
};
