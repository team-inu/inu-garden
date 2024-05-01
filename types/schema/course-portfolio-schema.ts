import * as z from 'zod';

// [1] Info

const CourseInfoSchema = z.object({
  courseName: z.string().min(1, { message: 'required' }),
  courseCode: z.string().min(1, { message: 'required' }),
  lecturers: z.array(z.string().min(1, { message: 'required' })).min(1, {
    message: 'required',
  }),
});

// [2] Summary

const CourseSummarySchema = z.object({
  teachingMethods: z
    .array(z.object({ name: z.string().min(1, { message: 'required' }) }))
    .min(1, { message: 'required' }),
  onlineTool: z.string().min(1, { message: 'required' }),
  objectives: z
    .array(z.object({ name: z.string().min(1, { message: 'required' }) }))
    .min(1, { message: 'required' }),
});

export type CourseSummary = z.infer<typeof CourseSummarySchema>;

// [3.1] Tabee Outcome

const AssessmentSchema = z.object({
  assessmentTask: z.string().min(1, { message: 'required' }),
  passingCriteria: z.number(),
  studentPassPercentage: z.number(),
});

const CourseOutcomeSchema = z.object({
  name: z.string().min(1, { message: 'required' }),
  assessments: z.array(AssessmentSchema),
});

const TabeeOutcomeSchema = z.object({
  name: z.string().min(1, { message: 'required' }),
  courseOutcomes: z.array(CourseOutcomeSchema),
  minimumPercentage: z.number(),
});

export type Assessment = z.infer<typeof AssessmentSchema>;
export type CourseOutcome = z.infer<typeof CourseOutcomeSchema>;
export type TabeeOutcome = z.infer<typeof TabeeOutcomeSchema>;

// [3.2] Grade Distribution

const GradeFrequencySchema = z.object({
  name: z.string().min(1, { message: 'required' }),
  gradeScore: z.number(),
  frequency: z.number(),
});

const ScoreFrequencySchema = z.object({
  score: z.number(),
  frequency: z.number(),
});

const GradeDistributionSchema = z.object({
  studentAmount: z.string().min(1, { message: 'required' }),
  GPA: z.number(),
  gradeFrequencies: z.array(GradeFrequencySchema),
  scoreFrequencies: z.array(ScoreFrequencySchema),
});

// [3] Result

const CourseResultSchema = z.object({
  tabeeOutcomes: z.array(TabeeOutcomeSchema),
  gradeDistribution: GradeDistributionSchema,
  gradeDistributionImage: z.string(),
});

export type GradeFrequency = z.infer<typeof GradeFrequencySchema>;
export type ScoreFrequency = z.infer<typeof ScoreFrequencySchema>;
export type GradeDistribution = z.infer<typeof GradeDistributionSchema>;
export type CourseResult = z.infer<typeof CourseResultSchema>;

// [4] Development

const CourseDevelopmentSchema = z.object({
  plans: z
    .array(z.object({ name: z.string().min(1, { message: 'required' }) }))
    .min(1, { message: 'required' }),
  doAndChecks: z
    .array(z.object({ name: z.string().min(1, { message: 'required' }) }))
    .min(1, { message: 'required' }),
  acts: z
    .array(z.object({ name: z.string().min(1, { message: 'required' }) }))
    .min(1, { message: 'required' }),
  subjectComments: z.object({
    upstreamSubjects: z.array(
      z.object({
        courseName: z.string().optional(),
        comments: z.string().optional(),
      }),
    ),
    downstreamSubjects: z.array(
      z.object({
        courseName: z.string().optional(),
        comments: z.string().optional(),
      }),
    ),
    other: z.string().optional(),
  }),
  otherComment: z.string().optional(),
});

export type CourseDevelopment = z.infer<typeof CourseDevelopmentSchema>;

// [] Course Portfolio

export const CoursePortfolioFormSchema = z.object({
  info: CourseInfoSchema,
  summary: CourseSummarySchema,
  result: CourseResultSchema,
  development: CourseDevelopmentSchema,
});

// Form
export const GetCoursePortfolioFormSchema = CoursePortfolioFormSchema;
export const CreateCoursePortfolioFormSchema = CoursePortfolioFormSchema;

export type GetCoursePortfolioForm = z.infer<
  typeof GetCoursePortfolioFormSchema
>;

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
      teachingMethods: [{ name: '' }],
      onlineTool: '',
      objectives: [{ name: '' }],
    },
    development: {
      plans: [{ name: '' }],
      doAndChecks: [{ name: '' }],
      acts: [{ name: '' }],
      subjectComments: {
        upstreamSubjects: [{ courseName: '', comments: '' }],
        downstreamSubjects: [{ courseName: '', comments: '' }],
        other: '',
      },
      otherComment: '',
    },
  };

//response
export const GetStudentResultClo = z.object({
  courseLearningOutcomeId: z.string(),
  students: z.array(
    z.object({
      studentId: z.string(),
      firstName: z.string(),
      lastName: z.string(),
      pass: z.boolean(),
    }),
  ),
});

export type StudentResultClo = z.infer<typeof GetStudentResultClo>;

export const GetEnrollmentResultPloPo = z.object({
  studentId: z.string(),
  programLearningOutcomes: z.array(
    z.object({
      pass: z.boolean(),
      code: z.string(),
      id: z.string(),
      descriptionThai: z.string(),
      programYear: z.number(),
    }),
  ),
  programOutcomes: z.array(
    z.object({
      pass: z.boolean(),
      code: z.string(),
      id: z.string(),
      name: z.string(),
    }),
  ),
});

export type EnrollmentResultPloPo = z.infer<typeof GetEnrollmentResultPloPo>;
