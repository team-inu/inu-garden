import * as z from 'zod';

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
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'The passwords did not match',
      });
    }
  });

export type CreateLecturerType = z.infer<typeof CreateLecturerSchema>;

export const CreateLecturerDefaultValues: CreateLecturerType = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
};
