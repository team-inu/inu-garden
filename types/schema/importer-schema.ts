import * as z from 'zod';

export const ImportScoreSchema = z.object({
  score: z.number(),
  studentId: z.string(),
});

export const ImportAssignmentSchema = z.object({
  name: z.string(),
  description: z.string(),
  maxScore: z.number(),
  expectedScorePercentage: z.number(),
  expectedPassingStudentPercentage: z.number(),
  courseLearningOutcomeCodes: z.string().array(),
  isIncludedInClo: z.boolean(),
  scores: ImportScoreSchema.array(),
});

export const ImportAssignmentGroupSchema = z.object({
  name: z.string(),
  weight: z.number(),
  assignments: ImportAssignmentSchema.array(),
});

const ImportCourseLearningOutcomeSchema = z.object({
  code: z.string(),
  description: z.string(),
  expectedPassingAssignmentPercentage: z.number(),
  expectedPassingStudentPercentage: z.number(),
  status: z.string(),
  programOutcomeCode: z.string(),
  courseId: z.string(),
  subProgramLearningOutcomeCodes: z.string().array(),
});

export const ImportCourseSchema = z.object({
  courseId: z.coerce.string(),
  programYear: z.coerce.string(),
  studentIds: z.coerce.string().array(),
  courseLearningOutcomes: ImportCourseLearningOutcomeSchema.array(),
  assignmentGroups: ImportAssignmentGroupSchema.array(),
});

export type ImportScore = z.infer<typeof ImportScoreSchema>;
export type ImportAssignment = z.infer<typeof ImportAssignmentSchema>;
export type ImportAssignmentGroup = z.infer<typeof ImportAssignmentGroupSchema>;
export type ImportCourseLearningOutcome = z.infer<typeof ImportCourseLearningOutcomeSchema>;

export type ImportCourse = z.infer<typeof ImportCourseSchema>;

export const ImportCourseDefaultValue: ImportCourse = {
  courseId: '',
  programYear: '',
  studentIds: [],
  assignmentGroups: [],
  courseLearningOutcomes: [],
};
