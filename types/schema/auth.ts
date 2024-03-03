import * as z from 'zod';

export const SigninSchema = z.object({
  email: z.string().email().min(1, { message: 'required' }),
  password: z.string().min(1, { message: 'required ' }),
});

export type SigninType = z.infer<typeof SigninSchema>;

export const SigninDefaultValues: SigninType = {
  email: '',
  password: '',
};
