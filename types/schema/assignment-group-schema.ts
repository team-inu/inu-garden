import * as z from 'zod';

// base

export const AssignmentGroupSchema = z.object({
  id: z.string(),
  name: z.string(),
  weight: z.number(),
  courseId: z.string(),
});

// response

export type GetAssignmentGroupResponse = z.infer<typeof AssignmentGroupSchema>;

// column

export type AssignmentGroupColumn = z.infer<typeof AssignmentGroupSchema>;

// form

export const CreateAssignmentGroupFormSchema = z.object({
  name: z
    .string({ required_error: 'required' })
    .min(1, { message: 'required' }),
  weight: z.coerce.number({ required_error: 'required' }),
  courseId: z
    .string({ required_error: 'required' })
    .min(1, { message: 'required' }),
});

export const UpdateAssignmentGroupFormSchema =
  CreateAssignmentGroupFormSchema.omit({
    courseId: true,
  }).extend({
    id: z.string(),
  });

export type CreateAssignmentGroupForm = z.infer<
  typeof CreateAssignmentGroupFormSchema
>;
export type UpdateAssignmentGroupForm = z.infer<
  typeof UpdateAssignmentGroupFormSchema
>;

// default values

export const CreateAssignmentGroupFormDefaultValues: CreateAssignmentGroupForm =
  {
    name: '',
    weight: 0,
    courseId: '',
  };

export const UpdateAssignmentGroupFormDefaultValues: UpdateAssignmentGroupForm =
  {
    id: '',
    name: '',
    weight: 0,
  };
