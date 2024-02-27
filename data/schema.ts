import { z } from 'zod';

export const PLOSchema = z.object({
  id: z.string(),
  code: z.string(),
  descriptionThai: z.string(),
  descriptionEng: z.string(),
  programYear: z.number(),
  programmeName: z.string(),
});

export type PLO = z.infer<typeof PLOSchema>;

export const SubPLOSchema = z.object({
  id: z.string(),
  code: z.string(),
  descriptionThai: z.string(),
  descriptionEng: z.string(),
  programLearningOutcomeId: z.string(),
});

export type SubPLO = z.infer<typeof SubPLOSchema>;

export const POSchema = z.object({
  id: z.string(),
  code: z.string(),
  name: z.string(),
  description: z.string(),
});

export type PO = z.infer<typeof POSchema>;
