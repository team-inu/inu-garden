'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

import { courseService } from '@/services/course-service';
import { CreateCourseSchemaValues } from '@/types/schema/course-schema';

export const useCreateCourse = () => {
  return useMutation({
    mutationFn: (course: CreateCourseSchemaValues) =>
      courseService.createCourse(course),
    onSuccess: () => {
      toast.success('Course has been created', {
        description: 'You can now add questions to the course.',
      });
    },
    onError: (error) => {
      toast.error('Failed to create course', {
        description: error.message,
      });
    },
  });
};

export const useCourseListByLecturer = (lecturerId: string) =>
  useQuery({
    queryKey: ['courses', lecturerId],
    queryFn: () => courseService.getCourseListByLecturer(lecturerId),
  });
