import * as z from 'zod';

import { GetCloResponse } from '@/types/schema/clo-shema';

// base

export const AssignmentSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  maxScore: z.number(),
  expectedScorePercentage: z.number(),
  expectedPassingStudentPercentage: z.number(),
  courseId: z.string(),
  isIncludedInClo: z.boolean(),
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
  name: z.string({ required_error: 'required' }).min(1, { message: 'required' }),
  description: z.string({ required_error: 'required' }).min(1, { message: 'required' }),
  clo: z.array(optionSchema).min(1, { message: 'required' }),
  maxScore: z.coerce.number({ required_error: 'required' }),
  expectedScorePercentage: z.coerce.number({ required_error: 'required' }),
  expectedPassingStudentPercentage: z.coerce.number({
    required_error: 'required',
  }),
  isIncludedInClo: z.coerce.boolean({
    required_error: 'required',
  }),
});

export const UpdateAssignmentFormSchema = CreateAssignmentFormSchema.omit({
  clo: true,
}).extend({
  id: z.string(),
});

export type CreateAssignmentForm = z.infer<typeof CreateAssignmentFormSchema>;
export type UpdateAssignmentForm = z.infer<typeof UpdateAssignmentFormSchema>;

// payload
export type CreateAssigmentLinkCloPayload = {
  assignmentId: string;
  courseLearningOutcomeIds: string[];
};

// default values

export const CreateAssignmentFormDefaultValues: CreateAssignmentForm = {
  name: '',
  description: '',
  clo: [],
  maxScore: 0,
  expectedScorePercentage: 0,
  expectedPassingStudentPercentage: 0,
  isIncludedInClo: false,
};

export const UpdateAssignmentFormDefaultValues: UpdateAssignmentForm = {
  id: '',
  name: '',
  description: '',
  maxScore: 0,
  expectedScorePercentage: 0,
  expectedPassingStudentPercentage: 0,
  isIncludedInClo: false,
};
