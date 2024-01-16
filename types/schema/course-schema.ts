import * as z from "zod";

export const CreateCourseSchema = z.object({
  name: z
    .string({ required_error: "Please enter a name" })
    .min(1, { message: "Please enter a name" }),
  description: z
    .string({ required_error: "Please enter a description" })
    .min(1, { message: "Please enter a description" }),
  code: z
    .string({ required_error: "Please enter a code" })
    .min(1, { message: "Please enter a code" }),
  lecturer: z
    .string({ required_error: "Please enter a lecturer" })
    .min(1, { message: "Please enter a lecturer" }),
  semester: z
    .string({ required_error: "Please enter a semester" })
    .min(1, { message: "Please enter a semester" }),
  courseLearningOutcome: z
    .array(
      z.object({
        code: z.string({ required_error: "Please enter a code" }).min(1, {
          message: "Please enter a code",
        }),
        weight: z
          .string({ required_error: "Please enter a weight" })
          .min(1, { message: "Please enter a weight" }),
        description: z
          .string({ required_error: "Please enter a description" })
          .min(1, { message: "Please enter a description" }),
        subProgramLearningOutcome: z
          .string({ required_error: "Please enter a program learning outcome" })
          .min(1, { message: "Please enter a program learning outcome" }),
        programOutcome: z
          .string({ required_error: "Please enter a program outcome" })
          .min(1, { message: "Please enter a program outcome" }),
      })
    )
    .min(1, { message: "Please enter at least one course learning outcome" }),
  grade: z.object({
    a: z
      .number({ required_error: "Please enter A grade" })
      .min(0, { message: "Please enter A grade" }),
    b: z
      .number({ required_error: "Please enter B grade" })
      .min(0, { message: "Please enter B grade" }),
    c: z
      .number({ required_error: "Please enter C grade" })
      .min(0, { message: "Please enter C grade" }),
    d: z
      .number({ required_error: "Please enter D grade" })
      .min(0, { message: "Please enter D grade" }),
    f: z
      .number({ required_error: "Please enter F grade" })
      .min(0, { message: "Please enter F grade" }),
  }),
});

export type CreateCourseSchemaValues = z.infer<typeof CreateCourseSchema>;

export const CreateCourseSchemaDefaultValues: Partial<CreateCourseSchemaValues> =
  {};
