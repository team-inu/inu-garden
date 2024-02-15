import * as z from "zod";

export const CreateSubPloSchema = z.object({
  id: z
    .string({ required_error: "required" })
    .min(1, { message: "required" }),
    descriptionThai: z
    .string({ required_error: "required" })
    .min(1, { message: "required" }),
    descriptionEnglish: z
    .string({ required_error: "required" })
    .min(1, { message: "required" }),
});

export type CreateSubPloType = z.infer<typeof CreateSubPloSchema>;

export const CreateSubPloDefaultValues: CreateSubPloType = {
  id: "",
  descriptionThai: "",
  descriptionEnglish: "",
};
