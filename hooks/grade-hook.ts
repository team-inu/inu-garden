import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { gradeService } from '@/services/grade-service';
import { PayloadCreateGradeType } from '@/types/schema/grade-schema';

export const useGetGradeByStudentId = (studentId: string) =>
  useQuery({
    queryKey: ['grades', studentId],
    queryFn: () => gradeService.getGradeByStudentId(studentId),
  });

export const useCreateGrade = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (grade: PayloadCreateGradeType) => gradeService.createGrade(grade),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['grades'],
      });
      toast.success('Grade has been created', {
        description: 'You can now use this grade.',
      });
    },
    onError: (error) => {
      toast.error('Failed to create grade', {
        description: error.message,
      });
    },
  });
};

export const useDeleteGrade = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => gradeService.deleteGrade(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['grades'],
      });
      toast.success('Grade has been deleted');
    },
    onError: (error) => {
      toast.error('Failed to delete grade', {
        description: error.message,
      });
    },
  });
};
