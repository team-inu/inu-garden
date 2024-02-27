import { z } from 'zod';

export const LecturerSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  collapsibleContent: z.string(),
});

export type Lecturer = z.infer<typeof LecturerSchema>;

export const GraduationSchema = z.object({
  id: z.string(),
  studentId: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  year: z.number(),
  workPlace: z.string(),
  remarks: z.string(),
});

export type Graduation = z.infer<typeof GraduationSchema>;

export const ScoreSchema = z.object({
  id: z.string(),
  studentId: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  score: z.number(),
});

export type Score = z.infer<typeof ScoreSchema>;

export const PLOSchema = z.object({
  id: z.string(),
  code: z.string(),
  descriptionThai: z.string(),
  descriptionEng: z.string(),
  programYear: z.number(),
  programmeName: z.string(),
});

export type PLO = z.infer<typeof PLOSchema>;

export const SubPLOSchema = z.object({
  id: z.string(),
  code: z.string(),
  descriptionThai: z.string(),
  descriptionEng: z.string(),
  programLearningOutcomeId: z.string(),
});

export type SubPLO = z.infer<typeof SubPLOSchema>;

export const POSchema = z.object({
  id: z.string(),
  code: z.string(),
  name: z.string(),
  description: z.string(),
});

export type PO = z.infer<typeof POSchema>;
