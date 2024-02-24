import * as z from 'zod';

export const CreateCloSchema = z.object({
  code: z.string(),
  weight: z.coerce.number({
    required_error: 'required',
  }),
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
  courseId: z.string({ required_error: 'required' }).min(1, {
    message: 'required',
  }),
  subProgramLearningOutcomeId: z.string({ required_error: 'required' }).min(1, {
    message: 'required',
  }),
  programLearningOutcomeId: z.string({ required_error: 'required' }).min(1, {
    message: 'required',
  }),
});

export type CreateCloType = z.infer<typeof CreateCloSchema>;

export const CreateCloDefaultValues: CreateCloType = {
  code: '',
  description: '',
  weight: 0,
  expectedPassingAssignmentPercentage: 0,
  expectedScorePercentage: 0,
  expectedPassingStudentPercentage: 0,
  courseId: '',
  subProgramLearningOutcomeId: '',
  programLearningOutcomeId: '',
};

export const CreateManyCloSchema = z.object({
  clo: z.array(CreateCloSchema),
});

export type CreateManyCloType = z.infer<typeof CreateManyCloSchema>;

export const CreateManyCloDefaultValues: CreateManyCloType = {
  clo: [],
};
