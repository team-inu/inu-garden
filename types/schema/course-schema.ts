import * as z from 'zod';

import { User } from '@/types/auth-type';

const CourseSchema = z.object({
  id: z.string(),
  name: z.string(),
  code: z.string(),
  curriculum: z.string(),
  description: z.string(),
  semesterId: z.string(),
  userId: z.string(),
  expectedPassingCloPercentage: z.number(),

  criteriaGradeA: z.number(),
  criteriaGradeBP: z.number(),
  criteriaGradeB: z.number(),
  criteriaGradeCP: z.number(),
  criteriaGradeC: z.number(),
  criteriaGradeDP: z.number(),
  criteriaGradeD: z.number(),
  criteriaGradeF: z.number(),
});

type Course = z.infer<typeof CourseSchema>;

export type GetCourseList = Course & {
  user: User;
  semester: {
    id: string;
    year: number;
    semesterSequence: string;
  };
};

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
  userId: z
    .string({ required_error: 'required' })
    .min(1, { message: 'required' }),
  expectedPassingCloPercentage: z.coerce.number({
    required_error: 'require expectedPassingCloPercentage',
  }),
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
});

export type CreateCourseSchemaValues = z.infer<typeof CreateCourseSchema>;

export const CreateCourseSchemaDefaultValues: Partial<CreateCourseSchemaValues> =
  {
    criteriaGradeA: 80,
    criteriaGradeBP: 75,
    criteriaGradeB: 70,
    criteriaGradeCP: 65,
    criteriaGradeC: 60,
    criteriaGradeDP: 55,
    criteriaGradeD: 50,
    criteriaGradeF: 45,
  };

export const UpdateCourseSchema = CreateCourseSchema.pick({
  name: true,
  description: true,
  code: true,
  curriculum: true,
  expectedPassingCloPercentage: true,
  criteriaGradeA: true,
  criteriaGradeBP: true,
  criteriaGradeB: true,
  criteriaGradeCP: true,
  criteriaGradeC: true,
  criteriaGradeDP: true,
  criteriaGradeD: true,
  criteriaGradeF: true,
});

export type UpdateCourseFormValues = z.infer<typeof UpdateCourseSchema>;

export const UpdateCourseDefaultValues: UpdateCourseFormValues = {
  name: '',
  description: '',
  code: '',
  curriculum: '',
  expectedPassingCloPercentage: 0,
  criteriaGradeA: 80,
  criteriaGradeBP: 75,
  criteriaGradeB: 70,
  criteriaGradeCP: 65,
  criteriaGradeC: 60,
  criteriaGradeDP: 55,
  criteriaGradeD: 50,
  criteriaGradeF: 45,
};
