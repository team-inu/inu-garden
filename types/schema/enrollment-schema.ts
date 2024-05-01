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

export const EnrollmentClo = z.object({
  studentId: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  pass: z.boolean(),
});

export const EnrollmentColumnSchema = EnrollmentSchema.extend({
  collapsibleContent: z.string(),
});

export type Enrollment = z.infer<typeof EnrollmentSchema>;

// response

export type GetEnrollmentResponse = z.infer<typeof EnrollmentSchema>;

// column

export type EnrollmentColumn = z.infer<typeof EnrollmentColumnSchema>;

export type EnrollmentCloColumn = z.infer<typeof EnrollmentClo>;

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

export const EditEnrollmentFormSchema = EnrollmentSchema.pick({
  studentId: true,
  firstName: true,
  lastName: true,
  id: true,
  status: true,
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

export const EditEnrollmentPayloadSchema = EditEnrollmentFormSchema.pick({
  id: true,
  status: true,
});

export type CreateEnrollmentPayload = z.infer<
  typeof CreateEnrollmentPayloadSchema
>;

export type EditEnrollmentPayload = z.infer<typeof EditEnrollmentPayloadSchema>;

// default values

export const CreateEnrollmentFormDefaultValues: CreateEnrollmentForm = {
  courseId: '',
  studentId: '',
  status: '',
};

export const EditEnrollmentDefaultValues: EditEnrollmentForm = {
  id: '',
  firstName: '',
  lastName: '',
  studentId: '',
  status: '',
};

export const CreateEnrollmentPayloadDefaultValues: CreateEnrollmentPayload = {
  courseId: '',
  status: '',
  studentIds: [],
};
