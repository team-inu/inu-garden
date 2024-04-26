import * as z from 'zod';

const GradeSchema = z.object({
  id: z.string(),
  semesterSequence: z.string(),
  year: z.number(),
  studentId: z.string(),
  grade: z.string(),
});

export const CreateGradeSchema = z.object({
  semesterSequence: z.string(),
  year: z.number(),
  studentId: z.string(),
  grade: z.string(),
});

export const PayloadCreateGradeSchema = z.object({
  semesterSequence: z.string(),
  year: z.number(),
  studentGrade: z
    .object({
      studentId: z.string(),
      grade: z.string(),
    })
    .array(),
});

export type GradeType = z.infer<typeof GradeSchema>;

export type CreateGradeType = z.infer<typeof CreateGradeSchema>;

export type PayloadCreateGradeType = z.infer<typeof PayloadCreateGradeSchema>;

export const CreateGradeTypeDefaultValues: CreateGradeType = {
  semesterSequence: '',
  year: 0,
  studentId: '',
  grade: '',
};

export const PayloadCreateGradeTypeDefaultValues: PayloadCreateGradeType = {
  semesterSequence: '',
  year: 0,
  studentGrade: [],
};
