import * as z from 'zod';

const Info = z.object({
  courseName: z.string().min(1, { message: 'required' }),
  courseCode: z.string().min(1, { message: 'required' }),
  user: z.array(z.string().min(1, { message: 'required' })).min(1, {
    message: 'required',
  }),
});

// { Grade, GradeFrequency }
// { Assessment, Course, ProgramOutcome }

const Summary = z.object({
  teachingMethod: z
    .array(z.object({ name: z.string().min(1, { message: 'required' }) }))
    .min(1, { message: 'required' }),
  onlineTool: z.string().min(1, { message: 'required' }),
  objective: z
    .array(z.object({ name: z.string().min(1, { message: 'required' }) }))
    .min(1, { message: 'required' }),
});

export type SummaryType = z.infer<typeof Summary>;

const Assessment = z.object({
  assessmentTask: z.string().min(1, { message: 'required' }),
  passingCriteria: z.string().min(1, { message: 'required' }),
  studentPassPercentage: z.string().min(1, { message: 'required' }),
});

export type AssessmentType = z.infer<typeof Assessment>;

const Course = z.object({
  courseOutcome: z.string().min(1, { message: 'required' }),
  assessments: z.array(Assessment),
});

export type CourseType = z.infer<typeof Course>;

const ProgramOutcome = z.object({
  tabeeOutcome: z.string().min(1, { message: 'required' }),
  minimumPercentage: z.string().min(1, { message: 'required' }),
  courses: z.array(Course),
});

export type ProgramOutcomeType = z.infer<typeof ProgramOutcome>;

const GradeFrequency = z.object({
  name: z.string().min(1, { message: 'required' }),
  gradeScore: z.string().min(1, { message: 'required' }),
  frequency: z.string().min(1, { message: 'required' }),
});

export type GradeFrequencyType = z.infer<typeof GradeFrequency>;

const Grade = z.object({
  studentAmount: z.string().min(1, { message: 'required' }),
  GPA: z.string().min(1, { message: 'required' }),
  gradeFrequencies: z.array(GradeFrequency),
});

export type GradeType = z.infer<typeof Grade>;

const Outcome = z.object({
  grade: Grade,
  gradeDistibutionImage: z.object({}),
  programOutcomes: z.array(ProgramOutcome),
});

export type OutcomeType = z.infer<typeof Outcome>;

const Development = z.object({
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

export type DevelopmentType = z.infer<typeof Development>;

export const CreateCoursePortfolioSchema = z.object({
  info: Info,
  summary: Summary,
  outcome: Outcome,
  development: Development,
});

export type CreateCoursePortfolioSchemaType = z.infer<
  typeof CreateCoursePortfolioSchema
>;

export const CreateCoursePortfolioFillableSchema = z.object({
  summary: Summary,
  development: Development,
});

export type CreateCoursePortfolioFillableSchemaType = z.infer<
  typeof CreateCoursePortfolioFillableSchema
>;

export const CreateCoursePortfolioFillableSchemaDefaultValues: Partial<CreateCoursePortfolioFillableSchemaType> =
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
