import * as z from 'zod';

// base

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

const StudentColumnSchema = StudentSchema.extend({
  grade: z.string(),
});

// response

export type GetStudentResponse = z.infer<typeof StudentSchema>;

// column

export type StudentColumn = z.infer<typeof StudentColumnSchema>;

// form

export const CreateStudentFormSchema = z.object({
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

export const CreateStudentsFormSchema = CreateStudentFormSchema.array();

export const UpdateStudentFormSchema = CreateStudentFormSchema;

export type CreateStudentForm = z.infer<typeof CreateStudentFormSchema>;
export type CreateStudentsForm = z.infer<typeof CreateStudentsFormSchema>;
export type UpdateStudentForm = z.infer<typeof UpdateStudentFormSchema>;
// payload

// default values

export const CreateStudentFormDefaultValues: CreateStudentForm = {
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

export const CreateStudentsFormDefaultValues: CreateStudentsForm = [];

export const UpdateStudentFormDefaultValues: UpdateStudentForm =
  CreateStudentFormDefaultValues;
