import { z } from "zod"

export const StudentSchema = z.object({
  id: z.string(),
  name: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  label: z.string(),
})

export type Student = z.infer<typeof StudentSchema>

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
})

export type Admission = z.infer<typeof AdmissionSchema>
