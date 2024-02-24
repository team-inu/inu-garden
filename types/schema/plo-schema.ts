import * as z from 'zod';

export const CreatePloSchema = z.object({
  code: z
    .string({ required_error: 'required' })
    .min(1, { message: 'required' }),
  descriptionThai: z
    .string({ required_error: 'required' })
    .min(1, { message: 'required' }),
  descriptionEng: z.string(),
  programYear: z.coerce
    .number({ required_error: 'required' })
    .min(1, { message: 'required' }),
  programmeName: z
    .string({ required_error: 'required' })
    .min(1, { message: 'required' }),
});

export type CreatePloType = z.infer<typeof CreatePloSchema>;

export type ImportedPloType = Partial<CreatePloType>;

export const CreatePloDefaultValues: CreatePloType = {
  code: '',
  descriptionThai: '',
  descriptionEng: '',
  programYear: 0,
  programmeName: '',
};
