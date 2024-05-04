import * as z from 'zod';

import { GetSubPloResponse } from '@/types/schema/sub-plo-schema';

// base

export const PloSchema = z.object({
  id: z.string(),
  code: z.string(),
  descriptionThai: z.string(),
  descriptionEng: z.string(),
  programYear: z.number(),
  programmeName: z.string(),
});

export type Plo = z.infer<typeof PloSchema>;

// response

export type GetProgramLearningOutcomeResponse = Plo & {
  subProgramLearningOutcomes: GetSubPloResponse[];
};

// column

export type PloColumn = Plo;

// form

export const CreatePloFormSchema = z.object({
  code: z
    .string({ required_error: 'required' })
    .min(1, { message: 'required' }),
  descriptionThai: z
    .string({ required_error: 'required' })
    .min(1, { message: 'required' }),
  descriptionEng: z.string(),
  programYear: z.coerce
    .number({ required_error: 'required' })
    .min(1, { message: 'required' }),
  programmeName: z
    .string({ required_error: 'required' })
    .min(1, { message: 'required' }),
});

export const CreateManyPloFormSchema = z.object({
  plo: z.array(CreatePloFormSchema),
});

export type PloWithCourse = {
  programLearningOutcomeId: string;
  courses: {
    id: string;
    code: string;
    name: string;
    passingPercentage: number;
    year: number;
    semesterSequence: string;
  }[];
};

export type CreatePloForm = z.infer<typeof CreatePloFormSchema>;
export type CreateManyPloForm = z.infer<typeof CreateManyPloFormSchema>;
export type UpdatePloForm = CreatePloForm;
// payload

// default values

export const CreatePloFormDefaultValues: CreatePloForm = {
  code: '',
  descriptionThai: '',
  descriptionEng: '',
  programYear: 0,
  programmeName: '',
};

export const CreateManyPloFormDefaultValues: CreateManyPloForm = {
  plo: [],
};
