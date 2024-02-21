import * as z from 'zod';

export const CreateAdmissionSchema = z.object({
  kmuttId: z
    .string({ required_error: 'required' })
    .min(1, { message: 'required' }),
  firstName: z
    .string({ required_error: 'required' })
    .min(1, { message: 'required' }),
  lastName: z
    .string({ required_error: 'required' })
    .min(1, { message: 'required' }),
  admission: z
    .string({ required_error: 'required' })
    .min(1, { message: 'required' }),
  email: z
    .string({ required_error: 'required' })
    .min(1, { message: 'required' }),
  gpax: z
    .string({ required_error: 'required' })
    .min(1, { message: 'required' }),
  gpaMath: z
    .string({ required_error: 'required' })
    .min(1, { message: 'required' }),
  gpaEng: z
    .string({ required_error: 'required' })
    .min(1, { message: 'required' }),
  gpaSci: z
    .string({ required_error: 'required' })
    .min(1, { message: 'required' }),
  school: z
    .string({ required_error: 'required' })
    .min(1, { message: 'required' }),
  city: z
    .string({ required_error: 'required' })
    .min(1, { message: 'required' }),
  year: z
    .string({ required_error: 'required' })
    .min(1, { message: 'required' }),
  programmeId: z
    .string({ required_error: 'required' })
    .min(1, { message: 'required' }),
  departmentName: z
    .string({ required_error: 'required' })
    .min(1, { message: 'required' }),
  remark: z.string().optional(),
});

export type CreateAdmissionType = z.infer<typeof CreateAdmissionSchema>;

export const CreateAdmissionDefaultValues: CreateAdmissionType = {
  kmuttId: '',
  firstName: '',
  lastName: '',
  admission: '',
  email: '',
  gpax: '',
  gpaMath: '',
  gpaEng: '',
  gpaSci: '',
  school: '',
  city: '',
  year: '',
  programmeId: '',
  departmentName: '',
  remark: undefined,
};
