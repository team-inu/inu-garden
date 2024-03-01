import * as z from 'zod';

// base

export const LecturerSchema = z.object({
  id: z.string(),
  role: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
});

// response

export type GetLecturerResponse = z.infer<typeof LecturerSchema>;

// column

export const LecturerColumnSchema = LecturerSchema.extend({
  collapsibleContent: z.string(),
});

export type LecturerColumn = z.infer<typeof LecturerColumnSchema>;

// form

const LecturerFormSchema = z.object({
  firstName: z
    .string({ required_error: 'required' })
    .min(1, { message: 'required' }),
  lastName: z
    .string({ required_error: 'required' })
    .min(1, { message: 'required' }),
  email: z
    .string({ required_error: 'required' })
    .email()
    .min(1, { message: 'required' }),
  role: z
    .string({ required_error: 'required' })
    .min(1, { message: 'required' }),
  password: z
    .string({ required_error: 'required' })
    .min(1, { message: 'required' }),
  confirmPassword: z
    .string({ required_error: 'required' })
    .min(1, { message: 'required' }),
});

export const CreateLecturerFormSchema = LecturerFormSchema.refine(
  (data) => data.password === data.confirmPassword,
  {
    message: "Password doesn't match",
    path: ['confirmPassword'],
  },
);

export const CreateManyLecturerFormSchema = z.object({
  lecturers: LecturerFormSchema.omit({ confirmPassword: true }).array(),
});

export const EditLecturerFormSchema = LecturerFormSchema.pick({
  firstName: true,
  lastName: true,
  email: true,
  role: true,
}).extend({
  id: z.string(),
});

export const ChangePasswordFormSchema = z
  .object({
    oldPassword: z
      .string({ required_error: 'required' })
      .min(1, { message: 'required' }),
    newPassword: z
      .string({ required_error: 'required' })
      .min(1, { message: 'required' }),
    confirmNewPassword: z
      .string({ required_error: 'required' })
      .min(1, { message: 'required' }),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Password doesn't match",
    path: ['confirmNewPassword'],
  });

export type CreateLecturerForm = z.infer<typeof CreateLecturerFormSchema>;
export type CreateManyLecturerForm = z.infer<
  typeof CreateManyLecturerFormSchema
>;
export type EditLecturerForm = z.infer<typeof EditLecturerFormSchema>;
export type ChangePasswordForm = z.infer<typeof ChangePasswordFormSchema>;

// payload

// default values

export const CreateLecturerFormDefaultValues: CreateLecturerForm = {
  firstName: '',
  lastName: '',
  email: '',
  role: '',
  password: '',
  confirmPassword: '',
};

export const EditLecturerFormDefaultValues: EditLecturerForm = {
  id: '',
  firstName: '',
  lastName: '',
  role: '',
  email: '',
};

export const CreateManyLecturerFormDefaultValues: CreateManyLecturerForm = {
  lecturers: [],
};

export const ChangePasswordFormDefaultValues: ChangePasswordForm = {
  oldPassword: '',
  newPassword: '',
  confirmNewPassword: '',
};
