import * as z from 'zod';

const CourseSchema = z.object({
  id: z.string(),
  name: z.string(),
  code: z.string(),
  curriculum: z.string(),
  description: z.string(),
  semesterId: z.string(),
  lecturerId: z.string(),
  criteriaGrade: z.object({
    criteriaGradeA: z.number(),
    criteriaGradeBP: z.number(),
    criteriaGradeB: z.number(),
    criteriaGradeCP: z.number(),
    criteriaGradeC: z.number(),
    criteriaGradeDP: z.number(),
    criteriaGradeD: z.number(),
    criteriaGradeF: z.number(),
  }),
});

type Course = z.infer<typeof CourseSchema>;

export type GetCourseList = Course;

export const CreateCourseSchema = z.object({
  name: z
    .string({ required_error: 'required' })
    .min(1, { message: 'required' }),
  description: z
    .string({ required_error: 'required' })
    .min(1, { message: 'required' }),
  code: z
    .string({ required_error: 'required' })
    .min(1, { message: 'required' }),
  lecturerId: z
    .string({ required_error: 'required' })
    .min(1, { message: 'required' }),
  curriculum: z
    .string({ required_error: 'required' })
    .min(1, { message: 'required' }),
  semesterId: z
    .string({ required_error: 'required' })
    .min(1, { message: 'required' }),
  academicYear: z
    .string({ required_error: 'required' })
    .min(1, { message: 'required' }),
  graduateYear: z
    .string({ required_error: 'required' })
    .min(1, { message: 'required' }),

  criteriaGrade: z.object({
    criteriaGradeA: z.coerce.number({ required_error: 'Please enter A grade' }),
    criteriaGradeBP: z.coerce.number({
      required_error: 'Please enter BP grade',
    }),
    criteriaGradeB: z.coerce.number({ required_error: 'Please enter B grade' }),
    criteriaGradeCP: z.coerce.number({
      required_error: 'Please enter CP grade',
    }),
    criteriaGradeC: z.coerce.number({ required_error: 'Please enter C grade' }),
    criteriaGradeDP: z.coerce.number({
      required_error: 'Please enter DP grade',
    }),
    criteriaGradeD: z.coerce.number({ required_error: 'Please enter D grade' }),
    criteriaGradeF: z.coerce.number({ required_error: 'Please enter F grade' }),
  }),
});

export type CreateCourseSchemaValues = z.infer<typeof CreateCourseSchema>;

export const CreateCourseSchemaDefaultValues: Partial<CreateCourseSchemaValues> =
  {
    criteriaGrade: {
      criteriaGradeA: 80,
      criteriaGradeBP: 75,
      criteriaGradeB: 70,
      criteriaGradeCP: 65,
      criteriaGradeC: 60,
      criteriaGradeDP: 55,
      criteriaGradeD: 50,
      criteriaGradeF: 45,
    },
  };

export const UpdateCourseSchema = z.object({
  department: z.string(),
  programme: z.string(),
  code: z.string(),
  name: z.string(),
  credit: z.string(),
  education: z.string(),
  lecturer: z.string(),
});

export type UpdateCourseFormValues = z.infer<typeof UpdateCourseSchema>;

export const UpdateCourseDefaultValues: UpdateCourseFormValues = {
  department: '',
  programme: '',
  code: '',
  name: '',
  credit: '',
  education: '',
  lecturer: '',
};
