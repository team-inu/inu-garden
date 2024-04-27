import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { courseStreamService } from '@/services/course-stream-service';
import { CreateCourseStreamPayload } from '@/types/schema/course-stream-schema';

export const useGetCourseStreams = () =>
  useQuery({
    queryKey: ['course-streams'],
    queryFn: () => courseStreamService.getCourseStreamList(),
  });

export const useGetCommentsByCourseId = (courseId: string) => {
  return useQuery({
    queryKey: ['comments', courseId],
    queryFn: () => courseStreamService.getCommentByCourseId(courseId),
  });
};

export const useCreateCourseStreamComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (couresStreamData: CreateCourseStreamPayload) =>
      courseStreamService.createCourseStream(couresStreamData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['lecturers'],
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
