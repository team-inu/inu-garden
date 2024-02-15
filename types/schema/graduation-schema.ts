import * as z from "zod";

export const CreateGraduationSchema = z.object({
  id: z.string({ required_error: "required" }).min(1, { message: "required" }),
  studentId: z
    .string({ required_error: "required" })
    .min(1, { message: "required" }),
  firstName: z
    .string({ required_error: "required" })
    .min(1, { message: "required" }),
  lastName: z
    .string({ required_error: "required" })
    .min(1, { message: "required" }),
  year: z
    .number({ required_error: "required" })
    .min(1, { message: "required" }),
  workplace: z
    .string({ required_error: "required" })
    .min(1, { message: "required" }),
  remarks: z
    .string({ required_error: "required" })
    .min(1, { message: "required" }),
});

export type CreateGraduationType = z.infer<typeof CreateGraduationSchema>;

export const CreateGraduationDefaultValues: CreateGraduationType = {
  id: "",
  studentId: "",
  firstName: "",
  lastName: "",
  year: 0,
  workplace: "",
  remarks: "",
};
