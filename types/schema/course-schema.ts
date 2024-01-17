import * as z from "zod";

export const CreateCourseSchema = z.object({
  name: z
    .string({ required_error: "required" })
    .min(1, { message: "required" }),
  description: z
    .string({ required_error: "required" })
    .min(1, { message: "required" }),
  code: z
    .string({ required_error: "required" })
    .min(1, { message: "required" }),
  lecturer: z
    .string({ required_error: "required" })
    .min(1, { message: "required" }),
  semester: z
    .string({ required_error: "required" })
    .min(1, { message: "required" }),
  courseLearningOutcome: z
    .array(
      z.object({
        code: z.string({ required_error: "required" }).min(1, {
          message: "required",
        }),
        weight: z
          .string({ required_error: "required" })
          .min(1, { message: "required" }),
        description: z
          .string({ required_error: "required" })
          .min(1, { message: "required" }),
        subProgramLearningOutcome: z
          .string({ required_error: "required" })
          .min(1, { message: "required" }),
        programOutcome: z
          .string({ required_error: "required" })
          .min(1, { message: "required" }),
      })
    )
    .min(1, { message: "Please enter at least one course learning outcome" }),
  grade: z.object({
    a: z
      .string({ required_error: "Please enter A grade" })
      .min(1, { message: "Please enter A grade" }),
    b: z
      .string({ required_error: "Please enter B grade" })
      .min(1, { message: "Please enter B grade" }),
    c: z
      .string({ required_error: "Please enter C grade" })
      .min(1, { message: "Please enter C grade" }),
    d: z
      .string({ required_error: "Please enter D grade" })
      .min(1, { message: "Please enter D grade" }),
    f: z
      .string({ required_error: "Please enter F grade" })
      .min(1, { message: "Please enter F grade" }),
  }),
});

export type CreateCourseSchemaValues = z.infer<typeof CreateCourseSchema>;

export const CreateCourseSchemaDefaultValues: Partial<CreateCourseSchemaValues> =
  {
    courseLearningOutcome: [
      {
        code: "",
        weight: "",
        description: "",
        subProgramLearningOutcome: "",
        programOutcome: "",
      },
    ],
  };
