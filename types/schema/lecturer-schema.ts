import * as z from 'zod';

// base

export const LecturerSchema = z.object({
  id: z.string(),
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

export type CreateLecturerFormSchema = z.infer<typeof CreateLecturerFormSchema>;
export type CreateManyLecturerForm = z.infer<
  typeof CreateManyLecturerFormSchema
>;
export type EditLecturerType = z.infer<typeof EditLecturerFormSchema>;
export type ChangePasswordType = z.infer<typeof ChangePasswordFormSchema>;

// payload

// default values

export const CreateLecturerDefaultValues: CreateLecturerFormSchema = {
  firstName: '',
  lastName: '',
  email: '',
  role: '',
  password: '',
  confirmPassword: '',
};

export const EditLecturerDefaultValues: EditLecturerType = {
  firstName: '',
  lastName: '',
  email: '',
};

export const CreateManyLecturerFormDefaultValues: CreateManyLecturerForm = {
  lecturers: [],
};

export const ChangePasswordDefaultValues: ChangePasswordType = {
  oldPassword: '',
  newPassword: '',
  confirmNewPassword: '',
};
