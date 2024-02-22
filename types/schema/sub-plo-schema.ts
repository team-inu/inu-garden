import * as z from 'zod';

export const CreateSubPloSchema = z.object({
  code: z.string({ required_error: 'required' }).min(1, { message: 'required' }),
  descriptionThai: z
    .string({ required_error: 'required' })
    .min(1, { message: 'required' }),
  descriptionEng: z
    .string({ required_error: 'required' })
    .min(1, { message: 'required' }),
  programLearningOutcomeId: z.string({ required_error: 'required' }).min(1, { message: 'required' }),
});

export type CreateSubPloType = z.infer<typeof CreateSubPloSchema>;

export type ImportedSubPloType = Partial<CreateSubPloType>;

export const CreateSubPloDefaultValues: CreateSubPloType = {
  code: '',
  descriptionThai: '',
  descriptionEng: '',
  programLearningOutcomeId: '',
};
