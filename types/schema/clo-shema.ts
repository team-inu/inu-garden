import * as z from 'zod';

import { GetSubProgramLearningOutcomeList } from '@/types/schema/sub-plo-schema';

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

export type CloColumn = Clo;

export type GetCloResponse = Clo;

const optionSchema = z.object({
  label: z.string(),
  value: z.string(),
  disable: z.boolean().optional(),
});

export type OptionaType = z.infer<typeof optionSchema>;

export type GetCourseLearningOutcome = {
  id: string;
  code: string;
  description: string;
  expectedPassingAssignmentPercentage: number;
  expectedScorePercentage: number;
  expectedPassingStudentPercentage: number;
  status: string;
  programOutcomeId: string;
  courseId: string;
};

export type GetCourseLearningOutcomeWithSubPlo = GetCourseLearningOutcome & {
  subProgramLearningOutcomes: GetSubProgramLearningOutcomeList[];
};

export const CreateCloSchema = z.object({
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

export type CreateCloType = z.infer<typeof CreateCloSchema>;

export const CreateCloDefaultValues: CreateCloType = {
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

export const CreateManyCloSchema = z.object({
  clo: z.array(CreateCloSchema),
});

export type CreateManyCloType = z.infer<typeof CreateManyCloSchema>;

export const CreateManyCloDefaultValues: CreateManyCloType = {
  clo: [],
};

export const EditCloSchema = z.object({
  id: z.string({ required_error: 'required' }).min(1, { message: 'required' }),
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
  programOutcomeId: z.string({ required_error: 'required' }).min(1, {
    message: 'required',
  }),
});

export type EditCloType = z.infer<typeof EditCloSchema>;

export const EditCloDefaultValues: EditCloType = {
  id: '',
  code: '',
  description: '',
  expectedPassingAssignmentPercentage: 0,
  expectedScorePercentage: 0,
  expectedPassingStudentPercentage: 0,
  status: '',
  programOutcomeId: '',
};
