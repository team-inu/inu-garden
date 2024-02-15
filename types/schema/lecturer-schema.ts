import * as z from "zod";

export const CreateLecturerSchema = z.object({
  id: z.string({ required_error: "required" }).min(1, { message: "required" }),
  firstName: z
    .string({ required_error: "required" })
    .min(1, { message: "required" }),
  lastName: z
    .string({ required_error: "required" })
    .min(1, { message: "required" }),
  email: z
    .string({ required_error: "required" })
    .min(1, { message: "required" }),
});

export type CreateLecturerType = z.infer<typeof CreateLecturerSchema>;

export const CreateLecturerDefaultValues: CreateLecturerType = {
  id: "",
  firstName: "",
  lastName: "",
  email: "",
};
