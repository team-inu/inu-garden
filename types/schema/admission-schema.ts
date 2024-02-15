import * as z from "zod";

export const CreateAdmissionSchema = z.object({
  admissionId: z
    .string({ required_error: "required" })
    .min(1, { message: "required" }),
  firstName: z
    .string({ required_error: "required" })
    .min(1, { message: "required" }),
  lastName: z
    .string({ required_error: "required" })
    .min(1, { message: "required" }),
  admission: z
    .string({ required_error: "required" })
    .min(1, { message: "required" }),
  email: z
    .string({ required_error: "required" })
    .min(1, { message: "required" }),
  gpax: z
    .number({ required_error: "required" })
    .min(1, { message: "required" }),
  gpaMath: z
    .number({ required_error: "required" })
    .min(1, { message: "required" }),
  gpaEng: z
    .number({ required_error: "required" })
    .min(1, { message: "required" }),
  gpaSci: z
    .number({ required_error: "required" })
    .min(1, { message: "required" }),
  school: z
    .string({ required_error: "required" })
    .min(1, { message: "required" }),
  city: z
    .string({ required_error: "required" })
    .min(1, { message: "required" }),

});

export type CreateAdmissionType = z.infer<typeof CreateAdmissionSchema>;

export const CreateAdmissionDefaultValues: CreateAdmissionType = {
  admissionId: "",
  firstName: "",
  lastName: "",
  admission: "",
  email: "",
  gpax: 0,
  gpaMath: 0,
  gpaEng: 0,
  gpaSci: 0,
  school: '',
  city: '',
};
