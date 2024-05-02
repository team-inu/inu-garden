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

export const useGetAssignmentByGroupId = (groupId: string) =>
  useQuery({
    queryKey: ['assignments', groupId],
    queryFn: () => assignmentService.getAssignmentsByGroupId(groupId),
  });

export const useGetAssignmentById = (assignmentId: string) =>
  useQuery({
    queryKey: ['assignmentsClo', assignmentId],
    queryFn: () => assignmentService.getAssignmentById(assignmentId),
  });

export const useCreateAssignment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      assignment,
      assignmentGroupId,
    }: {
      assignment: CreateAssignmentForm;
      assignmentGroupId: string;
    }) => assignmentService.createAssignment(assignment, assignmentGroupId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['assignments'],
      });
      toast.success('Assignment has been created', {
        description: 'You can now use this assignment.',
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
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (assignment: UpdateAssignmentForm) =>
      assignmentService.updateAssignment(assignment),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['assignments'],
      });
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
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (assignmentId: string) =>
      assignmentService.deleteAssignment(assignmentId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['assignments'],
      });
      toast.success('assignment has been deleted', {});
    },
    onError: (error) => {
      toast.error('Failed to delete assignment', {
        description: error.message,
      });
    },
  });
};

export const useLinkClo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      assignmentId,
      courseLearningOutcomeIds,
    }: {
      assignmentId: string;
      courseLearningOutcomeIds: string[];
    }) =>
      assignmentService.linkClo({
        assignmentId,
        courseLearningOutcomeIds,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['assignmentsClo'],
      });
      toast.success('clo has been linked');
    },
    onError: (error) => {
      toast.error('Failed to link clo', {
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
        queryKey: ['assignmentsClo'],
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
