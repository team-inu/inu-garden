import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

import { cloService } from '@/services/clo-service';
import { CreateCloForm, EditCloForm } from '@/types/schema/clo-shema';

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

export const useGetCloById = (cloId: string) =>
  useQuery({
    queryKey: ['clo', cloId],
    queryFn: () => cloService.getCloById(cloId),
  });

export const useCreateClo = () => {
  return useMutation({
    mutationFn: async ({
      clo,
      courseId,
    }: {
      clo: CreateCloForm;
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

export const useUpdateClo = () => {
  return useMutation({
    mutationFn: (clo: EditCloForm) => cloService.updateClo(clo.id, clo),
    onSuccess: () => {
      toast.success('Course has been updated');
    },
    onError: (error) => {
      toast.error('Failed to update course', {
        description: error.message,
      });
    },
  });
};
