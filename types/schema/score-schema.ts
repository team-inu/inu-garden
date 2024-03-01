import * as z from 'zod';

// base

export const ScoreSchema = z.object({
  id: z.string(),
  assignmentId: z.string(),
  email: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  score: z.number(),
  userId: z.string(),
  studentId: z.string(),
});

export type Score = z.infer<typeof ScoreSchema>;

// response

export type GetScoreResponse = z.infer<typeof ScoreSchema>;

// column

export type ScoreColumn = z.infer<typeof ScoreSchema>;

// form

export const CreateScoreFormSchema = z.object({
  studentId: z
    .string({ required_error: 'required' })
    .min(1, { message: 'required' }),
  score: z.coerce
    .number({ required_error: 'required' })
    .min(0, { message: 'required' }),
});

export type CreateScoreForm = z.infer<typeof CreateScoreFormSchema>;

export const UpdateScoreFormSchema = z.object({
  score: z.coerce
    .number({ required_error: 'required' })
    .min(0, { message: 'required' }),
});

export type UpdateScoreForm = z.infer<typeof UpdateScoreFormSchema>;

// payload

// default values

export const CreateScoreFormDefaultValues: CreateScoreForm = {
  studentId: '',
  score: 0,
};
