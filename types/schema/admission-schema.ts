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
  gpax: z.coerce
    .number({ required_error: 'required' })
    .min(0, { message: 'value could more that 0' })
    .max(4, { message: 'value could less than 4' }),
  gpaMath: z.coerce
    .number({ required_error: 'required' })
    .min(0, { message: 'value could more that 0' })
    .max(4, { message: 'value could less than 4' }),
  gpaEng: z.coerce
    .number({ required_error: 'required' })
    .min(0, { message: 'value could more that 0' })
    .max(4, { message: 'value could less than 4' }),
  gpaSci: z.coerce
    .number({ required_error: 'required' })
    .min(0, { message: 'value could more that 0' })
    .max(4, { message: 'value could less than 4' }),
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
  gpax: 0,
  gpaMath: 0,
  gpaEng: 0,
  gpaSci: 0,
  school: '',
  city: '',
  year: '',
  programmeId: '',
  departmentName: '',
  remark: undefined,
};
