import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { assignmentGroupService } from '@/services/assignment-groups-service';
import { CreateAssignmentGroupForm, UpdateAssignmentGroupForm } from '@/types/schema/assignment-group-schema';

export const useGetAssignmentGroupsByCourseId = (courseId: string) =>
  useQuery({
    queryKey: ['assignment-groups'],
    queryFn: () => assignmentGroupService.getAssignmentGroupsByCourseId(courseId),
  });

export const useCreateAssignmentGroup = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (assignment: CreateAssignmentGroupForm) => assignmentGroupService.createAssignmentGroup(assignment),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['assignment-groups'],
      });
      toast.success('Assessment has been created', {
        description: 'You can now use this assessment.',
      });
    },
    onError: (error) => {
      toast.error('Failed to create assessment', {
        description: error.message,
      });
    },
  });
};

export const useUpdateAssignmentGroup = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (assignment: UpdateAssignmentGroupForm) => assignmentGroupService.updateAssignmentGroup(assignment),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['assignment-groups'],
      });
      toast.success('Assessment status has been updated');
    },
    onError: (error) => {
      toast.error('Failed to update assessment', {
        description: error.message,
      });
    },
  });
};

export const useDeleteAssignmentGroup = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (assignmentId: string) => assignmentGroupService.deleteAssignmentGroup(assignmentId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['assignment-groups'],
      });
      toast.success('Assessment has been deleted', {});
    },
    onError: (error) => {
      toast.error('Failed to delete assessment', {
        description: error.message,
      });
    },
  });
};
