import * as z from 'zod';

const optionSchema = z.object({
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
  weigth: z.coerce.number({ required_error: 'required' }),
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
  weigth: 0,
  maxScore: 0,
  expectedScorePercentage: 0,
  expectedPassingStudentPercentage: 0,
};
