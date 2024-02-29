import * as z from 'zod';

import { GetCloResponse } from '@/types/schema/clo-shema';

// base

export const AssignmentSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  maxScore: z.number(),
  weight: z.number(),
  expectedScorePercentage: z.number(),
  expectedPassingStudentPercentage: z.number(),
  courseId: z.string(),
});

// response

export type GetAssignmentResponse = z.infer<typeof AssignmentSchema>;

export type GetAssignmentByIdResponse = GetAssignmentResponse & {
  courseLearningOutcomes: GetCloResponse[];
};

// column

export type AssignmentColumn = z.infer<typeof AssignmentSchema>;

// form

const optionSchema = z.object({
  label: z.string(),
  value: z.string(),
  disable: z.boolean().optional(),
});

export const CreateAssignmentFormSchema = z.object({
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

export type CreateAssignmentForm = z.infer<typeof CreateAssignmentFormSchema>;

// payload

// default values

export const CreateAssignmentFormDefaultValues: CreateAssignmentForm = {
  name: '',
  description: '',
  clo: [],
  weight: 0,
  maxScore: 0,
  expectedScorePercentage: 0,
  expectedPassingStudentPercentage: 0,
};
