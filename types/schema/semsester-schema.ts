import * as z from 'zod';

// base

export const SemesterSchema = z.object({
  id: z.string(),
  year: z.number(),
  semesterSequence: z.string(),
});

//response

export type getSemesterList = z.infer<typeof SemesterSchema>;

// column

export const SemesterColumnSchema = SemesterSchema;

export type SemesterColumn = z.infer<typeof SemesterColumnSchema>;

//form
const SemesterFormSchema = z.object({
  year: z.coerce.number({ required_error: 'required' }).min(1),
  semesterSequence: z.string({ required_error: 'required' }).min(1, { message: 'required' }),
});

export const CreateSemesterFormSchema = SemesterFormSchema;
export const UpdateSemesterFormSchema = CreateSemesterFormSchema;

export type CreateSemesterForm = z.infer<typeof CreateSemesterFormSchema>;
export type UpdateSemesterForm = z.infer<typeof UpdateSemesterFormSchema>;

//default value

export const CreateSemesterFormDefaultValues = {
  year: 2024,
  semesterSequence: '1',
};
