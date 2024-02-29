import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { assignmentService } from '@/services/assignment-service';
import { CreateAssignmentForm } from '@/types/schema/assignment-schema';

export const useGetAssignmentByCourseId = (courseId: string) =>
  useQuery({
    queryKey: ['assignments'],
    queryFn: () => assignmentService.getAssignmentsByCourseId(courseId),
  });

export const useGetAssignmentById = (assignmentId: string) =>
  useQuery({
    queryKey: ['assignments', assignmentId],
    queryFn: () => assignmentService.getAssignmentById(assignmentId),
  });

export const useCreateAssignment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (assignment: CreateAssignmentForm) =>
      assignmentService.createAssignment(assignment),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['assignments'],
      });
      toast.success('Assignment has been created', {
        description: 'You can now add questions to the assignment.',
      });
    },
    onError: (error) => {
      toast.error('Failed to create assignment', {
        description: error.message,
      });
    },
  });
};
