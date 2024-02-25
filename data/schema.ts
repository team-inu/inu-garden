import { z } from 'zod';

export const EnrollmentSchema = z.object({
  id: z.string(),
  name: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  label: z.string(),
});

export type Enrollment = z.infer<typeof EnrollmentSchema>;

export const AdmissionSchema = z.object({
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

export type Admission = z.infer<typeof AdmissionSchema>;

export const AssignmentSchema = z.object({
  id: z.string(),
  name: z.string(),
  clo: z.string(),
  plo: z.string(),
  po: z.string(),
  weigth: z.string(),
  percentage: z.string(),
});

export type Assignement = z.infer<typeof AssignmentSchema>;

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

export const CLOSchema = z.object({
  id: z.string(),
  name: z.string(),
  code: z.string(),
  description: z.string(),
  weight: z.number(),
  expectedPassingAssignmentPercentage: z.number(),
  expectedScorePercentage: z.number(),
  expectedPassingStudentPercentage: z.number(),
  courseId: z.string(),
  subProgramLearningOutcomeId: z.string(),
  programLearningOutcomeId: z.string(),
  programOutcomeId: z.string(),
});

export type CLO = z.infer<typeof CLOSchema>;
