import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

import { assignmentService } from '@/services/assignment-service';
import { CreateAssignmentType } from '@/types/schema/assignment-schema';

export const useGetAssignment = () =>
  useQuery({
    queryKey: ['assignments'],
    queryFn: () => assignmentService.getAssignments(),
  });

export const useCreateAssignment = () => {
  return useMutation({
    mutationFn: (assignment: CreateAssignmentType) =>
      assignmentService.createAssignment(assignment),
    onSuccess: () => {
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