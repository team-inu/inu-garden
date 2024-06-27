import * as z from 'zod';

// base

export const UserSchema = z.object({
  id: z.string(),
  role: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
});

// response

export type GetUserResponse = z.infer<typeof UserSchema>;

// column

export const UserColumnSchema = UserSchema.extend({
  collapsibleContent: z.string(),
});

export type UserColumn = z.infer<typeof UserColumnSchema>;

// form

const UserFormSchema = z.object({
  firstName: z.string({ required_error: 'required' }).min(1, { message: 'required' }),
  lastName: z.string({ required_error: 'required' }).min(1, { message: 'required' }),
  email: z.string({ required_error: 'required' }).email().min(1, { message: 'required' }),
  role: z.string({ required_error: 'required' }).min(1, { message: 'required' }),
  password: z.string({ required_error: 'required' }).min(1, { message: 'required' }),
  confirmPassword: z.string({ required_error: 'required' }).min(1, { message: 'required' }),
});

export const CreateUserFormSchema = UserFormSchema.refine((data) => data.password === data.confirmPassword, {
  message: "Password doesn't match",
  path: ['confirmPassword'],
});

export const CreateManyUserFormSchema = z.object({
  users: UserFormSchema.omit({ confirmPassword: true }).array(),
});

export const EditUserFormSchema = UserFormSchema.pick({
  firstName: true,
  lastName: true,
  email: true,
  role: true,
}).extend({
  id: z.string(),
});

export const ChangePasswordFormSchema = z
  .object({
    userId: z.string(),
    oldPassword: z.string({ required_error: 'required' }).min(1, { message: 'required' }),
    newPassword: z.string({ required_error: 'required' }).min(1, { message: 'required' }),
    confirmNewPassword: z.string({ required_error: 'required' }).min(1, { message: 'required' }),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Password doesn't match",
    path: ['confirmNewPassword'],
  });

export type CreateUserForm = z.infer<typeof CreateUserFormSchema>;
export type CreateManyUserForm = z.infer<typeof CreateManyUserFormSchema>;
export type EditUserForm = z.infer<typeof EditUserFormSchema>;
export type ChangePasswordForm = z.infer<typeof ChangePasswordFormSchema>;

// payload

// default values

export const CreateUserFormDefaultValues: CreateUserForm = {
  firstName: '',
  lastName: '',
  email: '',
  role: '',
  password: '',
  confirmPassword: '',
};

export const EditUserFormDefaultValues: EditUserForm = {
  id: '',
  firstName: '',
  lastName: '',
  role: '',
  email: '',
};

export const CreateManyUserFormDefaultValues: CreateManyUserForm = {
  users: [],
};

export const ChangePasswordFormDefaultValues: ChangePasswordForm = {
  userId: '',
  oldPassword: '',
  newPassword: '',
  confirmNewPassword: '',
};
