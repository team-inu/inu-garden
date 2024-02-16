import * as z from "zod";

export const CreatePloSchema = z.object({
  id: z
    .string({ required_error: "required" })
    .min(1, { message: "required" }),
  name: z
    .string({ required_error: "required" })
    .min(1, { message: "required" }),
  description: z
    .string({ required_error: "required" })
    .min(1, { message: "required" }),
});

export type CreatePloType = z.infer<typeof CreatePloSchema>;

export const CreatePloDefaultValues: CreatePloType = {
  id: "",
  name: "",
  description: "",
};
