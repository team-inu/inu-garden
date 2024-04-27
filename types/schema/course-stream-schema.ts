import * as z from 'zod';

export enum CourseStreamType {
  UPSTREAM = 'UPSTREAM',
  DOWNSTREAM = 'DOWNSTREAM',
}

const CourseStream = z.object({
  id: z.string(),
  formCourseId: z.string(),
  targetCourseId: z.string(),
  streamType: z.nativeEnum(CourseStreamType),
  comment: z.string(),
});

export type CourseStream = z.infer<typeof CourseStream>;

export const CreateCourseStream = CourseStream.pick({
  targetCourseId: true,
  comment: true,
  streamType: true,
});

export const CreateCourseStreamPayload = CourseStream.pick({
  formCourseId: true,
  targetCourseId: true,
  comment: true,
  streamType: true,
});

export type CreateCourseStream = z.infer<typeof CreateCourseStream>;

export type CreateCourseStreamPayload = z.infer<
  typeof CreateCourseStreamPayload
>;

export const CreateCourseStreamDefaultValue: CreateCourseStream = {
  targetCourseId: '',
  comment: '',
  streamType: CourseStreamType.UPSTREAM,
};
