import * as z from 'zod';

import { GetCourseList } from '@/types/schema/course-schema';
import { GetStudentResponse } from '@/types/schema/student-schema';

export type GetEnrollmentList = {
  course: GetCourseList;
  student: GetStudentResponse;
  courseId: string;
  id: string;
  status: string;
  studentId: string;
};

export const CreateEnrollmentSchema = z.object({
  courseId: z.string(),
  studentId: z.string(),
  status: z.string(),
});

export type CreateEnrollmentType = z.infer<typeof CreateEnrollmentSchema>;

export const CreateEnrollmentDefaultValues: CreateEnrollmentType = {
  courseId: '',
  studentId: '',
  status: '',
};

export const CreateManyEnrollmentSchema = z.object({
  courseId: z.string(),
  status: z.string(),
  studentIds: z
    .string({ required_error: 'required' })
    .min(1, { message: 'required' })
    .array(),
});

export type CreateManyEnrollmentType = z.infer<
  typeof CreateManyEnrollmentSchema
>;

export const CreateManyEnrollmentDefaultValues: CreateManyEnrollmentType = {
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
