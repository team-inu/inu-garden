import * as z from 'zod';

export const PredictGradeFormSchema = z.object({
  programmeName: z.string({ required_error: 'required' }).min(1, { message: 'required' }),
  gpax: z.coerce
    .number({ required_error: 'required' })
    .min(0, { message: 'value could more that 0' })
    .max(4, { message: 'value could less than 4' }),
  mathGPA: z.coerce
    .number({ required_error: 'required' })
    .min(0, { message: 'value could more that 0' })
    .max(4, { message: 'value could less than 4' }),
  engGPA: z.coerce
    .number({ required_error: 'required' })
    .min(0, { message: 'value could more that 0' })
    .max(4, { message: 'value could less than 4' }),
  sciGPA: z.coerce
    .number({ required_error: 'required' })
    .min(0, { message: 'value could more that 0' })
    .max(4, { message: 'value could less than 4' }),
  school: z.string({ required_error: 'required' }).min(1, { message: 'required' }),
  admission: z.string({ required_error: 'required' }).min(1, { message: 'required' }),
});

export const PredictionGradeResponseSchema = z.object({
  predictedGPAX: z.number(),
});

export type PredictGradeForm = z.infer<typeof PredictGradeFormSchema>;

export const PredictGradeRequestDefaultValue: PredictGradeForm = {
  programmeName: '',
  gpax: 0,
  mathGPA: 0,
  engGPA: 0,
  sciGPA: 0,
  school: '',
  admission: '',
};
export type PredictionGradeResponse = z.infer<typeof PredictionGradeResponseSchema>;
