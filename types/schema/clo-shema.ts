import * as z from 'zod';

import { optionSchema } from '@/types/schema/form-schema';
import { GetSubPloResponse } from '@/types/schema/sub-plo-schema';

// base
export const CloSchema = z.object({
  id: z.string(),
  code: z.string(),
  description: z.string(),
  expectedPassingAssignmentPercentage: z.number(),
  expectedScorePercentage: z.number(),
  expectedPassingStudentPercentage: z.number(),
  courseId: z.string(),
  status: z.string(),
  programOutcomeId: z.string(),
});

type Clo = z.infer<typeof CloSchema>;

// response

export type GetCloResponse = Clo;

export type GetCloWithSubPloResponse = GetCloResponse & {
  subProgramLearningOutcomes: GetSubPloResponse[];
};

// column

export type CloColumn = Clo;

// form

export const CreateCloFormSchema = z.object({
  code: z
    .string({ required_error: 'required' })
    .min(1, { message: 'required' }),
  description: z
    .string({ required_error: 'required' })
    .min(1, { message: 'required' }),
  expectedPassingAssignmentPercentage: z.coerce.number({
    required_error: 'required',
  }),
  expectedScorePercentage: z.coerce.number({
    required_error: 'required',
  }),
  expectedPassingStudentPercentage: z.coerce.number({
    required_error: 'required',
  }),
  status: z.string({ required_error: 'required' }).min(1, {
    message: 'required',
  }),
  programLearningOutcomeId: z.string({ required_error: 'required' }).min(1, {
    message: 'required',
  }),
  subProgramLearningOutcomeId: z
    .array(optionSchema)
    .min(1, { message: 'required' }),
  programOutcomeId: z.string({ required_error: 'required' }).min(1, {
    message: 'required',
  }),
});

export const CreateManyCloFormSchema = z.object({
  clo: z.array(CreateCloFormSchema),
});

export const EditCloFormSchema = CreateCloFormSchema.omit({
  subProgramLearningOutcomeId: true,
  programLearningOutcomeId: true,
}).extend({
  id: z.string({ required_error: 'required' }).min(1, { message: 'required' }),
});

export type CreateCloForm = z.infer<typeof CreateCloFormSchema>;
export type CreateManyCloForm = z.infer<typeof CreateManyCloFormSchema>;
export type EditCloForm = z.infer<typeof EditCloFormSchema>;

// payload

// default values

export const CreateCloFormDefaultValues: CreateCloForm = {
  code: '',
  description: '',
  expectedPassingAssignmentPercentage: 0,
  expectedScorePercentage: 0,
  expectedPassingStudentPercentage: 0,
  status: '',
  programLearningOutcomeId: '',
  subProgramLearningOutcomeId: [],
  programOutcomeId: '',
};

export const CreateManyCloFormDefaultValues: CreateManyCloForm = {
  clo: [],
};

export const EditCloFormDefaultValues: EditCloForm = {
  id: '',
  code: '',
  description: '',
  expectedPassingAssignmentPercentage: 0,
  expectedScorePercentage: 0,
  expectedPassingStudentPercentage: 0,
  status: '',
  programOutcomeId: '',
};
