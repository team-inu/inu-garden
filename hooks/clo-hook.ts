import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

import { cloService } from '@/services/clo-service';
import { CreateCloType } from '@/types/schema/clo-shema';

export const useGetCloList = () =>
  useQuery({
    queryKey: ['clo'],
    queryFn: () => cloService.getCloList(),
  });

export const useGetCloByCourseId = (courseId: string) =>
  useQuery({
    queryKey: ['clo', courseId],
    queryFn: () => cloService.getCloByCourseId(courseId),
  });

export const useCreateClo = () => {
  return useMutation({
    mutationFn: async ({
      clo,
      courseId,
    }: {
      clo: CreateCloType;
      courseId: string | string[];
    }) => cloService.createClo(clo, courseId),
    onSuccess: () => {
      toast.success('Clo has been created', {
        description: 'You can now add questions to the course.',
      });
    },
    onError: (error) => {
      toast.error('Failed to create clo', {
        description: error.message,
      });
    },
  });
};
