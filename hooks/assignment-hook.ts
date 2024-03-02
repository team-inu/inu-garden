import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { assignmentService } from '@/services/assignment-service';
import {
  CreateAssignmentForm,
  UpdateAssignmentForm,
} from '@/types/schema/assignment-schema';

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

export const useUpdateAssignment = () => {
  return useMutation({
    mutationFn: (assignment: UpdateAssignmentForm) =>
      assignmentService.updateAssignment(assignment),
    onSuccess: () => {
      toast.success('Assignment status has been updated');
    },
    onError: (error) => {
      toast.error('Failed to update assignment', {
        description: error.message,
      });
    },
  });
};

export const useDeleteAssignment = () => {
  return useMutation({
    mutationFn: (assignmentId: string) =>
      assignmentService.deleteAssignment(assignmentId),
    onSuccess: () => {
      toast.success('assignment has been deleted', {});
    },
    onError: (error) => {
      toast.error('Failed to delete assignment', {
        description: error.message,
      });
    },
  });
};

export const useUnLinkClo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      assignmentId,
      cloId: cloId,
    }: {
      assignmentId: string;
      cloId: string;
    }) => assignmentService.unLinkClo(assignmentId, cloId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['assignments', 'clos', 'assignmentId'],
      });
      toast.success('clo has been unlinked');
    },
    onError: (error) => {
      toast.error('Failed to unlink clo', {
        description: error.message,
      });
    },
  });
};
