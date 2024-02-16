import * as z from "zod";

export const CreateScoreSchema = z.object({
  studentId: z
    .string({ required_error: "required" })
    .min(1, { message: "required" }),
  firstName: z
    .string({ required_error: "required" })
    .min(1, { message: "required" }),
  lastName: z
    .string({ required_error: "required" })
    .min(1, { message: "required" }),
  score: z
    .number({ required_error: "required" })
    .min(0, { message: "required" }),
});

export type CreateScoreType = z.infer<typeof CreateScoreSchema>;

export const CreateScoreDefaultValues: CreateScoreType = {
  studentId: "",
  firstName: "",
  lastName: "",
  score: 0,
};
