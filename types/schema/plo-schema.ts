import * as z from 'zod';

import { GetSubProgramLearningOutcomeList } from '@/types/schema/sub-plo-schema';

export type GetProgramLearningOutcomeList = {
  id: string;
  code: string;
  descriptionThai: string;
  descriptionEng: string;
  programYear: number;
  programmeName: string;
  subProgramLearningOutcomes: GetSubProgramLearningOutcomeList[];
};

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

export const CreatePloDefaultValues: CreatePloType = {
  code: '',
  descriptionThai: '',
  descriptionEng: '',
  programYear: 0,
  programmeName: '',
};

export const CreateManyPloSchema = z.object({
  plo: z.array(CreatePloSchema),
});

export type CreateManyPloType = z.infer<typeof CreateManyPloSchema>;

export const CreateManyPloDefaultValues: CreateManyPloType = {
  plo: [],
};
