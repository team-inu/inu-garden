import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { cloService } from '@/services/clo-service';
import {
  CreateCloForm,
  CreateCloLinkSubPloPayload,
  EditCloForm,
} from '@/types/schema/clo-shema';

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
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      clo,
      courseId,
    }: {
      clo: CreateCloForm;
      courseId: string | string[];
    }) => cloService.createClo(clo, courseId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['clo'],
      });
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
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (clo: EditCloForm) => cloService.updateClo(clo.id, clo),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['clo'],
      });
      toast.success('Course has been updated');
    },
    onError: (error) => {
      toast.error('Failed to update course', {
        description: error.message,
      });
    },
  });
};

export const useLinkSubPlo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (value: CreateCloLinkSubPloPayload) =>
      cloService.createLinkSubPlo(value),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['clo'],
      });
      toast.success('Sub PLO has been linked');
    },
    onError: (error) => {
      toast.error('Failed to link sub PLO', {
        description: error.message,
      });
    },
  });
};

export const useUnLinkSubPlo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ cloId, subPloId }: { cloId: string; subPloId: string }) =>
      cloService.unLinkSubPlo(cloId, subPloId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['clo', 'splos','cloId'],
      });
      toast.success('Sub PLO has been unlinked');
    },
    onError: (error) => {
      toast.error('Failed to unlink sub PLO', {
        description: error.message,
      });
    },
  });
};
