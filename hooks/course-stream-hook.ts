import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { courseStreamService } from '@/services/course-stream-service';
import { CreateCourseStreamPayload } from '@/types/schema/course-stream-schema';

export const useGetCourseStreams = () =>
  useQuery({
    queryKey: ['course-streams'],
    queryFn: () => courseStreamService.getCourseStreamList(),
  });

export const useGetTargetCourseStreamByCourseId = (courseId: string) => {
  return useQuery({
    queryKey: ['course-streams', courseId],
    queryFn: () => courseStreamService.getTargetCourseStream(courseId),
  });
};

export const useGetHistoryCourseStreamByCourseId = (courseId: string) => {
  return useQuery({
    queryKey: ['history-course-streams', courseId],
    queryFn: () => courseStreamService.getHistoryCourseStream(courseId),
  });
};

export const useCreateCourseStreamComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (couresStreamData: CreateCourseStreamPayload) =>
      courseStreamService.createCourseStream(couresStreamData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['course-streams'],
      });
      toast.success('Comment has been created', {
        description: 'Your target course can now seeing you comment.',
      });
    },
    onError: (error) => {
      toast.error('Failed to create comment', {
        description: error.message,
      });
    },
  });
};

export const useDeleteCourseStreamComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (courseId: string) =>
      courseStreamService.deleteCourseStream(courseId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['history-course-streams'],
      });
      toast.success('course stream has been delete', {
        description: 'disappeared!!!',
      });
    },
    onError: (error) => {
      toast.error('Failed to remove course stream', {
        description: error.message,
      });
    },
  });
};
