import * as z from 'zod';

export const StudentSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  programmeName: z.string(),
  departmentName: z.string(),
  GPAX: z.number(),
  mathGPA: z.number(),
  engGPA: z.number(),
  sciGPA: z.number(),
  school: z.string(),
  city: z.string(),
  year: z.string(),
  admission: z.string(),
  remark: z.string(),
});

type Student = z.infer<typeof StudentSchema>;

export type StudentColumn = Student;

export type GetStudentResponse = Student;

export const CreateStudentSchema = z.object({
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
  mathGPA: z.coerce
    .number({ required_error: 'required' })
    .min(0, { message: 'value could more that 0' })
    .max(4, { message: 'value could less than 4' }),
  engGPA: z.coerce
    .number({ required_error: 'required' })
    .min(0, { message: 'value could more that 0' })
    .max(4, { message: 'value could less than 4' }),
  sciGPA: z.coerce
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
  programmeName: z
    .string({ required_error: 'required' })
    .min(1, { message: 'required' }),
  departmentName: z
    .string({ required_error: 'required' })
    .min(1, { message: 'required' }),
  remark: z.string().optional(),
});

export type CreateStudentPayload = z.infer<typeof CreateStudentSchema>;

export const CreateStudentDefaultValues: CreateStudentPayload = {
  kmuttId: '',
  firstName: '',
  lastName: '',
  admission: '',
  email: '',
  gpax: 0,
  mathGPA: 0,
  engGPA: 0,
  sciGPA: 0,
  school: '',
  city: '',
  year: '',
  programmeName: '',
  departmentName: '',
  remark: undefined,
};
