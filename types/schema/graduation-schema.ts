import * as z from 'zod';

// base

export const GraduationSchema = z.object({
  id: z.string(),
  studentId: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  year: z.number(),
  workPlace: z.string(),
  remarks: z.string(),
});

// response

// column

export type GraduationColumn = z.infer<typeof GraduationSchema>;

// form

export const CreateGraduationSchema = z.object({
  id: z.string({ required_error: 'required' }).min(1, { message: 'required' }),
  studentId: z.string({ required_error: 'required' }).min(1, { message: 'required' }),
  firstName: z.string({ required_error: 'required' }).min(1, { message: 'required' }),
  lastName: z.string({ required_error: 'required' }).min(1, { message: 'required' }),
  year: z.number({ required_error: 'required' }).min(1, { message: 'required' }),
  workplace: z.string({ required_error: 'required' }).min(1, { message: 'required' }),
  remarks: z.string({ required_error: 'required' }).min(1, { message: 'required' }),
});

export type CreateGraduationType = z.infer<typeof CreateGraduationSchema>;

// payload

// default values

export const CreateGraduationDefaultValues: CreateGraduationType = {
  id: '',
  studentId: '',
  firstName: '',
  lastName: '',
  year: 0,
  workplace: '',
  remarks: '',
};
