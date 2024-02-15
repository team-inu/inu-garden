import * as z from "zod";

const optionSchema = z.object({
  label: z.string(),
  value: z.string(),
  disable: z.boolean().optional(),
});

export const CreateAssignmentSchema = z.object({
  id: z.string({ required_error: "required" }).min(1, { message: "required" }),
  name: z
    .string({ required_error: "required" })
    .min(1, { message: "required" }),
  clo: z.array(optionSchema).min(1, { message: "required" }),
  plo: z.array(optionSchema).min(1, { message: "required" }),
  po: z.array(optionSchema).min(1, { message: "required" }),
  weigth: z
    .string({ required_error: "required" })
    .min(1, { message: "required" }),
  dueDate: z.date({ required_error: "required" }),
  percentage: z
    .string({ required_error: "required" })
    .min(1, { message: "required" }),
});

export type CreateAssignmentType = z.infer<typeof CreateAssignmentSchema>;

export const CreateAssignmentDefaultValues: CreateAssignmentType = {
  id: "",
  name: "",
  clo: [],
  plo: [],
  po: [],
  weigth: "",
  dueDate: new Date(),
  percentage: "",
};
