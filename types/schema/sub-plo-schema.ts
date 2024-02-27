import * as z from 'zod';

import { optionSchema } from '@/types/schema/form-schema';

export const SubPloSchema = z.object({
  id: z.string(),
  code: z.string(),
  descriptionThai: z.string(),
  descriptionEng: z.string(),
  programLearningOutcomeId: z.string(),
});

type SubPlo = z.infer<typeof SubPloSchema>;

export type SubPloColumn = SubPlo;

export type GetSubPloResponse = SubPlo;

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

export const CreateSubPloLinkCloSchema = z.object({
  subPlos: z.array(optionSchema).min(1, { message: 'required' }),
});

export type CreateSubPloLinkCloType = z.infer<typeof CreateSubPloLinkCloSchema>;

export const CreateManySubPloSchema = z.object({
  splo: z.array(CreateSubPloSchema),
});

export type CreateManySubPloType = z.infer<typeof CreateManySubPloSchema>;

export const CreateSubPloDefaultValues: CreateSubPloType = {
  code: '',
  descriptionThai: '',
  descriptionEng: '',
  programLearningOutcomeId: '',
};

export const CreateManySubPloDefaultValues: CreateManySubPloType = {
  splo: [],
};

export const CreateSubPloLinkCloDefaultValues: CreateSubPloLinkCloType = {
  subPlos: [],
};
