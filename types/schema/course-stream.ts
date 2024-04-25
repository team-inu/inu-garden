import * as z from 'zod';

export enum CourseStreamType {
  UPSTREAM = 'UPSTREAM',
  DOWNSTREAM = 'DOWNSTREAM',
}

const CourseStream = z.object({
  id: z.string(),
  courseId: z.string(),
  courseStreamId: z.string(),
  type: z.nativeEnum(CourseStreamType),
  comment: z.string(),
});

export type CourseStream = z.infer<typeof CourseStream>;

export const CreateCourseStream = CourseStream.pick({
  courseStreamId: true,
  type: true,
  comment: true,
});

export const CreateCourseStreamPayload = CourseStream.pick({
  courseId: true,
  courseStreamId: true,
  type: true,
  comment: true,
});

export type CreateCourseStream = z.infer<typeof CreateCourseStream>;

export type CreateCourseStreamPayload = z.infer<
  typeof CreateCourseStreamPayload
>;

export const CreateCourseStreamDefaultValue: CreateCourseStream = {
  courseStreamId: '',
  type: CourseStreamType.UPSTREAM,
  comment: '',
};
