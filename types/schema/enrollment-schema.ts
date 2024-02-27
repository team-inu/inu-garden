import * as z from 'zod';

// base

export const EnrollmentSchema = z.object({
  id: z.string(),
  courseId: z.string(),
  studentId: z.string(),
  status: z.string(),
  email: z.string(),
  firstName: z.string(),
  lastName: z.string(),
});

// response

export type GetEnrollmentResponse = z.infer<typeof EnrollmentSchema>;

// column

export type EnrollmentColumn = z.infer<typeof EnrollmentSchema>;

// form

export const CreateEnrollmentFormSchema = z.object({
  courseId: z
    .string({ required_error: 'required' })
    .min(1, { message: 'required' }),
  studentId: z
    .string({ required_error: 'required' })
    .min(1, { message: 'required' }),
  status: z
    .string({ required_error: 'required' })
    .min(1, { message: 'required' }),
});

export const EditEnrollmentFormSchema = CreateEnrollmentFormSchema.pick({
  studentId: true,
});

export type CreateEnrollmentForm = z.infer<typeof CreateEnrollmentFormSchema>;
export type EditEnrollmentForm = z.infer<typeof EditEnrollmentFormSchema>;

// payload

export const CreateEnrollmentPayloadSchema = CreateEnrollmentFormSchema.omit({
  studentId: true,
}).extend({
  studentIds: z
    .string({ required_error: 'required' })
    .min(1, { message: 'required' })
    .array(),
});

export type CreateEnrollmentPayload = z.infer<
  typeof CreateEnrollmentPayloadSchema
>;

// default values

export const CreateEnrollmentFormDefaultValues: CreateEnrollmentForm = {
  courseId: '',
  studentId: '',
  status: '',
};

export const EditEnrollmentDefaultValues: EditEnrollmentForm = {
  studentId: '',
};

export const CreateEnrollmentPayloadDefaultValues: CreateEnrollmentPayload = {
  courseId: '',
  status: '',
  studentIds: [],
};
