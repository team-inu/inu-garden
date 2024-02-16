import * as z from "zod";

export const CreatePoSchema = z.object({
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

export type CreatePoType = z.infer<typeof CreatePoSchema>;

export const CreatePoDefaultValues: CreatePoType = {
  id: "",
  name: "",
  description: "",
};
