import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { semesterService } from '@/services/semester-service';
import {
  CreateSemesterForm,
  UpdateSemesterForm,
} from '@/types/schema/semsester-schema';

export const useGetSemesterList = () =>
  useQuery({
    queryKey: ['semesters'],
    queryFn: () => semesterService.getSemesterList(),
  });

export const useCreateSemester = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (semester: CreateSemesterForm) =>
      semesterService.createSemester(semester),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['semesters'] });
      toast.success('semester has been created', {
        description: 'You can now see the semester in the table.',
      });
    },
    onError: (error) => {
      toast.error('Failed to create semester', {
        description: error.message,
      });
    },
  });
};

export const useUpdateSemester = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      semester,
      id,
    }: {
      semester: UpdateSemesterForm;
      id: string;
    }) => semesterService.updateSemester(semester, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['semesters'] });
      toast.success('semester has been updated');
    },
    onError: (error) => {
      toast.error('Failed to update semester', {
        description: error.message,
      });
    },
  });
};

export const useDeleteSemester = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => semesterService.deleteSemester(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['semesters'] });
      toast.success('semester has been deleted');
    },
    onError: (error) => {
      toast.error('Failed to delete semester', {
        description: error.message,
      });
    },
  });
};
