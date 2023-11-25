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
