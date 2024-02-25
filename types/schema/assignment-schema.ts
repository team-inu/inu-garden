import * as z from 'zod';

export type GetAssignmentListType = {
  id: string;
  name: string;
  description: string;
  maxScore: number;
  weight: number;
  expectedScorePercentage: number;
  expectedPassingStudentPercentage: number;
  courseId: string;
  CourseLearningOutcomes: string;
};

export const optionSchema = z.object({
  label: z.string(),
  value: z.string(),
  disable: z.boolean().optional(),
});

export const CreateAssignmentSchema = z.object({
  name: z
    .string({ required_error: 'required' })
    .min(1, { message: 'required' }),
  description: z
    .string({ required_error: 'required' })
    .min(1, { message: 'required' }),
  clo: z.array(optionSchema).min(1, { message: 'required' }),
  weight: z.coerce.number({ required_error: 'required' }),
  maxScore: z.coerce.number({ required_error: 'required' }),
  expectedScorePercentage: z.coerce.number({ required_error: 'required' }),
  expectedPassingStudentPercentage: z.coerce.number({
    required_error: 'required',
  }),
});

export type CreateAssignmentType = z.infer<typeof CreateAssignmentSchema>;

export const CreateAssignmentDefaultValues: CreateAssignmentType = {
  name: '',
  description: '',
  clo: [],
  weight: 0,
  maxScore: 0,
  expectedScorePercentage: 0,
  expectedPassingStudentPercentage: 0,
};
