import * as z from 'zod';

// [1] Info

const CourseInfoSchema = z.object({
  courseName: z.string().min(1, { message: 'required' }),
  courseCode: z.string().min(1, { message: 'required' }),
  lecturer: z.array(z.string().min(1, { message: 'required' })).min(1, {
    message: 'required',
  }),
});

// [2] Summary

const CourseSummarySchema = z.object({
  teachingMethod: z
    .array(z.object({ name: z.string().min(1, { message: 'required' }) }))
    .min(1, { message: 'required' }),
  onlineTool: z.string().min(1, { message: 'required' }),
  objective: z
    .array(z.object({ name: z.string().min(1, { message: 'required' }) }))
    .min(1, { message: 'required' }),
});

export type CourseSummary = z.infer<typeof CourseSummarySchema>;

// [3.1] Tabee Outcome

const AssessmentSchema = z.object({
  assessmentTask: z.string().min(1, { message: 'required' }),
  passingCriteria: z.string().min(1, { message: 'required' }),
  studentPassPercentage: z.string().min(1, { message: 'required' }),
});

const CourseOutcomeSchema = z.object({
  name: z.string().min(1, { message: 'required' }),
  assessments: z.array(AssessmentSchema),
});

const TabeeOutcomeSchema = z.object({
  name: z.string().min(1, { message: 'required' }),
  courseOutcomes: z.array(CourseOutcomeSchema),
  minimumPercentage: z.string().min(1, { message: 'required' }),
});

export type Assessment = z.infer<typeof AssessmentSchema>;
export type CourseOutcome = z.infer<typeof CourseOutcomeSchema>;
export type TabeeOutcome = z.infer<typeof TabeeOutcomeSchema>;

// [3.2] Grade Distribution

const GradeFrequencySchema = z.object({
  name: z.string().min(1, { message: 'required' }),
  gradeScore: z.string().min(1, { message: 'required' }),
  frequency: z.string().min(1, { message: 'required' }),
});

const GradeDistributionSchema = z.object({
  studentAmount: z.string().min(1, { message: 'required' }),
  GPA: z.string().min(1, { message: 'required' }),
  gradeFrequencies: z.array(GradeFrequencySchema),
});

// [3] Result

const CourseResultSchema = z.object({
  tabeeOutcomes: z.array(TabeeOutcomeSchema),
  gradeDistribution: GradeDistributionSchema,
  gradeDistributionImage: z.object({}),
});

export type GradeFrequency = z.infer<typeof GradeFrequencySchema>;
export type GradeDistribution = z.infer<typeof GradeDistributionSchema>;
export type CourseResult = z.infer<typeof CourseResultSchema>;

// [4] Development

const CourseDevelopmentSchema = z.object({
  plan: z
    .array(z.object({ name: z.string().min(1, { message: 'required' }) }))
    .min(1, { message: 'required' }),
  doAndCheck: z
    .array(z.object({ name: z.string().min(1, { message: 'required' }) }))
    .min(1, { message: 'required' }),
  act: z
    .array(z.object({ name: z.string().min(1, { message: 'required' }) }))
    .min(1, { message: 'required' }),
  subjectsComments: z.object({
    upstream: z.array(
      z.object({
        courseName: z.string().min(1, { message: 'required' }),
        comments: z.string().min(1, { message: 'required' }),
      }),
    ),
    downstream: z.array(
      z.object({
        courseName: z.string().min(1, { message: 'required' }),
        comments: z.string().min(1, { message: 'required' }),
      }),
    ),
    other: z.string().min(1, { message: 'required' }),
  }),
  otherComments: z.string().min(1, { message: 'required' }),
});

export type CourseDevelopment = z.infer<typeof CourseDevelopmentSchema>;

// Form

export const CreateCoursePortfolioFormSchema = z.object({
  info: CourseInfoSchema,
  summary: CourseSummarySchema,
  result: CourseResultSchema,
  development: CourseDevelopmentSchema,
});

export type CreateCoursePortfolioForm = z.infer<
  typeof CreateCoursePortfolioFormSchema
>;

export const CreateCoursePortfolioFillableSchema =
  CreateCoursePortfolioFormSchema.pick({
    summary: true,
    development: true,
  });

export type CreateCoursePortfolioFillableSchema = z.infer<
  typeof CreateCoursePortfolioFillableSchema
>;

export const CreateCoursePortfolioFillableDefaultValues: Partial<CreateCoursePortfolioFillableSchema> =
  {
    summary: {
      teachingMethod: [{ name: '' }],
      onlineTool: '',
      objective: [{ name: '' }],
    },
    development: {
      plan: [{ name: '' }],
      doAndCheck: [{ name: '' }],
      act: [{ name: '' }],
      subjectsComments: {
        upstream: [{ courseName: '', comments: '' }],
        downstream: [{ courseName: '', comments: '' }],
        other: '',
      },
      otherComments: '',
    },
  };
