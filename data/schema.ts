import { z } from "zod";

export const StudentSchema = z.object({
  id: z.string(),
  name: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  label: z.string(),
});

export type Student = z.infer<typeof StudentSchema>;

export const AdmissionSchema = z.object({
  id: z.string(),
  studentId: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  admission: z.string(),
  email: z.string(),
  GPAX: z.number(),
  mathGPA: z.number(),
  englishGPA: z.number(),
  scienceGPA: z.number(),
  school: z.string(),
  city: z.string(),
});

export type Admission = z.infer<typeof AdmissionSchema>;

export const AssignmentSchema = z.object({
  id: z.string(),
  name: z.string(),
  clo: z.string(),
  plo: z.string(),
  po: z.string(),
  weigth: z.string(),
  dueDate: z.date(),
  percentage: z.string(),
});

export type Assignement = z.infer<typeof AssignmentSchema>;

export const LecturerSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
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
  name: z.string(),
  description: z.string(),
});

export type PLO = z.infer<typeof PLOSchema>;

export const SubPLOSchema = z.object({
  id: z.string(),
  descriptionThai: z.string(),
  descriptionEnglish: z.string(),
});

export type SubPLO = z.infer<typeof SubPLOSchema>;

export const POSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
});

export type PO = z.infer<typeof POSchema>;
