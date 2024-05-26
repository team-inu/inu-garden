'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { courseService } from '@/services/course-service';
import { CreateCourseSchemaValues, UpdateCourseFormValues } from '@/types/schema/course-schema';

export const useCreateCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (course: CreateCourseSchemaValues) => courseService.createCourse(course),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['courses'],
      });
      toast.success('Course has been created', {
        description: 'You can now use this course.',
      });
    },
    onError: (error) => {
      toast.error('Failed to create course', {
        description: error.message,
      });
    },
  });
};

export const useUpdateCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ course, courseId }: { course: UpdateCourseFormValues; courseId: string }) =>
      courseService.updateCourse(course, courseId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['courses'],
      });
      toast.success('Course has been updated');
    },
    onError: (error) => {
      toast.error('Failed to update course', {
        description: error.message,
      });
    },
  });
};

export const useCourseListByUser = (userId: string) =>
  useQuery({
    queryKey: ['courses', userId],
    queryFn: () => courseService.getCourseListByUser(userId),
  });

export const useCourseList = () =>
  useQuery({
    queryKey: ['courses'],
    queryFn: () => courseService.getCourseList(),
  });

export const useGetCourseById = (id: string) =>
  useQuery({
    queryKey: ['courses', id],
    queryFn: () => courseService.getCourseById(id),
  });

export const useDeleteCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (courseId: string) => courseService.deleteCourse(courseId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['courses'],
      });
      toast.success('Course has been deleted');
    },
    onError: (error) => {
      toast.error('Failed to delete course', {
        description: error.message,
      });
    },
  });
};
