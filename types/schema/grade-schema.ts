import * as z from 'zod';

const GradeSchema = z.object({
  id: z.string(),
  semesterSequence: z.string(),
  year: z.string(),
  studentId: z.string(),
  grade: z.string(),
});

const CreateGradeSchema = z.object({
  semesterSequence: z.string(),
  year: z.string(),
  studentId: z.string(),
  grade: z.string(),
});

const PayloadCreateGradeSchema = z.object({
  semesterSequence: z.string(),
  year: z.string(),
  studentGrade: z.object({
    studentId: z.string(),
    grade: z.string(),
  }),
});

export type GradeType = z.infer<typeof GradeSchema>;

export type CreateGradeType = z.infer<typeof CreateGradeSchema>;

export type PayloadCreateGradeType = z.infer<typeof PayloadCreateGradeSchema>;

export const CreateGradeTypeDefaultValues: CreateGradeType = {
  semesterSequence: '',
  year: '',
  studentId: '',
  grade: '',
};
