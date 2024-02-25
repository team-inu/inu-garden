import * as z from 'zod';

export const CreateEnrollmentSchema = z.object({
  courseId: z.string(),
  status: z.string(),
  studentIds: z
    .string({ required_error: 'required' })
    .min(1, { message: 'required' })
    .array(),
});

export type CreateEnrollmentType = z.infer<typeof CreateEnrollmentSchema>;

export const CreateEnrollmentDefaultValues: CreateEnrollmentType = {
  courseId: '',
  status: '',
  studentIds: [],
};

export const EditEnrollmentSchema = z.object({
  studentId: z
    .string({ required_error: 'required' })
    .min(1, { message: 'required' }),
  firstName: z
    .string({ required_error: 'required' })
    .min(1, { message: 'required' }),
  lastName: z
    .string({ required_error: 'required' })
    .min(1, { message: 'required' }),
  email: z
    .string({ required_error: 'required' })
    .min(1, { message: 'required' }),
});

export type EditEnrollmentType = z.infer<typeof EditEnrollmentSchema>;

export const EditEnrollmentDefaultValues: EditEnrollmentType = {
  studentId: '',
  firstName: '',
  lastName: '',
  email: '',
};