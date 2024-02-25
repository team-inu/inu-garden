import * as z from 'zod';

export type GetSubProgramLearningOutcomeList = {
  id: string;
  code: string;
  descriptionThai: string;
  descriptionEng: string;
  programLearningOutcomeId: string;
};

export const CreateSubPloSchema = z.object({
  code: z
    .string({ required_error: 'required' })
    .min(1, { message: 'required' }),
  descriptionThai: z
    .string({ required_error: 'required' })
    .min(1, { message: 'required' }),
  descriptionEng: z.string(),
  programLearningOutcomeId: z
    .string({ required_error: 'required' })
    .min(1, { message: 'required' }),
});

export type CreateSubPloType = z.infer<typeof CreateSubPloSchema>;

export type ImportedSubPloType = Partial<CreateSubPloType>;

export const CreateSubPloDefaultValues: CreateSubPloType = {
  code: '',
  descriptionThai: '',
  descriptionEng: '',
  programLearningOutcomeId: '',
};

export const CreateManySubPloSchema = z.object({
  splo: z.array(CreateSubPloSchema),
});

export type CreateManySubPloType = z.infer<typeof CreateManySubPloSchema>;

export const CreateManySubPloDefaultValues: CreateManySubPloType = {
  splo: [],
};
