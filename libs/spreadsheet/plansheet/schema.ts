import * as z from 'zod';

export const CorseInfoSchema = z.object({
  CourseTitle: z.coerce.string(),
  Curriculum: z.coerce.string(),
  Semester: z.coerce.string(),
  AcademicYear: z.coerce.string(),
  GraduateYear: z.coerce.string(),
  ProgramYear: z.coerce.string(),
});

export const CloInfoSchema = z
  .object({
    'No.': z.coerce.string(),
    'Course Learning Outcomes (CLOs)': z.coerce.string(),
    Type: z.coerce.string(),
    'TABEE PO': z.coerce.string(),
    'KMUTT PLO': z.coerce.string(),
  })
  .array();

export const AssignmentPercentageInfoSchema = z
  .object({
    Item: z.coerce.string(),
    Description: z.coerce.string(),
    Value: z.number(),
  })
  .array();

export const PercentageThresholdTableSchema = z
  .object({
    Item: z.coerce.string(),
    Description: z.coerce.string(),
    Value: z.number(),
  })
  .array();

export const PercentageThresholdInfoSchema = z.object({
  PassingScoreThres: z.number(),
  PassingStudentThres: z.number(),
  PassingItemsThres: z.number(),
  PassingCLOsThres: z.number(),
});

/////////////

export const AssignmentInfoSchema = z
  .object({
    Topics: z.coerce.string(),
    CLO: z.coerce.string(),
    Assessment: z.coerce.string(),
    Item: z.coerce.string(),
    Include: z.coerce.string(),
    'Raw full score': z.number(),
    Description: z.coerce.string(),
  })
  .partial()
  .array();
