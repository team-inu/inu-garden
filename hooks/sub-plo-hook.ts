import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { subPloService } from '@/services/sub-plo-service';
import { CreateSubPloType } from '@/types/schema/sub-plo-schema';

export const useGetSubPloList = () =>
  useQuery({
    queryKey: ['splos'],
    queryFn: () => subPloService.getSubPloList(),
  });

export const useCreateSubPlo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (splo: CreateSubPloType) => subPloService.createSubPlo(splo),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['splos'],
      });
      toast.success('Sub PLO has been created', {
        description: 'You can now use the Sub PLO.',
      });
    },
    onError: (error) => {
      toast.error('Failed to create Sub PLO', {
        description: error.message,
      });
    },
  });
};

export const useUpdateSubPlo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ splo, id }: { splo: CreateSubPloType; id: string }) => subPloService.updateSubPlo(splo, id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['splos'],
      });
      toast.success('Sub-PLO has been updated');
    },
    onError: (error) => {
      toast.error('Failed to update Sub-PLO', {
        description: error.message,
      });
    },
  });
};

export const useDeleteSubPlo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => subPloService.deleteSubPlo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['splos'],
      });
      toast.success('Sub-PLO has been deleted');
    },
    onError: (error) => {
      toast.error('Failed to delete Sub-PLO', {
        description: error.message,
      });
    },
  });
};
