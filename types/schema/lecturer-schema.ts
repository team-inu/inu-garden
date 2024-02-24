import * as z from 'zod';

export type GetLecturerList = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

export const CreateLecturerSchema = z
  .object({
    firstName: z
      .string({ required_error: 'required' })
      .min(1, { message: 'required' }),
    lastName: z
      .string({ required_error: 'required' })
      .min(1, { message: 'required' }),
    email: z
      .string({ required_error: 'required' })
      .min(1, { message: 'required' }),
    password: z
      .string({ required_error: 'required' })
      .min(1, { message: 'required' }),
    confirmPassword: z
      .string({ required_error: 'required' })
      .min(1, { message: 'required' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password doesn't match",
    path: ['confirmPassword'],
  });

export type CreateLecturerType = z.infer<typeof CreateLecturerSchema>;

export const CreateLecturerDefaultValues: CreateLecturerType = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export const EditLecturerSchema = z.object({
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

export type EditLecturerType = z.infer<typeof EditLecturerSchema>;

export const EditLecturerDefaultValues: EditLecturerType = {
  firstName: '',
  lastName: '',
  email: '',
};

export const ChangePasswordSchema = z
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

export type ChangePasswordType = z.infer<typeof ChangePasswordSchema>;

export const ChangePasswordDefaultValues: ChangePasswordType = {
  oldPassword: '',
  newPassword: '',
  confirmNewPassword: '',
};
