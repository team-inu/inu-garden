import * as z from 'zod';

export type GetScoreListType = {};

export const CreateScoreSchema = z.object({
  studentId: z
    .string({ required_error: 'required' })
    .min(1, { message: 'required' }),
  score: z.coerce
    .number({ required_error: 'required' })
    .min(0, { message: 'required' }),
});

export type CreateScoreType = z.infer<typeof CreateScoreSchema>;

export const CreateScoreDefaultValues: CreateScoreType = {
  studentId: '',
  score: 0,
};
